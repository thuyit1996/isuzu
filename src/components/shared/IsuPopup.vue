<template>
  <div >
    <!-- <b-button id="show-btn" @click="showModal">Open Modal</b-button> -->
    <b-modal :no-close-on-backdrop="isLoading" :dialog-class="picturePopup ? 'isu-popup picture-popup' : 'isu-popup'" ref="my-modal" hide-header hide-footer id="modal-xl" :size="size">
      <span class="btn-close-modal" :class="isLoading ? 'disabled' : ''" block @click="hideModal"></span>
      <div class="text-center" v-if="waitingPopup">
        <div class="popup-waiting-icon"></div>
      </div>
      <div class="text-center" v-if="successfulPopup">
        <div class="successful-icon"></div>
      </div>
      <div class="text-center" v-if="failedPopup">
        <div class="failed-icon"></div>
      </div>
      <slot></slot>
    </b-modal>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'IsuPopup',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    picturePopup: false,
    size: {
      type: String,
      default: () => 'xl',
    },
    type: {
      type: String,
      default: () => '',
    },
    isLoading : {
      type : Boolean,
      default : false,
    }
  },
  data() {
    return {
      waitingPopup: false,
      successfulPopup: false,
      failedPopup: false,
    }
  },
  watch: {
    type : function(){
      if (this.type == 'waiting-popup') {
        this.waitingPopup = true;
        this.successfulPopup = false;
        this.failedPopup = false;
      } else if (this.type == 'successful-popup') {
        this.waitingPopup = false;
        this.successfulPopup = true;
        this.failedPopup = false;
      } else if (this.type == 'failed-popup') {
        this.waitingPopup = false;
        this.successfulPopup = false;
        this.failedPopup = true;
      }
    },
  },
  methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
    },
  
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

>>> .modal-content {
  border: none;
  border-top: 1px solid #ed2117;
  border-radius: 0;
  padding: 40px 0;

  @include media-breakpoint-up(lg) {
    padding: 40px 15px 0;
    border-top: 2px solid #ed2117;
  }
}

>>>.modal-dialog {
  padding: 25px 15px 44px;
  margin: 0;

  @include media-breakpoint-up(sm) {
    margin: 0 auto;
  }
}

>>> .modal-body {
  .btn-close-modal {
    display: block;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      background: url('../../assets/icon-close-lightbox.svg');
      background-position: center;
      background-repeat: no-repeat;
      right: 2px;
      top: -40px;
      width: 15px;
      height: 21px;
      background-size: 15px;

      @include media-breakpoint-up(lg) {
        right: -8px;
        top: -30px;
        width: 32px;
        background-size: 32px;
        height: 31px;
      }
    }

    &.disabled{
      pointer-events: none;
    }
  }
}
</style>
