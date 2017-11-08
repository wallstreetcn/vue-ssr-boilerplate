<template>

</template>

<script>
import { getAnimeList } from 'src/api/anime'

export default {
  async asyncData(route) {
    const sort = route.meta.sort
    const items = await getAnimeList({ sort })
    return { sort, items }
  },

  methods: {
    loadMore() {

    }
  }
}
</script>
