import { DashboardWidget } from '@sanity/dashboard'
import { BookIcon, CommentIcon, RocketIcon } from '@sanity/icons'
import { Box, Card, ElementQuery, Flex, Stack, Text } from '@sanity/ui'
import userStore from 'part:@sanity/base/user'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ResourceGuide from './components/ResourceGuide'
import ResourceScreencast from './components/ResourceScreencast'

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
                  This is where you’ll see your products and collections that
                  have been synced from Shopify. It’s also where you can add
                  metadata to personalize your storefront with custom editorial,
                  detailed product descriptions, SEO fields and more.
                </Text>
                <Text>
                  Need another content model to support your editorial needs?
                  With Sanity, you can update and change your content model as
                  needed to support even the most advanced requirements.
                </Text>
                <Text>
                  Have a look around at the resources available to you here or
                  join the #shopify channel in our{' '}
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
                <ResourceScreencast
                  title="Getting started with Sanity Connect for Shopify"
                  youtubeId="F1i_ciedmfY"
                />
                <ResourceGuide
                  href="https://www.sanity.io/guides/structured-content-patterns-for-e-commerce"
                  posterUrl="https://cdn.sanity.io/images/3do82whm/next/ff7dcdd8ce4d5039334db85f7dbbbc8c35d534ee-1200x900.png?rect=0,75,1150,720&w=600"
                  title="Best practices for e-commerce"
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
