import React                        from 'react'
import { useIntl }                  from 'react-intl'

import { NavLayout }                from '@components/nav-layout'
import { PostCard }                 from '@components/post-card'
import { Box, Column, Layout, Row } from '@ui/layout'
import { Loader }                   from '@ui/loader'
import { Text }                     from '@ui/text'

import messages                     from './messages'
import { useData }                  from './useData'

const IndexPage = () => {
  const { postsData, loading } = useData()
  const intl = useIntl()

  if (loading) {
    return (
      <Box height={700} justifyContent='center' alignItems='center'>
        <Loader />
      </Box>
    )
  }
  return (
    <NavLayout>
      <Box maxWidth={['90%', '90%', 1440]} width='100%' mx='auto'>
        <Column alignItems='center'>
          <Layout flexBasis={[20, 30, 50]} />
          <Text as='h1' fontSize={['xmedium', 'semiLarge', 'large']}>
            {intl.formatMessage(messages.title)}
          </Text>
          <Layout flexBasis={[20, 30, 50]} />
          <Row
            flexWrap='wrap'
            justifyContent='center'
            alignItems='center'
            flexDirection={['column', 'row', 'row']}
          >
            <Layout flexBasis={[0, 0, 50]} />
            {postsData.map(post => {
              return (
                <React.Fragment key={post.id}>
                  <PostCard post={post} />
                  <Layout flexBasis={[20, 30, 50]} />
                </React.Fragment>
              )
            })}
            <Layout flexBasis={[0, 0, 50]} />
          </Row>
        </Column>
      </Box>
    </NavLayout>
  )
}

export default IndexPage
