<template>
  <div class="savequote-item-mobile">
    <div class="savequote-item-mobile__archived" @click.prevent="navigateTo">
          <span class="savequote-item-mobile__archived__title">ใบเสนอราคาที่เก็บไว้</span>
          <div class="savequote-item-mobile__archived__icon">
            <img src="../../../assets/icon-quotation-save.svg" alt="icon-quotation-save">
          </div>
          <div class="savequote-item-mobile__archived__number" v-if="totalQuotOnLocalStorage > 0">
            <span>{{totalQuotOnLocalStorage}}</span>
          </div>
        </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { mapGetters } from "vuex";

export default {
  name: 'SaveQuoteItemMobile',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    saveAquoteLink: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    navigateTo() {
      if (this.saveAquoteLink?.value?.href?.length) {
        this.$router.push(this.saveAquoteLink.value.href);
      }
    },
  },
  computed: {
    ...mapGetters('savequote', { totalQuotOnLocalStorage: 'getSaveQuoteListLength'}),
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/reuse-mixin';

.savequote-item-mobile {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 38px;
  z-index: 1;
  background: $white;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @include media-breakpoint-up(md) {
    display: none;
  }

  &__archived {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    padding: 4px 8px 1px 0;
    justify-content: flex-end;

    &__title {
      display: inline-block;
      margin-right: 8px;
      font-size: $font-size-small;
    }

    &__icon {
      width: 15px;
      height: 15px;
      margin-bottom: 5px;
    }

    &__number {
      display: inline-block;
      position: relative;
      width: 13px;
      height: 13px;
      color: $white;
      background: #cd0002;
      border-radius: 50%;
      margin-bottom: 20px;
      margin-left: -2px;

      span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.15rem; //INFO: follow fontsize of design
      }
    }
  }
}
</style>
