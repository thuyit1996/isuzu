<template>
  <div class="test-drive__infoForm">
    <div class="container test-drive__infoForm__wrap">
      <div class="test-drive__infoForm__number">03</div>
      <div class="test-drive__infoForm__title">
        <sc-text class="isu-title" tag="h2" :field="fields.Title" />
      </div>
      <form class="test-drive__form">
        <div class="test-drive__form__information">
          <div class="row">
            <div class="col-md-6 infoForm-col">
              <isu-input
                :typeInput="'text'"
                :textLable="'ชื่อ'"
                :required="true"
                :valInput="vName"
                :nameInput="'vName'"
                :formGroupName="'userAccount'"
                :formControlName="'ชื่อ'"
                @inputChange="getDataInput"
              />
              <isu-input
                :typeInput="'text'"
                :textLable="'นามสกุล'"
                :required="true"
                :valInput="vLastName"
                :nameInput="'vLastName'"
                :formGroupName="'userAccount'"
                :formControlName="'นามสกุล'"
                @inputChange="getDataInput"
              />
              <isu-input
                :typeInput="'text'"
                :textLable="'เบอร์โทรศัพท์'"
                :required="true"
                :valInput="vPhone"
                :nameInput="'vPhone'"
                :formGroupName="'userAccount'"
                :formControlName="'เบอร์โทรศัพท์'"
                :pattern="'phone'"
                @inputChange="getDataInput"
              />
              <isu-input
                :typeInput="'text'"
                :textLable="'อีเมล (ถ้ามี)'"
                :valInput="vEmail"
                :pattern="'email'"
                :nameInput="'vEmail'"
                :formGroupName="'userAccount'"
                :formControlName="'Email'"
                @inputChange="getDataInput"
                :warning="'Please fill in your email address'"
              />

              <!-- <isu-select
                :textLable="'เวลาที่สะดวกให้ติดต่อ'"
                :valSelect="timeContactValue"
                :placeholder="'โปรดเลือกช่วงเวลา'"
                :listOptions="listPreferredContactTime"
                :required="true"
                :nameSelect="'timeContactValue'"
                :formGroupName="'userAccount'"
                :formControlName="'เวลาที่สะดวกให้ติดต่อ'"
                @onChangeSelect="getValSelect"
              ></isu-select> -->
              <isu-select-option-mux 
                :textLable="'เวลาที่สะดวกให้ติดต่อ'"
                :valSelect="timeContactValue" 
                :placeholder="'โปรดเลือกช่วงเวลา'" 
                :listOptions="listPreferredContactTime"
                :required="true"
                :nameSelect="'timeContactValue'" 
                :formGroupName="'userAccount'"
                :formControlName="'เวลาที่สะดวกให้ติดต่อ'"
                @onChangeSelect="getValSelect"
              >
              </isu-select-option-mux>
            </div>
            <div class="col-md-6 infoForm-col">
              <div class="terms">
                <p>ข้าพเจ้ายินยอมให้ บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด (“ตรีเพชร”) จัดเก็บ รวบรวมข้อมูล ข้างต้น รวมทั้งข้อมูลส่วนบุคคลไว้เพื่อวัตถุประสงค์ทางการตลาด การวิจัยตลาดและการ ติดต่อเพื่อการขาย การรับประกันรถยนต์ การบริการหลังการขาย การศึกษาวิจัยในการ พัฒนาและการนำเสนอผลิตภัณฑ์หรือบริการของตรีเพชร หรือบริษัทในกลุ่มตรีเพชร ซึ่งตรีเพชรอาจจะเปิดเผยข้อมูลนี้ให้กับบริษัทในกลุ่มตรีเพชร ผู้จำหน่ายรถยนต์อีซูซุ ที่ ได้รับการแต่งตั้ง รวมถึง ข้อมูลนี้อาจมีการถ่ายโอน จัดเก็บและประมวลผลโดยเจ้าหน้าที่ ในตรีเพชร บริษัทตัวแทน หรือ บริษัทคู่สัญญาของตรีเพชรเพื่อวัตถุประสงค์ดังกล่าว ข้างต้น</p>
                <div class="terms-checkbox">
                  <isu-check-box
                    @checkboxClick="getValueCheckbox"
                    :typeCheckbox="'checkbox'"
                    :idCheckbox="'term'"
                    :nameCheckbox="'termValue'"
                    :checked="termValue"
                    :textVal="'ยอมรับข้อตกลงและเงื่อนไขการให้บริการ'"
                    :required="true"
                  ></isu-check-box>
                  <isu-check-box
                    @checkboxClick="getValueCheckbox"
                    :typeCheckbox="'checkbox'"
                    :idCheckbox="'promotions'"
                    :nameCheckbox="'IsuzuDeals'"
                    :checked="IsuzuDeals"
                    :textVal="'ต้องการรับข่าวสารและข้อเสนอพิเศษจากอีซูซุ'"
                  ></isu-check-box>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="test-drive__form__LINE">
          <a :href="lineUrl" class="test-drive__form__LINE__btn">
            <img src="../../assets/line-img.png" alt="line" />
            <span>Login with LINE</span>
          </a>
          <div class="test-drive__form__LINE__text">ใช้ข้อมูลของท่านจาก my-ISUZU</div>
        </div> -->
        <div class="test-drive__form__submit">
          <button type="button" class="i-btn i-btn__primary" @click="onSubmit">ยืนยัน</button>
        </div>
      </form>
      <isu-popup ref="ResultSubmitForm" :isLoading="isLoading" :size="'sm'" :type="typePopup">
        <p class="text-center">{{resultSubmitForm}}</p>
      </isu-popup>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import IsuCheckBox from '../shared/IsuCheckBox';
