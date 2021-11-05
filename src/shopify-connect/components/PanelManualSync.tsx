import { Box, Inline, Stack, Text, Tooltip } from '@sanity/ui'
import { InfoOutlineIcon } from '@sanity/icons'
import pluralize from 'pluralize'
import intervalToDuration from 'date-fns/intervalToDuration'
import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import type { ManualSyncStatus } from '../types'
import { hues } from '@sanity/color'

type Props = {
  status?: ManualSyncStatus
}

const TIME_OFFSET = 2500 // ms

const StatusTooltip = (props: { status?: ManualSyncStatus }) => {
  const { status } = props

  // Return early if empty / undefined
  if (!status || Object.keys(status).length === 0) {
    return null
  }

  const duration = intervalToDuration({
    start: new Date(status?.startedAt),
    end: new Date(status?.completedAt),
  })

  let formattedDuration = []
  if (duration.seconds) {
    formattedDuration.unshift(`${duration.seconds}s`)
  }
  if (duration.minutes) {
    formattedDuration.unshift(`${duration.minutes}m`)
  }
  if (duration.hours) {
    formattedDuration.unshift(`${duration.hours}s`)
  }

  const productsPlural = pluralize(
    'product',
    status?.count?.products ?? 0,
    true
  )
  const variantsPlural = pluralize(
    'variant',
    status?.count?.variants ?? 0,
    true
  )

  return (
    <Tooltip
      content={
        <Box padding={2}>
          <Stack space={2}>
            {status?.error ? (
              <Text size={1} weight="medium">
                {status?.error && <>Failed with error: {status.error}</>}
              </Text>
            ) : (
              <Text size={1} weight="medium">
                Updated {productsPlural} and {variantsPlural} in{' '}
                {formattedDuration.join(' ')}
              </Text>
            )}
            <Text muted size={1}>
              Manually synced products will not appear in the updated products
              list.
            </Text>
          </Stack>
        </Box>
      }
      placement="top"
      portal
    >
      <InfoOutlineIcon style={{ marginLeft: '0.1em' }} />
    </Tooltip>
  )
}

const PanelManualSync = (props: Props) => {
  const { status } = props

  const isNeverRun = !status || Object.keys(status).length === 0
  const isCreated = status?.status === 'created'
  const isFailed = status?.status === 'failed'
  const isSuccess = status?.status === 'success'

  return (
    <Box>
      <Inline space={2}>
        <Text
          muted
          size={1}
          style={{ color: isFailed ? hues.red[500].hex : hues.gray[600].hex }}
        >
          Last manual sync: {/* Created */}
          {isCreated && status?.startedAt && (
            <>
              started{' '}
              <ReactTimeAgo
                date={new Date(status.startedAt).getTime() - TIME_OFFSET}
                timeStyle="round"
              />
            </>
          )}
          {/* Success */}
          {isSuccess && status?.completedAt && (
            <>
              completed{' '}
              <ReactTimeAgo
                date={new Date(status.completedAt).getTime() - TIME_OFFSET}
                timeStyle="round"
              />
              <StatusTooltip status={status} />
            </>
          )}
          {/* Failed */}
          {isFailed && status?.completedAt && (
            <>
              failed{' '}
              <ReactTimeAgo
                date={new Date(status.completedAt).getTime() - TIME_OFFSET}
                timeStyle="round"
              />
              <StatusTooltip status={status} />
            </>
          )}
          {/* Never run */}
          {isNeverRun && <>never</>}
        </Text>
      </Inline>
    </Box>
  )
}

export default PanelManualSync
