<template>
  <div>
    <!-- INFO: this is hidden field, we are not supposed to display anything here -->
  </div>
</template>

<script>
import Vue from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { getLineConfig as getCaptchaKey } from '../../service/loginLineService';
const fallBackCaptchaKey = '6LfvM5sUAAAAACs1XkNdQloWzf8TzUd1szhqfbJU';

export default {
  name: 'DynamicRecapcha',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      reCapchaToken: '',
    }
  },
  mounted() {
    getCaptchaKey().then(res => {
      let captchaKey = res.data?.CaptchaSiteKey?.length ? res.data.CaptchaSiteKey : fallBackCaptchaKey;
      Vue.use(VueReCaptcha, { siteKey: captchaKey });
      this.$nextTick(() => {
        this.getCapCha();
      })
    })
  },
  methods: {
    async recaptcha() {
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      return token;
    },
    getCapCha(){
      this.recaptcha().then(captchaKey => {
        this.reCapchaToken = captchaKey;
        this.$emit('on:change', {
          value: this.reCapchaToken,
          id: this.fields.itemId,
          // INFO: I don't know why $invalid is NOT working for this case
          // isValid: !this.$v.valueInput.$invalid,
          isValid: true,
        });
      });
    }
  }
}
</script>
