import { LaunchIcon } from '@sanity/icons'
import { Box, Label, Stack, Text } from '@sanity/ui'
import React from 'react'
import { sanityClient } from '../../lib/client'
import Row from './Row'

const clientConfig = sanityClient.config()

const PanelSanity = () => {
  return (
    <Box>
      <Stack space={3}>
        <Label muted size={1}>
          Sanity project
        </Label>
        <Row title="project ID" value={clientConfig.projectId} />
        <Row title="dataset" value={clientConfig.dataset} />
      </Stack>
      {/* Actions */}
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
  )
}

export default PanelSanity
