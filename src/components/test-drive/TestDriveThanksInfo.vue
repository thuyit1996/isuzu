<template>
  <div class="test-drive-thanks-info">
    <div class="container">
      <div class="test-drive-thanks-info__wrapper">
        <sc-rich-text tag="div" class="test-drive-thanks-info__name" :field="fields.NotificationTitle"></sc-rich-text>
        <div class="row">
          <div class="col-lg-6">
            <div class="test-drive-thanks-info__img d-none d-md-block">
              <img :src="imageEndPoint(testDriveInfo.CarTypeImage)" alt="x">
            </div>
            <div class="test-drive-thanks-info__img d-md-none">
              <img :src="imageEndPoint(testDriveInfo.CarTypeImageSm)" alt="x">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="test-drive-thanks-info__group">
              <!-- <div class="test-drive-thanks-info__title">รถที่ต้องการทดลองขับ</div> -->
              <sc-text tag="div" class="test-drive-thanks-info__title" :field="fields.CarTitle" />
              <div class="test-drive-thanks-info__contnet">{{testDriveInfo.CarName}}</div>
            </div>
            <div class="test-drive-thanks-info__group">
              <!-- <div class="test-drive-thanks-info__title">ชื่อ-นามสกุล</div> -->
              <sc-text tag="div" class="test-drive-thanks-info__title" :field="fields.NameTitle" />
              <div class="test-drive-thanks-info__contnet">{{testDriveInfo.LastName}} {{testDriveInfo.FirstName}}</div>
            </div>
            <div class="test-drive-thanks-info__group">
              <!-- <div class="test-drive-thanks-info__title">เบอร์โทรศัพท์</div> -->
              <sc-text tag="div" class="test-drive-thanks-info__title" :field="fields.PhoneTitle" />
              <div class="test-drive-thanks-info__contnet">{{testDriveInfo.PhoneNumber}}</div>
            </div>
            <div class="test-drive-thanks-info__group">
              <!-- <div class="test-drive-thanks-info__title">เวลาที่สะดวกให้ติดต่อ</div> -->
              <sc-text tag="div" class="test-drive-thanks-info__title" :field="fields.TimeContactTitle" />
              <div class="test-drive-thanks-info__contnet">{{testDriveInfo.PreferredContactTime}}</div>
            </div>
            <div class="test-drive-thanks-info__group">
              <!-- <div class="test-drive-thanks-info__title">อีเมล</div> -->
              <sc-text tag="div" class="test-drive-thanks-info__title" :field="fields.EmailTitle" />
              <div class="test-drive-thanks-info__contnet">{{testDriveInfo.Email}}</div>
            </div>
            <div class="test-drive-thanks-info__group">
              <!-- <div class="test-drive-thanks-info__title">ผู้จำหน่าย</div> -->
              <sc-text tag="div" class="test-drive-thanks-info__title" :field="fields.SupplierTitle" />
              <div class="test-drive-thanks-info__contnet">{{testDriveInfo.Dealername}}</div>
            </div>
          </div>
        </div>
        <!-- <p class="test-drive-thanks-info__notify text-center">
            ท่านจะได้รับการติดต่อกลับจากผู้จำหน่ายที่ท่านได้เลือกไว้
          <br>
            ขอขอบคุณเป็นอย่างสูง สำหรับความสนใจรถอีซูซุ
        </p> -->
        <sc-rich-text tag="p" class="test-drive-thanks-info__notify text-center" :field="fields.ThankYouForRegistrationContent"></sc-rich-text>
      </div>
      <div class="test-drive-thanks-info__button text-center">
        <!-- <span class="i-btn i-btn__primary" @click.prevent="navigateTo">กลับหน้าทดลองขับ</span> -->
        <button type="button"  class="i-btn i-btn__primary" @click="navigateTo">
          <sc-text :field="fields.BackToTestDriveLabel" />
        </button>
      </div>
    </div>
    <div class="over-lay" v-if="isShowOverLay">
      <span class="loading-icon"></span>
    </div>
  </div>
</template>

<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import { mapState } from 'vuex';
import { GetEndPoint } from '../../service/genericService';

export default {
  name: 'TestDriveThanksInfo',
  components: {
    ScText: Text,
    ScRichText: RichText,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      testDriveInfo: {},
      isShowOverLay: false,
      testDriveThanksDataList: [],
    }
  },
  computed: {
    ...mapState('testdrivethanks', { testDriveItem: 'testDriveItem' }),
  },
  mounted() {
    this.testDriveThanksDataList = this.$jss.routeData().fields;
    this.testDriveInfo = this.testDriveItem;
    window.scrollTo(0, 0);
    this.checkUrlPage();
  },
  methods: {
    navigateTo() {
      this.isShowOverLay = true;
      if (this.fields.BackToTestDriveUrl?.value?.href?.length) {
        this.$router.push(this.fields.BackToTestDriveUrl.value.href);
      }
    },
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
    checkUrlPage() {
      let testDriveUrl = this.testDriveInfo.urlTestDrivePage; //INFO: get previous URL from local storage
      let testDriveThankUrl = window.location.pathname;
      if (testDriveThankUrl.indexOf(testDriveUrl) == -1) { //INFO: check current URL to contain previous URL
        this.isShowOverLay = true;
        this.$router.push(this.testDriveThanksDataList?.AutoDirectLink?.value?.href || '/');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.test-drive-thanks-info {
  background-color: #f4f6f6;
  padding: 1px;

  &__wrapper {
    background-color: #fff;
    padding: 28px;
    font-size: 2.5rem;
    line-height: 1.4;
    margin: 30px 0;
    box-shadow: 0 0 5px #e4e4e4;
    border-radius: 3px;

    @include media-breakpoint-up(md) {
      padding: 45px 23px 23px;

    }

    @include media-breakpoint-up(lg) {
      margin: 15px 0 36px 0;
      padding: 50px 23px 23px;

    }
  }

  &__name {
    font-size: 5rem;
    margin-bottom: 15px;
    line-height: .95; // INFO : follow line height of current site

  }

  &__img {
    padding: 10px 0 20px 0;
    text-align: center;

    @include media-breakpoint-up(lg) {
      padding: 30px 0;
    }
  }

  &__group {
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 25px;
    }
  }

  &__title {
    font-weight: bold;
  }

  &__notify {
    font-family: $font-family-Kittithada-Bold75;
    line-height: .9; // INFO : follow line height of current site
  }

  &__button {
    margin-bottom: 35px;
  }

  .over-lay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.8;

    .loading-icon {
      @include loading-icon();
    }
  }

  .i-btn {
    font-size: 2.5rem;
    font-family: $font-family-Kittithada-Bold75;
    padding: 12px 30px;
    height: 43px;
    line-height: 20px;

  }
}
</style>