import moment                                from 'moment'
import React, { useState }                   from 'react'
import { useIntl }                           from 'react-intl'

import { Button }                            from '@ui/button'
import { CommentsIcon, LikesIcon, UserIcon } from '@ui/icons'
import { Box, Column, Layout, Row }          from '@ui/layout'
import { NextLink }                          from '@ui/link'
import { Text }                              from '@ui/text'
import { theme }                             from '@ui/theme'

import messages                              from './messages'

const PostCard = ({ post }) => {
  const intl = useIntl()
  const [isHoverLike, setIsHoverLike] = useState(false)
  const [isHoverComment, setIsHoverComment] = useState(false)
  return (
    <NextLink href='/posts'>
      <Box width={335} minHeight={195} p='semiLarge' borderRadius='small' border='gray'>
        <Column alignItems='center'>
          <Row justifyContent='space-between' alignItems='center'>
            <Text fontSize='default' fontWeight='semiBold'>
              {post.username}
            </Text>
            <Box width={35} height={35}>
              <UserIcon width='100%' height='100%' />
            </Box>
          </Row>
          <Layout flexBasis={10} />
          <Box width='100%' height={1} border='gray' />
          <Layout flexBasis={16} />
          <Box width='100%' minHeight={45}>
            <Text fontSize='semiMedium' fontWeight='normal'>
              {post.body}
            </Text>
          </Box>
          <Layout flexBasis={16} />
          <Box width='100%' height={1} border='gray' />
          <Layout flexBasis={5} />
          <Row justifyContent='space-between' alignItems='center'>
            <NextLink>
              <Box
                position='relative'
                alignItems='center'
                onMouseOver={() => setIsHoverComment(true)}
                onMouseLeave={() => setIsHoverComment(false)}
              >
                <CommentsIcon
                  width={30}
                  height={30}
                  fill={isHoverComment ? theme.colors.blue : theme.colors.white}
                />
                <Text pl='small' fontSize='semiMedium' fontWeight='normal'>
                  {post.commentCount}
                </Text>
                {isHoverComment ? (
                  <Box
                    position='absolute'
                    top={-27}
                    left={-62}
                    p='small'
                    width={157}
                    border='blue'
                    bg='white'
                  >
                    <Text fontSize='small' fontWeight='normal'>
                      {intl.formatMessage(messages.commentHover)}
                    </Text>
                  </Box>
                ) : null}
              </Box>
            </NextLink>
            <Text color='gray' fontWeight='tiny' fontSize='semiMedium' lineHeight='small'>
              {moment(post.createdAt)
                .locale(intl.locale)
                .fromNow()}
            </Text>
            <Box position='relative'>
              <Button
                onMouseOver={() => setIsHoverLike(true)}
                onMouseLeave={() => setIsHoverLike(false)}
              >
                <LikesIcon
                  width={30}
                  height={30}
                  fill={isHoverLike ? theme.colors.red : theme.colors.semiBlack}
                />
                <Text pl='small' fontSize='semiMedium' fontWeight='normal'>
                  {post.likeCount}
                </Text>
              </Button>
              {isHoverLike ? (
                <Box
                  position='absolute'
                  top={-27}
                  left={-30}
                  p='small'
                  width={95}
                  border='red'
                  bg='white'
                >
                  <Text fontSize='small' fontWeight='normal'>
                    {intl.formatMessage(messages.likesHover)}
                  </Text>
                </Box>
              ) : null}
            </Box>
          </Row>
        </Column>
      </Box>
    </NextLink>
  )
}

export { PostCard }
