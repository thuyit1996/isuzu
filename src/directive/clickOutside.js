export default {
  /**
   * @type {import('vue').DirectiveFunction}
   */
  bind(el, binding) {
    function bodyCLick(e) {
      //INFO: Only binding value when target on click isn't a descendant of element directive.
      if (!el.contains(e.target)) {
        binding.value();
      }
    }

    document.body.addEventListener('click', bodyCLick);
  },
  /**
   * @type {import('vue').DirectiveFunction}
   */
  unbind(el, binding) {
    document.body.removeEventListener('click', binding.value);
  },
};
