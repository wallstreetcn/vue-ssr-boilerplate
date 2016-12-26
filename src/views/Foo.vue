<template>
  <div class="foo">
    <p>this.id: {{id}}</p>
    <p>this.$store.state.count: {{$store.state.count}}</p>
    <p>Enviroment Variables Defined by webpack.DefinePlugin:</p>
    <pre>{{config}}</pre>
    <p><router-link to="/">goto /</router-link>
  </div>
</template>

<style scoped>
.foo {
  color: blue
}
</style>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      id: 0,
      config: null
    }
  },

  metaInfo() {
    return {
      title: this.title,
      meta: [
        { vmid: 'description', name: 'description', content: this.description }
      ]
    }
  },

  prefetch(route, store) {
    return Promise.all([
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: 'title async loaded',
            description: 'description async loaded',
            id: route.params.id
          })
        })
      }),

      store.dispatch('asyncIncrement')
    ]).then(([componentData]) => componentData)
  },

  // won't run on server side
  beforeMount() {
    console.log(this.a) //eslint-disable-line

    /*
    can not be defined in data(),
    because the TARGET is different between server side (TARGET: node) and client side (TARGET: web)
    and this will cause the client-side rendered virtual DOM tree not matching server-rendered content

    can not use object-shorthand, because the tokens will be replaced by webpack.DefinePlugin
    */
    this.config = JSON.stringify({
      DEBUG: DEBUG, //eslint-disable-line
      TARGET: TARGET, //eslint-disable-line
      VERSION: VERSION, //eslint-disable-line
      CONFIG: CONFIG //eslint-disable-line
    }, null, 2)
  }
}
</script>
