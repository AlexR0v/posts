import React                        from 'react'
import { useIntl }                  from 'react-intl'

import { NavLayout }                from '@components/nav-layout'
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
              console.log(post)
              return (
                <React.Fragment key={post.id}>
                  <Box
                    width={[290]}
                    height={[170]}
                    p='semiLarge'
                    borderRadius='small'
                    border='gray'
                  >
                    <Column alignItems='center'>
                      <Row justifyContent='space-between' alignItems='center'>
                        <Text fontSize='default' fontWeight='semiBold'>
                          {post.username}
                        </Text>
                        <Box width={35} height={35} border='gray' />
                      </Row>
                      <Layout flexBasis={10} />
                      <Box width='100%' height={1} border='gray' />
                      <Row justifyContent='flex-end'>
                        <Text
                          color='gray'
                          fontWeight='tiny'
                          fontSize='semiMedium'
                          lineHeight='small'
                        >
                          {post.createdAt}
                        </Text>
                      </Row>
                      <Layout flexBasis={16} />
                      <Text fontSize='semiMedium' fontWeight='normal'>
                        {post.body}
                      </Text>
                    </Column>
                  </Box>
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
