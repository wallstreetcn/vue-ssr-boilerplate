<template>
<div>
  <h1>home</h1>
  <p>foo: {{ foo }}</p>
  <p>$state.foo.a: {{ $state.foo.a }} <button @click="$store.foo.setA($state.foo.a + 1)">+</button></p>
  <p><router-link to="/articles/1">/articles/1</router-link></p>
</div>
</template>

<script>
export default {
  asyncData(route, { store }) {
    return new Promise(resolve => {
      setTimeout(() => {
        store.foo.setA(234)
        resolve({ foo: 1 })
      }, 1)
    })
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
