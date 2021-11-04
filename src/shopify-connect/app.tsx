// import { useRouter } from '@sanity/base/router'
import type { MutationEvent } from '@sanity/client'
import { hues } from '@sanity/color'
import { DashboardWidget } from '@sanity/dashboard'
import { LaunchIcon, MasterDetailIcon } from '@sanity/icons'
import { Box, Button, Card, Label, Stack, Text } from '@sanity/ui'
import { useRouter } from 'part:@sanity/base/router'
import React, { useEffect, useState } from 'react'
import { sanityClient } from '../lib/client'
import ManualSyncPanel from './ManualSyncPanel'
import Row from './Row'
import SyncItem from './SyncItem'
import { SyncStatusDocument } from './types'

const clientConfig = sanityClient.config()

const QUERY = `*[_type == "sanity.shopify.sync"] | order(_updatedAt desc) [0]`

function Widget() {
  const [syncStatus, setSyncStatus] = useState<SyncStatusDocument>()

  const router = useRouter()

  const handleSyncUpdate = (document: SyncStatusDocument) => {
    if (document) {
      setSyncStatus(document)
    }
  }

  useEffect(() => {
    // Fetch sync status and listen to updates
    sanityClient.fetch(QUERY).then(handleSyncUpdate)
    const subscription = sanityClient
      .listen(QUERY)
      .subscribe((mutation: MutationEvent) => {
        if (mutation?.result) {
          handleSyncUpdate(mutation.result as SyncStatusDocument)
        }
      })

    // Clean up listeners on unmount
    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const Divider = () => {
    return (
      <Box
        style={{
          background: hues.gray[200].hex,
          height: '1px',
          width: '100%',
        }}
      />
    )
  }

  const updatedProducts = syncStatus?.log?.slice(0, 5)

  return (
    <DashboardWidget header="Shopify Connect">
      <Card padding={4}>
        <Stack space={4}>
          {/* Shopify project */}
          {syncStatus && (
            <>
              <Box flex={1}>
                <Stack space={3}>
                  <Label muted size={1}>
                    Shopify store
                  </Label>
                  <Row
                    title="store ID"
                    value={syncStatus.store.replace('.myshopify.com', '')}
                  />
                </Stack>
                <Box marginTop={4}>
                  <Button
                    as="a"
                    href={`https://${syncStatus.store}/admin`}
                    rel="noopener noreferrer"
                    target="_blank"
                    text="Go to Shopify store"
                    tone="primary"
                  />
                </Box>
              </Box>

              <Divider />
            </>
          )}

          {/* Sanity project */}
          {clientConfig && (
            <>
              <Box>
                <Stack space={3}>
                  <Label muted size={1}>
                    Sanity project
                  </Label>
                  <Row title="project ID" value={clientConfig.projectId} />
                  <Row title="dataset" value={clientConfig.dataset} />
                </Stack>
                <Box marginTop={5}>
                  <Text size={1} weight="medium">
                    <a
                      href={`https://manage.sanity.io/projects/${clientConfig.projectId}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <LaunchIcon style={{ marginRight: '0.1em' }} />
                      Manage Sanity project
                    </a>
                  </Text>
                </Box>
              </Box>

              <Divider />
            </>
          )}

          {/* Recently synced products */}
          {updatedProducts && (
            <>
              <Box>
                <Stack space={3}>
                  <Label muted size={1}>
                    Recently synced products
                  </Label>
                  <Box>
                    {/* Sync items */}
                    {updatedProducts?.map(payload => {
                      return (
                        <SyncItem
                          documentId={payload.documentId}
                          error={payload.error}
                          key={`${payload.documentId}-${payload.timestamp}`}
                          timestamp={payload.timestamp}
                          type={payload.type}
                        />
                      )
                    })}
                  </Box>
                </Stack>
              </Box>
            </>
          )}

          {/* Manual sync information */}
          {syncStatus?.status && <ManualSyncPanel status={syncStatus.status} />}

          {/* Additional actions */}
          <Box marginTop={2}>
            <Text size={1} weight="medium">
              <a
                href="#"
                onClick={() => {
                  // Navigate to products root
                  router.navigateUrl('/desk/products')
                }}
              >
                <MasterDetailIcon style={{ marginRight: '0.1em' }} />
                Show all products
              </a>
            </Text>
          </Box>
        </Stack>
      </Card>
    </DashboardWidget>
  )
}

export default Widget