import IsuInput from '../shared/IsuInput';
import IsuSelect from '../shared/IsuSelect';
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';
import { lineLoginRequest, submitTestDrive } from '../../service/testDriveService';
import { getLineToken, getLineUserInfo } from '../../service/loginLineService';
import IsuPopup from '../shared/IsuPopup';
import { getLineConfig } from '../../service/loginLineService';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { mapState, mapGetters, mapActions } from 'vuex';
import { getCookieData } from '../../service/cookieService';

const fallBackClientId = '1654059655';
const fallBackClientSecret = '408e63aa323a38d21745165f8bcc88d8';
const fallBackCaptchaKey = '6LfvM5sUAAAAACs1XkNdQloWzf8TzUd1szhqfbJU';

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export default {
  name: 'TestDriveForm',
  components: {
    ScText: Text,
    IsuCheckBox: IsuCheckBox,
    IsuInput: IsuInput,
    IsuSelect: IsuSelect,
    IsuSelectOptionMux: IsuSelectOptionMux,
    IsuPopup: IsuPopup,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      vName: '',
      vLastName: '',
      vPhone: '',
      vEmail: '',
      listTime: [],
      timeContactValue: {},
      termValue: false,
      IsuzuDeals: false,
      resultSubmitForm: '',
      typePopup: '',
      isAcceptTerm: true,
      isEmailValid: true,
      isPhoneValid: true,
      domain : '',
      client_id : '',
      client_secret : '',
      listPreferredContactTime : [],
      isLoading : false,
      testDrivePageData: {},
    };
  },
  computed: {
    ...mapGetters('testdrive', { carSelected: 'getcarvalue' }),
    ...mapGetters('testdrive', { thankUrl: 'getThankUrl' }),
    ...mapState('dealers', { dealerValue: 'testDriveCurrentDealer' }),
    ...mapState('dealers', { provinceValue: 'testDriveCurrentProvince' }),
    ...mapState('dealers', { districtValue: 'testDriveCurrentDistrict' }),
    ...mapGetters('testdrive', { listCars: 'getCarList' }),

    lineUrl: function() {
      const encodedDomain = encodeURIComponent(this.domain);
      return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${this.client_id}&redirect_uri=${encodedDomain}&state=randomstring&scope=profile openid email`;
    },
  },
  mounted() {
    this.testDrivePageData = this.$jss.routeData().fields;
    getLineConfig().then(res => {
      this.client_id = res.data?.LineKey?.ClientId?.length ? res.data.LineKey.ClientId : fallBackClientId;
      this.client_secret = res.data?.LineKey?.ClientSecret?.length ? res.data.LineKey.ClientSecret : fallBackClientSecret;
      let captchaKey = res.data?.CaptchaSiteKey?.length ? res.data.CaptchaSiteKey : fallBackCaptchaKey;
      Vue.use(VueReCaptcha, { siteKey: captchaKey });
    });

    this.domain = window.location.href;
    this.listPreferredContactTime = this.$jss.routeData().fields?.PreferredContactTime;
    if(this.listPreferredContactTime?.length){
      this.listPreferredContactTime = this.listPreferredContactTime.map(item => {
        return {
          id : item.id,
          label : item?.fields?.["Preferred Contact Time"]?.value,
        }
      });
    }
    let queryData = this.$route.query;
    if (!isEmpty(queryData)) {
      let payload = {
        grant_type: 'authorization_code',
        code: queryData.code,
        redirect_uri: window.location.href.split("?")[0],
        client_id: this.client_id,
        client_secret: this.client_secret,
      };

      getLineToken(payload).then((res) => {
        getLineUserInfo(this.client_id, res.data.id_token).then((userInfo) => {
          window.history.pushState('', '', window.location.pathname);
          this.vEmail = userInfo.data.email;
          this.vName = userInfo.data.name;
        });
      });
    };
    this.scrollTopComponent();
  },

  methods: {
    ...mapActions('testdrivethanks', ['addTestDriveItem']),
    async recaptcha() {
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      return token;
    },
    onSubmit() {
      const formGroupName = 'userAccount';
      const getUserId = getCookieData('_td');
      let payload = {
        FirstName: this.vName,
        LastName: this.vLastName,
        PhoneNumber: this.vPhone,
        Province: this.provinceValue.id,
        District: this.districtValue.id,
        CarType: this.carSelected.carTypeId,
        Dealer: this.dealerValue.id,
        UserId: getUserId,
        DealerId: this.dealerValue.DealerId,
        PreferredContactTime: this.timeContactValue.label,
        CarName: this.carSelected.label,
        CarTypeImage: this.carSelected.carImage,
        CarTypeImageSm: this.carSelected.carImageSm,
        Dealername: this.dealerValue.label,
      };
      this.$root.$emit('submitForm', formGroupName);
      if(this.termValue){
        this.isAcceptTerm = true;
        this.submitFormHandler(payload);
      }else{
        this.isAcceptTerm = false;
        this.resultSubmitForm = this.$getConst('ACCEPT_ALL_INFORMATION');
        this.$refs.ResultSubmitForm.showModal();
      }
    },
    submitFormHandler (payload) {
      // TODO : need change a solution get error from other component
      if (this.checkFormInvalid(payload) == 0 && this.isEmailValid && this.isPhoneValid) {
        if(this.vEmail){
          payload.Email = this.vEmail;
        }
        if(this.IsuzuDeals){
          payload.IsuzuDeals = true;
        }
        this.isLoading = true;
        this.typePopup = 'waiting-popup';
        this.resultSubmitForm = 'Loading...';
        this.$refs.ResultSubmitForm.showModal();
        this.recaptcha().then(captchaKey => {
          payload.GoogleRecapcha = captchaKey;
          submitTestDrive(payload)
          .then((res) => {
            this.isLoading = false;
            if (res.data.IsSuccess) {
              this.addTestDriveThanksData(payload);
              this.$root.$emit('setFlagSubmitForm');
              this.clearTestDriveForm();
              // INFO: change route to thankyou page requirement
              // this.navigateTo();
              this.$router.push(this.thankUrl);
            }else {
              this.typePopup = 'failed-popup';
              this.resultSubmitForm = 'กรุณากรอกข้อมูลให้ครบถ้วน';
            }
            this.$refs.ResultSubmitForm.showModal();
            // INFO: set submitted form to false for IsuInput

          })
          .catch((err) => {
            this.isLoading = false;
            this.typePopup = 'failed-popup';
            this.resultSubmitForm = 'กรุณากรอกข้อมูลให้ครบถ้วน';
            this.$refs.ResultSubmitForm.showModal();
          });
        }).catch((error) => {
          this.isLoading = false;
          this.typePopup = 'failed-popup';
          this.resultSubmitForm = 'Getting recapcha value failed';
        })
      }else{
        this.typePopup = 'failed-popup';
        this.resultSubmitForm = this.$getConst('FILL_ALL_INFORMATION');
        this.$refs.ResultSubmitForm.showModal();
      }
    },
    addTestDriveThanksData(payload) {
      let testDriveThanksData = {
        ...payload,
        urlTestDrivePage: this.thankUrl,
      }
      this.addTestDriveItem(testDriveThanksData);
    },
    getDataInput(valInput) {
      if(valInput.name == 'vEmail'){
        this.isEmailValid = valInput.valid;
      }
      if(valInput.name == 'vPhone'){
        this.isPhoneValid = valInput.valid;
      }
      this[valInput.name] = valInput.data;
    },
    getValueCheckbox(checkbox) {
      this[checkbox.name] = checkbox.value;
      if(checkbox.name == 'termValue' && checkbox.value){
        this.isAcceptTerm = true;
      }
    },
    getValSelect(select) {
      this[select.name] = select.value;
    },
    checkFormInvalid(formValue) {
      // INFO: check all form field is valid or not
      return Object.keys(formValue).filter(
        (key) => formValue[`${key}`] === '' || typeof formValue[`${key}`] === 'undefined'
      ).length;
    },
    clearTestDriveForm(){
      this.vName = "";
      this.vLastName = "";
      this.vPhone = "";
      this.vEmail = "";
      this.timeContactValue = {};
    },
    scrollTopComponent() {
      this.$root.$on('scroll:TestDriveForm', () => {
        this.$el.scrollIntoView();
      });
    },
    navigateTo() {
      if (this.testDrivePageData.ThanksPageUrl?.value?.href?.length) {
        this.$router.push(this.testDrivePageData.ThanksPageUrl.value.href);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

h2 {
  margin-bottom: 0;
}

button {
  padding: 0;
  outline: none;
}

.form-error{
  color: red;
  text-align: left;
}

.test-drive {
  &__infoForm {
    padding: 50px 0 0 0;
    z-index: $NOMAL-ZINDEX;
    position: relative;

    &__wrap {
      @include media-breakpoint-up(lg) {
        padding: 0 95px;
      }
    }

    &__number {
      font-size: $font-size-test-drive-heading-number-mobile;
      line-height: 2.4rem; //INFO: Line-height follow as design
      color: #cccccc;
      text-align: center;
      margin-bottom: 10px;

      @include media-breakpoint-up(lg) {
        font-size: $font-size-test-drive-heading-number;
        line-height: 4.8rem; //INFO: Line-height follow as design
        margin-bottom: -7px;
      }
    }

    &__title {
      text-align: center;
      margin-bottom: 30px;

    }

    .infoForm-col {
      margin-bottom: 20px;
    }

    .terms {
      font-size: $font-size-small;

      @include media-breakpoint-up(lg) {
        font-size: 1.9rem;
      }

      p {
        margin-bottom: 35px;
        font-size: $font-size-test-drive-term;

        @include media-breakpoint-up(lg) {
          margin-bottom: 12px;
        }
      }
    }

    .terms-checkbox {
      font-size: $font-size-test-drive-checkbox;
    }

    .required {
      color: #ef3f36;
    }

    & >>> .vs__clear {
      display: none;
    }

    & >>> .vs__dropdown-toggle {
      border: 1px solid #b7b7b7;
      border-radius: 0;
    }

    .isu-select-option-mux,
    .isu-input {
      font-size: $font-size-test-drive-select;

      >>> label {
        font-size: $font-size-test-drive-label;
      }
    }

    .isu-select-option-mux {
      margin-bottom: 20px;
      font-size: 2.5rem;
      >>> select {
        height: 50px;
      }
    }

    >>> .v-select {
      @include media-breakpoint-up(lg) {
        width: 100%;
      }
    }
  }

  &__form {
    display: flex;
    flex-direction: column;

    &__information {
      order: 2;

      .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 22px;
      }

      .form-control {
        padding: 8px 10px;
        color: $gray-700;
      }
    }

    &__LINE {
      border-top: 1px solid #d8dde6;
      border-bottom: 1px solid #d8dde6;
      padding: 24px 0 20px;
      display: flex;
      align-items: center;
      margin-bottom: 35px;
      flex-direction: column;
      justify-content: center;

      @include media-breakpoint-up(lg) {
        padding: 24px 0;
        margin-bottom: 55px;
      }

      &__btn {
        background-color: #00c33c;
        border: none;
        border-radius: 5px;
        display: flex;
        align-items: center;

        @include media-breakpoint-up(lg) {
          flex-direction: row;
        }

        &:hover {
          background-color: #04a736;
        }

        img {
          border-right: 2px solid #00b700;
          margin: 5px;
          width: 29px;
          padding-right: 5px;

          @include media-breakpoint-up(lg) {
            width: auto;
            margin: 7px;
            padding-right: 4px;
          }
        }

        span {
          height: 100%;
          padding: 0 20px;
          color: $white;
          font-size: 1.1rem;
          font-family: Helvetica;
          font-weight: bold;
          line-height: 1.8rem; //INFO: Line-height follow as design
          // INFO: safari fix
          display: flex;
          justify-content: center;
          align-items: center;

          @include media-breakpoint-up(lg) {
            font-size: $font-size-small;
            font-weight: normal;
            line-height: 2.4rem; //INFO: Line-height follow as design
            padding: 0 34px;
          }
        }
        
        &:hover {
          text-decoration: none;
        }
      }

      &__text {
        margin-top: 14px;

        &:hover {
          color: $red-hover-color;
          cursor: pointer;
        }

        @include media-breakpoint-up(lg) {
          margin-top: 20px;
          margin-left: 0;
        }
      }
    }

    &__submit {
      text-align: center;
      order: 2;
      margin-top: 8px;
      font-family: $font-family-Kittihada-Medium65;

      @include media-breakpoint-up(lg) {
        margin-top: 18px;
      }

      button {
        padding: 10px 0;
        font-size: $font-size-test-drive-button;
      }
    }
  }
}
</style>
