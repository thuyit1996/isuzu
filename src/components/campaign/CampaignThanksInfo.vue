<template>
<!-- thank-you--dark-theme -->
  <div class="thank-you" :class="isWhiteBackground ? '' : 'thank-you--dark-theme'">
    <div class="thank-you__banner">
      <picture>
        <sc-image :media="campaignRegisterImage.SmallImage" class="d-md-none" alt="Banner Image" v-if="!isEditing" />
        <sc-image :media="campaignRegisterImage.TabletImage" class="d-none d-md-block d-lg-none" alt="Banner Image" v-if="!isEditing" />
        <sc-image :media="campaignRegisterImage.Image" class="d-none d-md-none d-lg-block" alt="Banner Image" />
      </picture>
    </div>
    <div class="container">
      <div class="thank-you__heading">
        <sc-text tag="h2" class="thank-you__heading__title" :field="thankYouList.Title" />
        <sc-rich-text tag="p" :field="thankYouList.Description" class="thank-you__heading__content"/>
        <sc-text tag="p" class="thank-you__heading__registering" :field="thankYouList.ThanksLable" />
      </div>
      <div class="thank-you__button">
      <a :href="campaignRegisterImage.UrlPage" class="i-btn i-btn__primary--none-active" v-if="thankYouList.BackToRegisterTitle && thankYouList.BackToRegisterTitle.value">
        <sc-text :field="thankYouList.BackToRegisterTitle" />
      </a>
      <a :href="thankYouList.BackToCampaignUrl.value.href" :class="!checkBackButtonValid(thankYouList.BackToCampaignUrl.value.href) ? 'hidden' : ''" class="i-btn i-btn__primary--none-active" v-if="thankYouList.BackToCampaignTitle && thankYouList.BackToCampaignTitle.value">
        <sc-text :field="thankYouList.BackToCampaignTitle" />
      </a>
      </div>
    </div>
    <div class="over-lay" v-if="isShowOverLay">
      <span class="loading-icon"></span>
    </div>
  </div>
</template>

<script>
import { Text, Image, RichText } from '@sitecore-jss/sitecore-jss-vue';
import { mapState } from 'vuex';
import ProgressiveImageItem from '../shared/ProgressiveImageItem';

export default {
  name: 'CampaignThanksInfo',
  components: {
    ScImage: Image,
    ScText: Text,
    ScRichText: RichText,
    ProgressiveImageItem: ProgressiveImageItem,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      thankYouList: [],
      ratioMobile: '100',
      ratioTablet: '350/1024 * 100%',
      isEditing: false,
      isShowOverLay: false,
    }
  },
  computed: {
    ...mapState('campaign', { campaignRegisterImage: 'campaignRegisterImage' }),
    ...mapState('campaignthanks', { isWhiteBackground: 'isWhiteBackground' }),
  },
  methods: {
    checkBackButtonValid(backToCampaignUrl) {
      return backToCampaignUrl.length > 0;
    },
    checkUrlPage() {
      let urlThankPage = window.location.pathname;
      let campaignRegisterUrl = this.campaignRegisterImage.UrlPage; //INFO: get previous URL from local storage
      if (urlThankPage.indexOf(campaignRegisterUrl) == -1) { //INFO: check current URL to contain previous URL
        this.isShowOverLay = true;
        this.$router.push(this.thankYouList?.AutoDirectLink?.value?.href || '/');
      }
    }
  },
  mounted() {
    this.thankYouList = this.$jss.routeData().fields;
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    this.checkUrlPage();
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
.thank-you {
  margin-top: -50px;
  padding: 0 0 150px;

  &__heading {
    text-align: center;
    color: #004171;
    font-weight: bold;
    margin-top: 90px;
    font-family: $font-family-Kittithada-Bold75;

    @include media-breakpoint-up(md) {
      margin-top: 125px;
    }

    &__title {
      font-weight: bold;
      margin: 0;

      @include media-breakpoint-up(md) {
        font-size: 4.8rem;
      }
    }

    &__content {
      font-size: 2.25rem;
      line-height: 1; //INFO : following line-height current site

      @include media-breakpoint-up(md) {
        font-size: 3.6rem;
        line-height: .9;
      }

      p {
        margin-bottom: 0;
      }
    }
    
    span {
      display: block;
    }
    
    &__registering {
      margin: 35px 0 15px;
      font-size: 4.1rem;
      line-height: .9;

      @include media-breakpoint-up(sm) {
        margin: 35px 0 10px;
      }
    }
  }

  &__button {
    display: block;
    text-align: center;
    
    @include media-breakpoint-up(md) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__banner {

    img {
      width: 100%;
      height: auto;
    }
  }

  .i-btn {
    padding: 0;
    width: 175px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 2.7rem;
    cursor: pointer;
    transition: all .3s ease;
    margin: 0 18px 10px 0;
    font-family: $font-family-Kittihada-Medium65;

    @include media-breakpoint-up(sm) {
      margin: 5px;
    }

    @include media-breakpoint-up(lg) {
      margin: 5px 8px;
    }
  }

  .over-lay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;

    .loading-icon {
      @include loading-icon();
    }
  }
  &--dark-theme {
    background-color: $black;

    .thank-you {
      &__heading {
        color: $white;
      }
    }
  }
}

.hidden {
  display: none;
}
</style>