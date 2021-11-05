import { WarningOutlineIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Label, Stack, Text } from '@sanity/ui'
import React from 'react'
import { ProductUpdate } from '../types'
import SyncItem from './SyncItem'

type Props = {
  store: string
  updates?: ProductUpdate[]
}

const PanelUpdatedProducts = (props: Props) => {
  const { store, updates } = props

  console.log('updates', updates)

  return (
    <Box>
      <Stack space={3}>
        <Label muted size={1}>
          Recently synced products
        </Label>
        <Box>
          {/* Sync items */}
          {updates && updates.length > 0
            ? updates?.map(update => {
                return (
                  <SyncItem
                    documentId={update.documentId}
                    error={update.error}
                    key={`${update.documentId}-${update.timestamp}`}
                    timestamp={update.timestamp}
                    type={update.type}
                  />
                )
              })
            : store && (
                <Card marginTop={2} padding={3} tone="caution">
                  <Flex>
                    <Box>
                      <Text size={1}>
                        <WarningOutlineIcon />
                      </Text>
                    </Box>
                    <Box flex={1} marginLeft={3}>
                      <Stack space={4}>
                        <Text size={1} weight="semibold">
                          Don't see any products?
                        </Text>
                        <Text size={1}>
                          Try sync your product data from Shopify or add demo
                          products to your store.
                        </Text>
                        <Box>
                          <Button
                            as="a"
                            fontSize={1}
                            href={`https://${store}/admin/apps/sanity-connect-1`}
                            mode="ghost"
                            rel="noopener noreferrer"
                            target="_blank"
                            text="Open the Sanity Connect app"
                            tone="primary"
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </Flex>
                </Card>
              )}
        </Box>
      </Stack>
    </Box>
  )
}

export default PanelUpdatedProducts
