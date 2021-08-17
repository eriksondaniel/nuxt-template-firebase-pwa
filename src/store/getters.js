export default {
  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null
    } catch {
      return false
    }
  },

  users: (state) => {
    return state.users
  },

  dataSource: (state) => {
    return state.dataSource
  },

  user: (state) => {
    return state.user
  }
}
