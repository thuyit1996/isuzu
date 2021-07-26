import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import Vue from 'vue';
const ErrorComponent = Vue.component('ErrorComponent', {
  render(createElement) {
    return createElement('div', {
      class: 'error-component',
    });
  },
});
const IsuPlaceholder = Vue.component('IsuPlaceholder', {
  props: {
    name: {
      type: String,
    },
    rendering: {
      type: Object
    },
  },
  render(createElement) {
    return createElement(Placeholder, {
      props: {
        name: this.name,
        rendering: this.rendering,
        errorComponent: ErrorComponent,
      },
    });
  },
});
export default IsuPlaceholder;
