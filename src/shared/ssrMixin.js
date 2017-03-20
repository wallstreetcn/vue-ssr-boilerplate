export default {
  created() {
    if (TARGET === 'web') {
      if (window.__INITIAL_COMPONENTS_STATE__ & this.$router) {
        const matched = this.$router.getMatchedComponents()
        if (!matched.length) return

        matched.forEach((component, i) => component.__INITIAL_STATE__ = window.__INITIAL_COMPONENTS_STATE__[i])
        window.__INITIAL_COMPONENTS_STATE__ = null
      }
    }

    if (this.constructor.extendOptions && this.constructor.extendOptions.__INITIAL_STATE__) {
      Object.assign(this.$data, this.constructor.extendOptions.__INITIAL_STATE__)
      this.prefetched = Promise.resolve(this.constructor.extendOptions.__INITIAL_STATE__)
      this.constructor.extendOptions.__INITIAL_STATE__ = null
    } else if (this.$options.prefetch) {
      this.prefetched = this.$options.prefetch(this.$route, this.$store).then(data => {
        Object.assign(this.$data, data)
        return data
      })
    }
  }
}
