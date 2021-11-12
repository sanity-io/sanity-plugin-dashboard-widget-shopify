import React from 'react'
import { Box, Card, Label, Text } from '@sanity/ui'
import styled from 'styled-components'

type Props = {
  byline?: string
  title: string
  youtubeId: string
}

const Container = styled(Card)`
  padding-bottom: calc(9 / 16 * 100%);
  position: relative;
  width: 100%;
`

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
`

const Resource = (props: Props) => {
  const { byline, title, youtubeId } = props
  const href = `https://www.youtube.com/watch?v=${youtubeId}`
  return (
    <Card
      as="a"
      href={href}
      rel="noopener noreferrer"
      padding={4}
      target="_blank"
    >
      <Container overflow="hidden" radius={1}>
        {youtubeId && (
          <Iframe
            frameBorder="0"
            src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`}
          />
        )}
      </Container>
      <Box marginTop={3}>
        <Text as="h3" size={2} weight="semibold">
          {title}
        </Text>
      </Box>
      {byline && (
        <Box marginTop={3}>
          <Text muted size={1}>
            {byline}
          </Text>
        </Box>
      )}
      <Box marginTop={4}>
        <Label muted size={0}>
          Screencast
        </Label>
      </Box>
    </Card>
  )
}

export default Resource
