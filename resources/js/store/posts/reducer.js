import resolvers from './resolvers'

export default (state, { type, payload }) => {
  if(!resolvers[type]) return { ...state }

  return resolvers[type](state, payload)
}
