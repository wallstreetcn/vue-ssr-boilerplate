<template>
  <div class="show-error-page">

  </div>
</template>

<script>
export default {
  data() {
    return {
      foo: 0
    }
  },

  prefetch() {
    return Promise.reject()
  },

  beforeMount() {
    this.prefetched.catch(() => {
      alert('500 Internal Server Error')
    })
  }
}
</script>
