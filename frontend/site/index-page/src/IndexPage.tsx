import React, { useContext }        from 'react'
import { Form }                     from '@components/form/src'
import { useIntl }                  from 'react-intl'

import { NavLayout }                from '@components/nav-layout'
import { PostCard }                 from '@components/post-card'
import { AuthContext }              from '@store/context'
import { Box, Column, Layout, Row } from '@ui/layout'
import { Loader }                   from '@ui/loader'
import { Text }                     from '@ui/text'

import messages                     from './messages'
import { useData }                  from './useData'

const IndexPage = () => {
  const { user } = useContext(AuthContext)
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
          <Layout flexBasis={[20, 20, 50]} />
          <Row
            flexWrap='wrap'
            justifyContent='center'
            alignItems='center'
            flexDirection={['column', 'row', 'row']}
          >
            {user && (
              <Box width={335} m='large' minHeight={195} p='semiLarge'>
                <Column alignItems='center'>
                  <Form path={'/'} />
                </Column>
              </Box>
            )}
            {postsData.map((post) => {
              return (
                <React.Fragment key={post.id}>
                  <PostCard post={post} />
                </React.Fragment>
              )
            })}
          </Row>
        </Column>
      </Box>
    </NavLayout>
  )
}

export default IndexPage
