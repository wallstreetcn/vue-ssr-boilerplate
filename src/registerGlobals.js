// Register global mixins, components, etc only once

import Vue from 'vue'
import ssrMixin from './shared/ssrMixin'

if (!Vue.globalsRegistered) {
  Vue.globalsRegistered = true
  Vue.mixin(ssrMixin)
}
