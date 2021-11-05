import { LaunchIcon, WarningOutlineIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Label, Stack, Text } from '@sanity/ui'
import React from 'react'
import { sanityClient } from '../../lib/client'
import { SyncStatusDocument } from '../types'
import Row from './Row'

const clientConfig = sanityClient.config()

type Props = {
  syncStatus?: SyncStatusDocument | null
}

const PanelShopify = (props: Props) => {
  const { syncStatus } = props

  return (
    <Box flex={1}>
      <Stack space={3}>
        <Label muted size={1}>
          Shopify store
        </Label>
        {syncStatus === null ? (
          <Card marginTop={2} padding={4} tone="caution">
            <Flex>
              <Box>
                <Text size={1}>
                  <WarningOutlineIcon />
                </Text>
              </Box>
              <Box flex={1} marginLeft={3}>
                <Stack space={4}>
                  <Text size={1} weight="semibold">
                    Widget configuration is missing
                  </Text>
                  <Text size={1}>
                    Install the official Sanity Connect app in the Shopify app
                    store and connect it to this project (
                    <code>{clientConfig?.projectId}</code>) to enable this
                    widget.
                  </Text>
                  <Box>
                    <Button
                      as="a"
                      fontSize={1}
                      href={`https://apps.shopify.com/`}
                      mode="ghost"
                      rel="noopener noreferrer"
                      target="_blank"
                      text="Install Sanity Connect"
                      tone="primary"
                    />
                  </Box>
                </Stack>
              </Box>
            </Flex>
          </Card>
        ) : (
          <Row
            title="store ID"
            value={syncStatus?.store?.replace('.myshopify.com', '') || '-'}
          />
        )}
      </Stack>

      {/* Actions */}
      {syncStatus !== null && (
        <Box marginTop={5}>
          <Text size={1} weight="medium">
            <a
              href={syncStatus?.store && `https://${syncStatus?.store}/admin`}
              rel="noopener noreferrer"
              style={{
                opacity: syncStatus?.store ? 1 : 0.5,
                pointerEvents: syncStatus?.store ? 'auto' : 'none',
              }}
              target="_blank"
            >
              <LaunchIcon style={{ marginRight: '0.1em' }} />
              Shopify store admin
            </a>
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default PanelShopify
