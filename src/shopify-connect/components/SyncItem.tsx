import type { MutationEvent, SanityDocument } from '@sanity/client'
import { hues } from '@sanity/color'
import { ErrorOutlineIcon } from '@sanity/icons'
import { Box, Card, Flex, Label, Stack, Text, Tooltip } from '@sanity/ui'
// import { IntentLink } from '@sanity/state-router/components'
import { IntentLink } from 'part:@sanity/base/router'
import React, { useEffect, useRef, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import styled from 'styled-components'
import { sanityClient } from '../../lib/client'
import { ProductUpdateType } from '../types'

type Props = {
  documentId?: string
  error?: string
  timestamp: string
  type: ProductUpdateType
}

const ImageContainer = styled(Box)`
  background: ${hues.gray[100].hex};
  height: 2.5em;
  width: 2.5em;
`

const PreviewImage = styled.img`
  border-radius: 2px;
  height: 100%;
  object-fit: cover;
  width: 100%;
`

const TextPlaceholder = styled(Card)`
  /* background: red; */
  background: ${props => (props.visible ? 'none' : hues.gray[50].hex)};
`
TextPlaceholder.flex = 1
TextPlaceholder.radius = 2

const QUERY = `*[_id == $id][0]`

const PLACEHOLDER_DELAY = 1500 // ms

const TYPE_MAP: Record<ProductUpdateType, string> = {
  create: 'Created',
  delete: 'Deleted',
  update: 'Updated',
}

const SyncItem = (props: Props) => {
  const { timestamp, documentId, error, type } = props

  const [mode, setMode] = useState<'inaccessible' | 'loading' | 'ready'>(
    'loading'
  )
  const [product, setProduct] = useState<SanityDocument | null>()

  const refTimeout = useRef<ReturnType<typeof window.setTimeout>>()

  const handleDocumentUpdate = (document?: SanityDocument | null) => {
    setProduct(document)
  }

  useEffect(() => {
    // Fetch product and listen to updates
    sanityClient.fetch(QUERY, { id: documentId }).then(handleDocumentUpdate)
    const subscription = sanityClient
      .listen(QUERY, { id: documentId })
      .subscribe((mutation: MutationEvent) => {
        if (mutation.transition === 'disappear') {
          handleDocumentUpdate(null)
        }
        if (mutation?.result) {
          handleDocumentUpdate(mutation.result)
        }
      })

    // Clean up listeners on unmount
    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // Wait one second before displaying
    refTimeout.current = setTimeout(() => {
      if (product === null) {
        setMode('inaccessible')
      }
      if (product) {
        setMode('ready')
      }
    }, PLACEHOLDER_DELAY)

    return () => {
      if (refTimeout.current) {
        clearTimeout(refTimeout.current)
      }
    }
  }, [product])

  const isInaccessible = mode === 'inaccessible'
  const isLoading = mode === 'loading'
  const isReady = mode === 'ready'

  const Content = () => (
    <Card paddingY={2}>
      <Flex align="center">
        {/* Image */}
        <ImageContainer>
          {isReady && product?.store?.previewImageUrl && (
            <PreviewImage src={product.store.previewImageUrl} />
          )}
        </ImageContainer>

        <Box flex={1} marginX={3}>
          <Stack space={2}>
            <TextPlaceholder visible={!isLoading}>
              <Text size={2} textOverflow="ellipsis">
                {isInaccessible && <em>Document not found</em>}
                {isReady && product?.store?.title}
                &nbsp;
              </Text>
            </TextPlaceholder>
            <TextPlaceholder visible={!isLoading}>
              <Text muted size={1} textOverflow="ellipsis">
                {isReady && timestamp && (
                  <ReactTimeAgo
                    date={new Date(timestamp).getTime()}
                    timeStyle="round"
                  />
                )}
                {isInaccessible && <em>{documentId}</em>}
                &nbsp;
              </Text>
            </TextPlaceholder>
          </Stack>
        </Box>

        <Flex
          align="center"
          justify="flex-end"
          style={{
            // background: 'red',
            flexShrink: 0,
            marginLeft: 'auto',
            width: '5em',
          }}
        >
          {!isLoading && error && (
            <Tooltip
              content={
                <Box padding={2}>
                  <Text muted size={1}>
                    {error}
                  </Text>
                </Box>
              }
              portal
            >
              <Box marginRight={3}>
                <Text size={1} style={{ color: hues.red[500].hex }}>
                  <ErrorOutlineIcon />
                </Text>
              </Box>
            </Tooltip>
          )}
          <TextPlaceholder flex={1} visible={!isLoading}>
            <Label align="right" muted size={0}>
              {!isLoading && TYPE_MAP[type]}
              &nbsp;
            </Label>
          </TextPlaceholder>
        </Flex>
      </Flex>
    </Card>
  )

  if (!product) {
    return <Content />
  }

  return (
    <IntentLink
      as="a"
      intent="edit"
      params={{ id: documentId }}
      style={{ textDecoration: 'none' }}
    >
      <Content />
    </IntentLink>
  )
}

export default SyncItem
