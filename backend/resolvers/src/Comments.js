const { Post } = require('@merng/models')
const { checkAuth } = require('@merng/utils')
const { UserInputError, AuthenticationError } = require('apollo-server')

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context)
      if (body.trim() === '') {
        throw new UserInputError('Пустой комментарий', {
          errors: {
            body: 'Комментарий не может быть пустым',
          },
        })
      }
      const post = await Post.findById(postId)
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        })
        await post.save()

        context.pubsub.publish('NEW_COMMENT', {
          newComment: post,
        })

        return post
      } else {
        throw new UserInputError('Пост не найден')
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context)
      const post = await Post.findById(postId)
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId)
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          throw new AuthenticationError('Действие не допустимо')
        }
      } else {
        throw new UserInputError('Пост не найден')
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context)
      const post = await Post.findById(postId)
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username)
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          })
        }
        await post.save()
        return post
      } else {
        throw new UserInputError('Пост не найден')
      }
    },
  },
  Subscription: {
    newComment: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_COMMENT'),
    },
  },
}
