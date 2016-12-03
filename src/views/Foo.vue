<template>
  <div class="foo">
    <p>this.a: {{a}}</p>
    <p>this.$store.state.count: {{$store.state.count}}</p>
    <p>Enviroment Variables Defined by webpack.DefinePlugin:</p>
    <pre>{{config}}</pre>
    <p><router-link to="/">goto /</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0,
      config: null
    };
  },

  prefetch(store) {
    return Promise.all([
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            a: 123
          });
        });
      }),

      store.dispatch('asyncIncrement')
    ]).then(([componentData]) => componentData);
  },

  // won't run on server side
  beforeMount() {
    console.log(this.a); //eslint-disable-line

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
    }, null, 2);
  }
};
</script>
