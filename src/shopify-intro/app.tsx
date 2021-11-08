import { DashboardWidget } from '@sanity/dashboard'
import { BookIcon, CommentIcon, RocketIcon } from '@sanity/icons'
import { Box, Card, ElementQuery, Flex, Stack, Text } from '@sanity/ui'
import userStore from 'part:@sanity/base/user'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Resource from './components/Resource'

const Container = styled(Flex)`
  flex-direction: column;

  [data-eq-min~='0'] > & {
  }

  [data-eq-min~='1'] > & {
    flex-direction: row;
  }
`
function Widget() {
  const [displayName, setDisplayName] = useState()

  useEffect(() => {
    async function getUser() {
      const { displayName } = await userStore.getUser('me')
      setDisplayName(displayName)
    }

    getUser()
  }, [])
  return (
    <DashboardWidget
      header={displayName ? `Hello, ${displayName}!` : `Welcome!`}
    >
      <Card>
        <ElementQuery>
          <Container>
            <Box flex={1} padding={[4, 4, 5]}>
              <Stack space={4}>
                <img
                  src="https://cdn.sanity.io/images/3do82whm/next/2c15d260780e68fbf7db19d5580b011f266fc839-1982x1228.png?w=1200"
                  style={{ width: '100%' }}
                />
                <Text>
                  Thanks for installing Sanity Connect for Shopify. Welcome to
                  your very own Sanity Studio!
                </Text>
                <Text>
                  This is where you’ll see your products and variants that have
                  been synced from Shopify. It’s also where you can add metadata
                  to enrich your product information with fields for image
                  galleries, block content for detailed product descriptions,
                  SEO that lets you optimize your search engine results page
                  (SERP) listings, and more.
                </Text>
                <Text>
                  Need another content model to support your editorial needs?
                  With Sanity, you can update and change your content model as
                  needed to support even the most advanced requirements.
                </Text>
                <Text>
                  Have a look around at the resources available to you here, and
                  do join the #shopify channel in our{' '}
                  <a
                    href="https://slack.sanity.io/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Slack community
                  </a>{' '}
                  to get help with any questions you might have.
                </Text>
              </Stack>
              {/* Links */}
              <Box marginTop={6}>
                <Stack space={4}>
                  <Text size={1} weight="medium">
                    <a
                      href="https://www.sanity.io/docs/sanity-connect-for-shopify"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <RocketIcon style={{ marginRight: '0.1em' }} />
                      Documentation
                    </a>
                  </Text>
                  <Text size={1} weight="medium">
                    <a
                      href="https://www.sanity.io/docs/reference"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BookIcon style={{ marginRight: '0.1em' }} />
                      Reference docs
                    </a>
                  </Text>
                  <Text size={1} weight="medium">
                    <a
                      href="https://slack.sanity.io/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CommentIcon style={{ marginRight: '0.1em' }} />
                      Community support
                    </a>
                  </Text>
                </Stack>
              </Box>
            </Box>
            <Box flex={1} padding={[0, 0, 4]}>
              <Stack>
                <Resource
                  byline="Knut Melvær, head of developer relations"
                  href="https://www.sanity.io"
                  posterUrl="https://i.imgur.com/nZm7o1a.png"
                  title="Getting started with Shopify and Sanity"
                  type="screencast"
                />
                <Resource
                  byline="Even Westvang, Co-founder"
                  href="https://www.sanity.io"
                  posterUrl="https://cdn.sanity.io/images/81pocpw8/production/c62d3f4f17ad1ef3d9be3d89648fde68f8d88d91-1200x900.png?rect=0,75,1200,750&w=600"
                  title="Structure Sanity Studio to Your Heart’s Content!"
                  type="guide"
                />
              </Stack>
            </Box>
          </Container>
        </ElementQuery>
      </Card>
    </DashboardWidget>
  )
}

export default Widget
