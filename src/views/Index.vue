<template>
  <div class="foo">
    <p>Hello world!</p>
    <p>this.a: {{a}}</p>
    <p><router-link :to="{ name: 'foo', params: { id: 123 } }">goto /foo/123</router-link></p>
    <p><router-link to="/page-not-exist">goto /page-not-exist</router-link></p>
    <p><router-link to="/show-error-page">goto /show-error-page</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0
    }
  },

  metaInfo: {
    title: 'Vue SSR Boilerplate',
    meta: [
      { vmid: 'description', name: 'description', content: 'Vue SSR Boilerplate' }
    ]
  },

  prefetch() {
    return Promise.resolve({
      a: 123
    })
  },

  // will be called on server side. check your console
  created() {
    console.log(this.a) //eslint-disable-line
  },

  // won't run on server side
  beforeMount() {
    console.log(this.a) //eslint-disable-line
  }
}
</script>
