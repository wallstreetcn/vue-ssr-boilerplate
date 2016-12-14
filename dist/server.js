module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("vue");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_Index_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__views_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Foo_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Foo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__views_Foo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_HTTP404_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_HTTP404_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__views_HTTP404_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_ShowErrorPage_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_ShowErrorPage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__views_ShowErrorPage_vue__);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a)






const routes = [
  { path: '/', component: __WEBPACK_IMPORTED_MODULE_2__views_Index_vue___default.a },
  { path: '/foo', component: __WEBPACK_IMPORTED_MODULE_3__views_Foo_vue___default.a },
  { path: '/show-error-page', component: __WEBPACK_IMPORTED_MODULE_5__views_ShowErrorPage_vue___default.a }
]

if (false) {
  routes.push(
    // catch-all route must be placed at the last
    { path: '*', component: HTTP404 }
  )
}

/* harmony default export */ exports["a"] = new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
  mode: 'history',
  routes
});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a)

/* harmony default export */ exports["a"] = new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
  state: {
    count: 0
  },

  mutations: {
    increment(state) {
      state.count++
    }
  },

  actions: {
    asyncIncrement({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('increment')
          resolve()
        })
      })
    }
  }
});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_ssrMixin__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_meta__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_meta___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_meta__);





__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_3_vue_meta___default.a)
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.mixin(__WEBPACK_IMPORTED_MODULE_2__libs_ssrMixin__["a" /* default */])

/* harmony default export */ exports["a"] = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App_vue___default.a);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(2);
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  router: __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */],
  metaInfo: {
    title: 'Default Title',
    titleTemplate: '%s - Company Name'
  }
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  data: function data() {
    return {
      title: '',
      description: '',
      a: 0,
      config: null
    };
  },
  metaInfo: function metaInfo() {
    return {
      title: this.title,
      meta: [{ vmid: 'description', name: 'description', content: this.description }]
    };
  },
  prefetch: function prefetch(store) {
    return Promise.all([new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          title: 'title async loaded',
          description: 'description async loaded',
          a: 123
        });
      });
    }), store.dispatch('asyncIncrement')]).then(function (_ref) {
      var componentData = _ref[0];
      return componentData;
    });
  },


  // won't run on server side
  beforeMount: function beforeMount() {
    console.log(this.a); //eslint-disable-line

    /*
    can not be defined in data(),
    because the TARGET is different between server side (TARGET: node) and client side (TARGET: web)
    and this will cause the client-side rendered virtual DOM tree not matching server-rendered content
     can not use object-shorthand, because the tokens will be replaced by webpack.DefinePlugin
    */
    this.config = JSON.stringify({
      DEBUG: false, //eslint-disable-line
      TARGET: "node", //eslint-disable-line
      VERSION: "0.1.0", //eslint-disable-line
      CONFIG: {"settingFoo":true,"settingBar":false} //eslint-disable-line
    }, null, 2);
  }
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  data: function data() {
    return {
      a: 0
    };
  },


  metaInfo: {
    title: 'Vue SSR Boilerplate',
    meta: [{ vmid: 'description', name: 'description', content: 'Vue SSR Boilerplate' }]
  },

  prefetch: function prefetch() {
    return Promise.resolve({
      a: 123
    });
  },


  // will be called on server side. check your console
  created: function created() {
    console.log(this.a); //eslint-disable-line
  },


  // won't run on server side
  beforeMount: function beforeMount() {
    console.log(this.a); //eslint-disable-line
  }
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  data: function data() {
    return {
      foo: 0
    };
  },
  prefetch: function prefetch() {
    return Promise.reject();
  },
  beforeMount: function beforeMount() {
    this.prefetched.catch(function () {
      alert('500 Internal Server Error');
    });
  }
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  created() {
    if (false) {
      if (window.__INITIAL_COMPONENTS_STATE__) {
        this.$router.getMatchedComponents().forEach((component, i) => {
          component.__INITIAL_STATE__ = window.__INITIAL_COMPONENTS_STATE__[i]
        })

        window.__INITIAL_COMPONENTS_STATE__ = null
      }
    }

    if (this.constructor.extendOptions && this.constructor.extendOptions.__INITIAL_STATE__) {
      Object.assign(this.$data, this.constructor.extendOptions.__INITIAL_STATE__)
      this.prefetched = Promise.resolve(this.constructor.extendOptions.__INITIAL_STATE__)
      this.constructor.extendOptions.__INITIAL_STATE__ = null
    } else if (this.$options.prefetch) {
      this.prefetched = this.$options.prefetch(this.$store).then(data => {
        Object.assign(this.$data, data)
        return data
      })
    }
  }
};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(4)

