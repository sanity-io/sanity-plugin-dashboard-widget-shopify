import { Box, Flex, Text } from '@sanity/ui'
import React from 'react'

type Props = {
  title: string
  value: string
}

const Row = (props: Props) => {
  const { title, value } = props
  return (
    <Flex>
      <Box>
        <Text size={1} weight="medium">
          {title}
        </Text>
      </Box>
      <Box flex={1} paddingLeft={5}>
        <Text align="right" muted size={1} textOverflow="ellipsis">
          {value}
        </Text>
      </Box>
    </Flex>
  )
}

export default Row
