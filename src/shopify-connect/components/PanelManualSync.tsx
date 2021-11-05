import { Box, Inline, Text, Tooltip } from '@sanity/ui'
import { InfoOutlineIcon } from '@sanity/icons'
import pluralize from 'pluralize'
import intervalToDuration from 'date-fns/intervalToDuration'
import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import type { ManualSyncStatus } from '../types'

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

  let formattedDuration = [
    `${duration.minutes}m`, //
    `${duration.seconds}s`,
  ]
  if (duration.hours) {
    formattedDuration = [`${duration.hours}h`, ...formattedDuration]
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
          {status?.error ? (
            <Text size={1}>
              {status?.error && <>Failed with error: {status.error}</>}
            </Text>
          ) : (
            <Text muted size={1}>
              Updated {productsPlural} and {variantsPlural} in{' '}
              {formattedDuration.join(' ')}
            </Text>
          )}
        </Box>
      }
      placement="top"
      portal
    >
      <Text muted size={1}>
        <InfoOutlineIcon />
      </Text>
    </Tooltip>
  )
}

const PanelManualSync = (props: Props) => {
  const { status } = props

  return (
    <Box>
      <Inline space={2}>
        <Text muted size={1}>
          Last manual sync:{' '}
          {status?.completedAt ? (
            <ReactTimeAgo
              date={new Date(status.completedAt).getTime() - TIME_OFFSET}
              timeStyle="round"
            />
          ) : (
            'never'
          )}
        </Text>
        <StatusTooltip status={status} />
      </Inline>
    </Box>
  )
}

export default PanelManualSync
