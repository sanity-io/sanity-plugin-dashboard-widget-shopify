// import { useRouter } from '@sanity/base/router'
import type { MutationEvent } from '@sanity/client'
import { hues } from '@sanity/color'
import { DashboardWidget } from '@sanity/dashboard'
import { MasterDetailIcon } from '@sanity/icons'
import { Box, Card, Stack, Text } from '@sanity/ui'
import { useRouter } from 'part:@sanity/base/router'
import React, { useEffect, useState } from 'react'
import { sanityClient } from '../lib/client'
import PanelManualSync from './components/PanelManualSync'
import PanelSanity from './components/PanelSanity'
import PanelShopify from './components/PanelShopify'
import PanelUpdatedProducts from './components/PanelUpdatedProducts'
import { SyncStatusDocument } from './types'

const QUERY = `*[_type == "sanity.shopify.sync"] | order(_updatedAt desc) [0]`

function Widget() {
  const [syncStatus, setSyncStatus] = useState<SyncStatusDocument | null>()

  const router = useRouter()

  const handleSyncUpdate = (document?: SyncStatusDocument | null) => {
    setSyncStatus(document)
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
          {/* Shopify */}
          <PanelShopify syncStatus={syncStatus} />
          <Divider />

          {/* Sanity project */}
          <PanelSanity />
          <Divider />

          {/* Recently updated products */}
          {syncStatus?.store && (
            <PanelUpdatedProducts
              store={syncStatus.store}
              updates={updatedProducts}
            />
          )}

          {/* Manual sync information */}
          <PanelManualSync status={syncStatus?.status} />

          {/* Additional actions */}
          {updatedProducts && (
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
          )}
        </Stack>
      </Card>
    </DashboardWidget>
  )
}

export default Widget
