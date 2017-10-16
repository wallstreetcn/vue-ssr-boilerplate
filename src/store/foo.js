export default {
  state: () => ({
    a: 123
  }),

  methods: {
    setA(v) {
      this.$state.a = v
    }
  }
}