/* template */
var __vue_template__ = __webpack_require__(14)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "C:\\Users\\feniv\\Projects\\vue-ssr-boilerplate\\src\\App.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (__vue_options__.functional) {console.error("[vue-loader] App.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */

/* script */
__vue_exports__ = __webpack_require__(5)

/* template */
var __vue_template__ = __webpack_require__(16)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "C:\\Users\\feniv\\Projects\\vue-ssr-boilerplate\\src\\views\\Foo.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3dd83e14"
if (__vue_options__.functional) {console.error("[vue-loader] Foo.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* template */
var __vue_template__ = __webpack_require__(17)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "C:\\Users\\feniv\\Projects\\vue-ssr-boilerplate\\src\\views\\HTTP404.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (__vue_options__.functional) {console.error("[vue-loader] HTTP404.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(6)

/* template */
var __vue_template__ = __webpack_require__(18)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "C:\\Users\\feniv\\Projects\\vue-ssr-boilerplate\\src\\views\\Index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (__vue_options__.functional) {console.error("[vue-loader] Index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(7)

/* template */
var __vue_template__ = __webpack_require__(15)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "C:\\Users\\feniv\\Projects\\vue-ssr-boilerplate\\src\\views\\ShowErrorPage.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (__vue_options__.functional) {console.error("[vue-loader] ShowErrorPage.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    attrs: {
      "id": "app"
    }
  }, [_vm._c('router-view')])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "show-error-page"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "foo"
  }, [_vm._c('p', [_vm._v("this.a: " + _vm._s(_vm.a))]), _vm._v(" "), _vm._c('p', [_vm._v("this.$store.state.count: " + _vm._s(_vm.$store.state.count))]), _vm._v(" "), _vm._c('p', [_vm._v("Enviroment Variables Defined by webpack.DefinePlugin:")]), _vm._v(" "), _vm._c('pre', [_vm._v(_vm._s(_vm.config))]), _vm._v(" "), _vm._c('p', [_vm._c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("goto /")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "http404"
  }, [_vm._c('p', [_vm._v("404 Not Found")])])
}]}
module.exports.render._withStripped = true

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "foo"
  }, [_vm._c('p', [_vm._v("Hello world!")]), _vm._v(" "), _vm._c('p', [_vm._v("this.a: " + _vm._s(_vm.a))]), _vm._v(" "), _vm._c('p', [_vm._c('router-link', {
    attrs: {
      "to": "/foo"
    }
  }, [_vm._v("goto /foo")])]), _vm._v(" "), _vm._c('p', [_vm._c('router-link', {
    attrs: {
      "to": "/page-not-exist"
    }
  }, [_vm._v("goto /page-not-exist")])]), _vm._v(" "), _vm._c('p', [_vm._c('router-link', {
    attrs: {
      "to": "/show-error-page"
    }
  }, [_vm._v("goto /show-error-page")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = require("vue-meta");

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = require("vue-router");

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = require("vuex");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(2);
Object.defineProperty(exports, "__esModule", { value: true });




/* harmony default export */ exports["default"] = context => {
  __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].push(context.url)

  const matchedComponents = __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].getMatchedComponents()

  // no matched routes
  if (!matchedComponents.length) {
    return Promise.reject({ code: '404' })
  }

  // Call prefetch hooks on components matched by the route.
  return Promise.all(matchedComponents.map(component => {
    if (component.prefetch) {
      return component.prefetch(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */]).then(data => {
        component.__INITIAL_STATE__ = data
        return data
      })
    } else {
      return null
    }
  })).then(initialComponentsState => {
    context.initialComponentsState = initialComponentsState
    context.initialVuexState = __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].state
    context.meta = __WEBPACK_IMPORTED_MODULE_0__app__["a" /* default */].$meta()
    return __WEBPACK_IMPORTED_MODULE_0__app__["a" /* default */]
  })
};


/***/ }
/******/ ]);