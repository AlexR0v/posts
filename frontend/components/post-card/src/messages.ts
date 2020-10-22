import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  commentHover: {
    id: `${scope}.commentHover`,
    defaultMessage: 'Посмотреть комментарии',
  },
  likesHover: {
    id: `${scope}.likesHover`,
    defaultMessage: 'Лайкнуть пост',
  },
})
