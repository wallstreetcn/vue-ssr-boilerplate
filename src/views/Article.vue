<template>
<div>
  <h1>Article ID: {{ id }}</h1>
  <p><router-link to="/articles/1">/articles/1</router-link></p>
  <p><router-link to="/articles/2">/articles/2</router-link></p>
</div>
</template>

<script>
import headMixin from 'src/shared/headMixin'

export default {
  mixins: [headMixin],

  props: ['id'],

  watch: {
    id: 'load'
  },

  created() {
    this.load()
  },

  methods: {
    load() {
      this.setDocumentTitle('article ' + this.id)
      this.setDocumentMeta([
        { name: 'description', content: 'contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.' },
        { name: 'author', content: 'John Smitch' }
      ])
    }
  }
}
</script>
