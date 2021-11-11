import { Box, Label, Stack } from '@sanity/ui'
import React from 'react'
import { ProductUpdate } from '../types'
import SyncItem from './SyncItem'

type Props = {
  updates?: ProductUpdate[]
}

const PanelUpdatedProducts = (props: Props) => {
  const { updates } = props

  return (
    <Box>
      <Stack space={3}>
        <Label muted size={1}>
          Recently updated products
        </Label>
        <Box>
          {/* Sync items */}
          {updates &&
            updates.length > 0 &&
            updates?.map(update => {
              return (
                <SyncItem
                  documentId={update.documentId}
                  error={update.error}
                  key={`${update.documentId}-${update.timestamp}`}
                  timestamp={update.timestamp}
                  type={update.type}
                />
              )
            })}
        </Box>
      </Stack>
    </Box>
  )
}

export default PanelUpdatedProducts
