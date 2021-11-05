import { WarningOutlineIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Label, Stack, Text } from '@sanity/ui'
import React from 'react'
import { SyncStatusDocument } from '../types'
import Row from './Row'

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
                    No sync document found
                  </Text>
                  <Text size={1}>
                    Download the official Sanity Connect app from the Shopify
                    App store to get started.
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
        <Box marginTop={4}>
          <Button
            as="a"
            disabled={!syncStatus?.store}
            fontSize={1}
            href={`https://${syncStatus?.store}/admin`}
            rel="noopener noreferrer"
            target="_blank"
            text="Shopify store admin"
            tone="primary"
          />
        </Box>
      )}
    </Box>
  )
}

export default PanelShopify
