import actions from './actions'
import initialState from './defaults'

export default {
  [actions.ADD_ONE]: (state, { post, preserveForm = true }) => {
    const form = preserveForm ? state.form : initialState.form

    return {
      ...state,
      posts: [post, ...state.posts],
      form
    }
  },

  [actions.SET_LIST]: (state, { posts }) => {
    return {
      ...state,
      posts
    }
  },

  [actions.REMOVE_ONE]: (state, { post }) => {
    return {
      ...state,
      posts: state.posts.filter(p => p.id !== post.id)
    }
  },

  [actions.SET_POST]: (state, { post }) => {
    return {
      ...state,
      post
    }
  },

  [actions.SET_FORM]: (state, { field, value }) => {
    return {
      ...state,
      form: {
        ...state.form,
        [field]: value
      }
    }
  },

  [actions.ADD_COMMENT]: (state, { post, preserveForm = false }) => {
    const form = preserveForm ? state.form : initialState.form

    return {
      ...state,
      post: {
        ...state.post,
        comments: [post, ...state.post.comments],
        commentsCount: state.post.commentsCount++
      },
      form,
    }
  }
}
