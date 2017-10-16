export default {
  state: () => ({
    token: null
  }),

  methods: {
    setToken(token) {
      this.$state.token = token
    }
  }
}
