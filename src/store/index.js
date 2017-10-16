import Vue from 'vue'
import Store from 'vue-light-store'
import user from './user'
import foo from './foo'

Vue.use(Store)

export default function() {
  return new Store({
    user,
    foo
  })
}
