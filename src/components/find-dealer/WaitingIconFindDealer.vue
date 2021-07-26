<template>
  <div class="find-dealer-loading">
    <div class="container">
      <div class="find-dealer-loading__item waiting-icon"> </div>
      <div class="find-dealer-loading__item waiting-icon"> </div>
      <div class="find-dealer-loading__item waiting-icon"> </div>
      <div class="find-dealer-loading__item waiting-icon"> </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'WaitingIconFindDealer',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.waiting-icon {
  background: #ECE9E6; 
  background: linear-gradient(to right,  #fcfafa,  #e6e3df59 , #fcfafa );
  background-position-x: 0px;
  background-repeat: repeat;
  animation: waiting-icon 0.75s linear infinite;
}

@keyframes waiting-icon {
  0%   {background-position-x: 0px;}
  25%  {background-position-x: 250px;}
  50%  {background-position-x: 500px;}
  75%  {background-position-x: 750px;}
  100% {background-position-x: 1000px;}
}

.find-dealer-loading {
  margin: 50px 0;

  &__item {
    width: 90%;
    height: 45px;
    margin-bottom: 20px;
  }
}
</style>