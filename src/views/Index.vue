<template>
  <div class="foo">
    <p>Hello world!</p>
    <p>this.a: {{a}}</p>
    <p><router-link to="/foo">goto /foo</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0
    };
  },

  prefetch() {
    return Promise.resolve({
      a: 123
    });
  },

  // won't run on server side
  beforeMount() {
    console.log(this.a); //eslint-disable-line
  }
};
</script>
