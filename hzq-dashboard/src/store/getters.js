const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  permissions: state => state.user.permissions
  // avatar: state => state.user.avatar,
  // name: state => state.user.name
}
export default getters
