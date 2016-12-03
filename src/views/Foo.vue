<template>
  <div class="foo">
    <p>this.a: {{a}}</p>
    <p>this.$store.state.count: {{$store.state.count}}</p>
    <p><router-link to="/">goto /</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0
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
  }
};
</script>
