export default {
  login: (state, { user }) => {
    return {
      ...state,
      currentUser: user,
      isAuthenticated: true
    }
  },

  logout: state => {
    return {
      ...state,
      currentUser: null,
      isAuthenticated: false
    }
  },
}
