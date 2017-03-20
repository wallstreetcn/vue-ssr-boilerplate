<template>
  <div class="foo">
    <p>this.id: {{id}}</p>
    <p>this.$store.state.count: {{$store.state.count}}</p>
    <p>Enviroment Variables Defined by webpack.DefinePlugin:</p>
    <pre>{{config}}</pre>
    <p><router-link to="/">goto /</router-link></p>
  </div>
</template>

<style scoped>
.foo {
  color: blue
}
</style>

<script>
import config from '~/config'

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
    */
    this.config = JSON.stringify(config, null, 2)
  }
}
</script>
