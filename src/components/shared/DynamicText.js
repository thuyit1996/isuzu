import Vue from 'vue';

Vue.component('dynamic-text', {
  render: function (createElement) {
    return createElement(
      this.tag,   // tag name
      this.$slots.default // array of children
    )
  },
  props: {
    tag: {
      type: String,
      required: true,
    }
  }
})