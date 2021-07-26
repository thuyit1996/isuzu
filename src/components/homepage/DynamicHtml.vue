<template>
  <!-- <div class="popup-entersite" :class="active">
    <div class="popup-entersite-wrapper">
      <div class="image-entersite">
        <div class="image-entersite-inner">
          <img src="../../assets/desktop.png" alt="" class="popup-entersite-desktop" />
          <img src="../../assets/mobile.png" alt="" class="popup-entersite-mobile" />
        </div>
        <a v-on:click="close" class="btn-entersite">เข้าสู่เว็บไซต์</a>
      </div>
    </div>
  </div> -->
  <sc-rich-text v-if="active" tag="div" :field="fields.Content" class="splash-page"/>
</template>

<script>
import { RichText } from '@sitecore-jss/sitecore-jss-vue';
// import { lockScroll, unLockScroll } from '../../service/lockPopupService';

export default {
  name: 'DynamicHtml',
  components: {
    ScRichText: RichText,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector('body').style.opacity = 1;
    });
    this.closeSplashPage();
  },
  data: function() {
    return {
      active: true,
    };
  },
  methods: {
    closeSplashPage() {
      let btnEntersite = this.$el.querySelector('.btn-entersite');
      btnEntersite.addEventListener('click', () => {
        this.active = false;
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

>>>.popup-entersite-mobile {
  display: block;

  @include media-breakpoint-up(md) {
    display: none;
  }
}

>>>.popup-entersite-desktop {
  display: none;

  @include media-breakpoint-up(md) {
    display: block;
  }
}

.popup-entersite-outer {
  display: table;
  width: 100%;
  height: 100%;
  table-layout: fixed;
}

.popup-entersite-inner {
  position: relative;
  display: table-cell;
  vertical-align: middle;
}

>>>.popup-entersite-wrapper {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/mobile-bg.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @include media-breakpoint-up(md) {
    background-image: url("../../assets/desktop-bg.jpg");
    background-position: center top;
    background-size: cover;
  }

  &--king {
    background-image: url('../../assets/king-mobile-bg.jpg');

    @include media-breakpoint-up(md) {
      background-image: url('../../assets/king-desktop-bg.jpg');
    }
  }
}

>>>.popup-entersite {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #290e39;
  z-index: 9999;
  overflow: hidden;

  .image-entersite {
    position: relative;
    display: inline-block;
    width: 100%;
    height: auto;
    max-height: 100%;
    overflow: hidden;
    max-width: 768px;

    @include media-breakpoint-up(md) {
      max-width: 1200px;
    }

    &:before {
      content: "";
      display: block;
      position: relative;
      width: 100%;
      padding-top: 150%;

      @include media-breakpoint-up(md) {
        padding-top: 90%;
      }
    }
  }

  .image-entersite-inner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    height: inherit !important;
    border: 0;
    margin: auto;
    user-select: none;
  }

  .btn-entersite {
    position: absolute;
    left: 50%;
    width: 18.16667%;
    height: 9%;
    top: 75%;
    color: transparent;
    background-color: transparent;
    cursor: pointer;
    font-size: 0;
    z-index: 999;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0);

    @include media-breakpoint-up(md) {
      width: 18.16667%;
      height: 9%;
      top: 88%;
    }
  }

  .enter-site {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0);
    cursor: pointer;
    z-index: 1;
  }
}

>>>img {
  width: 100%;
  display: block;
  backface-visibility: hidden;
}

button {
  display: block;
  padding: 0;
  border: 0;
  background-color: transparent;
}
</style>

