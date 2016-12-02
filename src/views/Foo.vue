<template>
  <div class="foo">
    Hello world! {{a}}
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
