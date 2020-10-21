import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

const query = gql`
  query GetPosts {
    getPosts {
      id
      username
      body
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`

export const useData = () => {
  const [postsData, setPostsData] = useState([])
  const [loading, setLoading] = useState(false)

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true)
        const { data } = await client.query({ query })
        setPostsData(data.getPosts)
        setLoading(false)
      } catch {
        setPostsData([])
        setLoading(false)
      }
    }
    fetchQuery()
  }, [])

  return {
    postsData,
    loading,
  }
}
