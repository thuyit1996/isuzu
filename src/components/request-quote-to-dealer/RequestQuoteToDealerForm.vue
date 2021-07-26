<template>
  <div class="test-drive__infoForm" v-show="isShowDealerForm">
    <div class="container test-drive__infoForm__wrap">
      <!-- <div class="test-drive__infoForm__number">04</div> -->
      <div class="test-drive__infoForm__title">
        <sc-text class="isu-title" tag="h2" :field="fields.Title" />
      </div>
      <form class="test-drive__form">
        <div class="test-drive__form__information">
            <div class="row">
              <div class="col-md-6 infoForm-col">
                <label>
                  <sc-text :field="fields.NameLable" />
                  <span class="required"> *</span>
                </label>
                <isu-input
                :typeInput="'text'"
                :required="true"
                :valInput="vName"
                :nameInput="'vName'"
                :formGroupName="'userAccount'"
                :formControlName="'ชื่อ'"
                @inputChange="getDataInput"
                />
                <label>
                  <sc-text :field="fields.LastNameLable" />
                  <span class="required"> *</span>
                </label>
                <isu-input
                :typeInput="'text'"
                :required="true"
                :valInput="vLastName"
                :nameInput="'vLastName'"
                :formGroupName="'userAccount'"
                :formControlName="'นามสกุล'"
                @inputChange="getDataInput"
                />
                <label>
                  <sc-text :field="fields.PhoneNumberLable" />
                  <span class="required"> *</span>
                </label>
                <isu-input
                :typeInput="'text'"
                :required="true"
                :valInput="vPhone"
                :nameInput="'vPhone'"
                :pattern="'phone'"
                :formGroupName="'userAccount'"
                :formControlName="'เบอร์โทรศัพท์'"
                @inputChange="getDataInput"
                />
                <label>
                  <sc-text :field="fields.EmailLable" />
                </label>
                <isu-input
                :typeInput="'text'"
                :valInput="vEmail"
                :nameInput="'vEmail'"
                :pattern="'email'"
                :formGroupName="'userAccount'"
                :formControlName="'Email'"
                @inputChange="getDataInput"
                />
                <label>
                  <sc-text :field="fields.ContactTimeLable" />
                  <span class="required"> *</span>
                </label>
                <!-- <isu-select
                :valSelect="timeContactValue"
                :placeholder="'โปรดเลือกช่วงเวลา'"
                :listOptions="listPreferredContactTime"
                :required="true"
                :formGroupName="'userAccount'"
                :formControlName="'เวลาที่สะดวกให้ติดต่อ'"
                :nameSelect="'timeContactValue'"
                @onChangeSelect="getValSelect">
                </isu-select> -->
                <isu-select-option-mux 
                  :valSelect="timeContactValue" 
                  :placeholder="'โปรดเลือกช่วงเวลา'"
                  :listOptions="listPreferredContactTime"
                  :required="true"
                  :formGroupName="'userAccount'"
                  :formControlName="'เวลาที่สะดวกให้ติดต่อ'"
                  :nameSelect="'timeContactValue'" 
                  @onChangeSelect="getValSelect"
                >
              </isu-select-option-mux>
              </div>
              <div class="col-md-6 infoForm-col">
                <div class="terms">
                  <sc-rich-text tag="div" class="terms__contents" :field="fields.TermsAndCondition" />
                  <!-- <p>ข้าพเจ้ายินยอมให้ บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด (“ตรีเพชร”) จัดเก็บ รวบรวมข้อมูล ข้างต้น รวมทั้งข้อมูลส่วนบุคคลไว้เพื่อวัตถุประสงค์ทางการตลาด การวิจัยตลาดและการ ติดต่อเพื่อการขาย การรับประกันรถยนต์ การบริการหลังการขาย การศึกษาวิจัยในการ พัฒนาและการนำเสนอผลิตภัณฑ์หรือบริการของตรีเพชร หรือบริษัทในกลุ่มตรีเพชร  ซึ่งตรีเพชรอาจจะเปิดเผยข้อมูลนี้ให้กับบริษัทในกลุ่มตรีเพชร ผู้จำหน่ายรถยนต์อีซูซุ ที่ ได้รับการแต่งตั้ง รวมถึง ข้อมูลนี้อาจมีการถ่ายโอน จัดเก็บและประมวลผลโดยเจ้าหน้าที่ ในตรีเพชร บริษัทตัวแทน หรือ บริษัทคู่สัญญาของตรีเพชรเพื่อวัตถุประสงค์ดังกล่าว ข้างต้น</p> -->
                  <div class="terms-checkbox">
                    <isu-check-box
                    :typeCheckbox="'checkbox'"
                    :idCheckbox="'term'"
                    :nameCheckbox="'termValue'"
                    :checked="termValue"
                    @checkboxClick="getValueCheckbox">
                    </isu-check-box>
                    <label class="checkbox-label">
                      <sc-text :field="fields.AcceptTheTermsAndConditionsLabel" />
                      <span class="required"> *</span>
                    </label>
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
      </form>
      <isu-popup ref="ResultSubmitForm" :isLoading="isLoading" :size='"sm"' :type="typePopup">
        <p class="text-center">{{resultSubmitForm}}</p>
      </isu-popup>
    </div>
    <div class="test-drive__form__submit">
      <button type="button" class="i-btn i-btn__primary"  @click="onSubmit">ยืนยัน</button>
    </div>
    <isu-popup ref="testDriveFormResult" :size="'sm'" :type="typePopup">
      <p class="text-center">{{popupText}}</p>
    </isu-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import IsuCheckBox from '../shared/IsuCheckBox';
import IsuInput from '../shared/IsuInput';
import IsuSelect from '../shared/IsuSelect';
import IsuPopup from '../shared/IsuPopup';
import { getLineToken, getLineUserInfo } from '../../service/loginLineService';
import { submitRequestQuoteToDealer } from '../../service/requestQuoteToDealerService';
import { mapState } from 'vuex';
import { getCookieData } from '../../service/cookieService';
import { getLineConfig } from '../../service/loginLineService';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';

const fallBackClientId = '1654059741';
const fallBackClientSecret = 'ecd9918e8730ee2bcf082c9455b03d6f';
const fallBackCaptchaKey = '6LfvM5sUAAAAACs1XkNdQloWzf8TzUd1szhqfbJU';

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export default {
  name: 'RequestQuoteToDealerForm',
  components: {
    ScText: Text,
    IsuCheckBox: IsuCheckBox,
    IsuInput: IsuInput,
    IsuSelect: IsuSelect,
    IsuPopup: IsuPopup,
    ScRichText: RichText,
    IsuSelectOptionMux: IsuSelectOptionMux,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState('quotation', { finalQuote: 'quoteToDealerData' }),
    ...mapState('dealers', { dealerValue: 'quoteToDealerCurrentDealer'}),
    ...mapState('dealers', { provinceValue: 'quoteToDealerCurrentProvince'}),
    ...mapState('dealers', { districtValue: 'quoteToDealerCurrentDistrict'}),
    ...mapState('quotation', { carTypeData: 'carTypeData' }),

    lineUrl: function() {
      const encodedDomain = encodeURIComponent(this.domain);
      return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${this.client_id}&redirect_uri=${encodedDomain}&state=randomstring&scope=profile openid email`;
    },
  },
  data() {
    return {
      vName: '',
      vLastName: '',
      vPhone: '',
      vEmail: '',
      listPreferredContactTime: [],
      timeContactValue: {},
      termValue: false,
      promotionsValue: false,
      carType: '',
      carGrade: '',
      carColor: '',
      insuranceValue: '',
      resultSubmitForm: '',
      isAcceptTerm: true,
      popupText: '',
      typePopup: '',
      isEmailValid: true,
      isPhoneValid: true,
      domain : '',
      client_id : '',
      client_secret : '',
      isLoading: false,
      isShowDealerForm: false,
      calculationResultsData: {},
    };
  },
  methods: {
    async recaptcha() {
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      return token;
    },
    // INFO: Use getter for this
    getDataFromStore() {
      this.carType = this.finalQuote.carType;
      this.carGrade = this.finalQuote.carGrade.Title;
      this.carColor = this.finalQuote.carColor.name;
      this.insuranceValue = this.finalQuote.carInsurance.title;
    },
    onSubmit() {
      // let quote = this.finalQuote;
      let quote = this.carTypeData;
      const formGroupName = 'userAccount';
      const getUserId = getCookieData('_td');
      this.$root.$emit('submitForm', formGroupName);
      // TODO : need change  a solution get error from other component
      this.getDataFromStore();
      this.$nextTick(() => {
        let payload = {
          FirstName: this.vName,
          LastName: this.vLastName,
          PhoneNumber: this.vPhone,
          Province: this.provinceValue.id,
          District: this.districtValue.id,
          // CarType: quote.carModel.carModelId,
          // CarGrade: this.carGrade,
          // CarColor: this.carColor,
          // INFO: Insurance is not mandatory
          Dealer: this.dealerValue.DealerId,
          UserId: getUserId,
          PreferredContactTime: this.timeContactValue.label,
        };
        if (this.checkFormInvalid(payload) == 0 && this.isEmailValid && this.isPhoneValid) {
          if (!this.termValue) {
            this.isAcceptTerm = false;
            this.typePopup = 'failed-popup';
            this.popupText = 'กรุณาคลิกยอมรับเงื่อนไขก่อนลงทะเบียน';
            this.$refs.testDriveFormResult.showModal();
            return;
          }
          // INFO : add more field
          payload.CarType = quote.CarTypeId;
          payload.CarModelId = quote.CarModelId;
          payload.CarModelName = quote.CarModelName;
          payload.CarSubModelId = quote.CarSubModelId;
          payload.CarSubModelName = quote.CarSubModelName;
          payload.CarSubModelPrice = quote.CarSubModelPrice;
          payload.CarColorId = quote.CarColorId;
          payload.CarColorName = quote.CarColorName;
          payload.CarColorPrice = quote.CarColorPrice;
          // payload.CarSpecialServiceId = quote.carInsurance.Id;
          // payload.CarSpecialServiceName = quote.carInsurance.title;
          // payload.CarSpecialServicePrice = quote.carInsurance.price;
          payload.Source = 'website';
          payload.DealerName = this.dealerValue.label;
          payload.DownPaymentPercent = this.calculationResultsData.PaymentAmountPecent;
          payload.DownPaymentPrice = this.calculationResultsData.PaymentAmountPrice;
          payload.InterestRate = this.calculationResultsData.InterestRate;
          payload.MonthlyPeriod = this.calculationResultsData.MonthlyPeriod;
          if (this.vEmail) {
            payload.Email = this.vEmail;
          }
          this.isLoading = true;
          this.typePopup = 'waiting-popup';
          this.resultSubmitForm = 'Loading...';
          this.$refs.ResultSubmitForm.showModal();
          this.recaptcha()
            .then((captchaKey) => {
              payload.GoogleRecapcha = captchaKey;
              submitRequestQuoteToDealer(payload)
                .then((res) => {
                  this.isLoading = false;
                  if (res.data.IsSuccess) {
                    this.typePopup = 'successful-popup';
                    this.resultSubmitForm = `
                    ท่านจะได้รับการติดต่อกลับจากผู้จำหน่ายที่ท่านได้เลือกไว้
                    ขอขอบคุณเป็นอย่างสูง สำหรับความสนใจรถอีซูซุ`;
                    this.$root.$emit('setFlagSubmitForm');
                    this.clearRequestQuoteToDealer();
                  } else {
                    this.typePopup = 'failed-popup';
                    this.resultSubmitForm = 'กรุณากรอกข้อมูลให้ครบถ้วน';
                  }
                  this.$refs.ResultSubmitForm.showModal();
                })
                .catch((err) => {
                  this.isLoading = false;
                  this.resultSubmitForm = 'กรุณากรอกข้อมูลให้ครบถ้วน';
                  this.$refs.ResultSubmitForm.showModal();
                });
            })
            .catch((error) => {
              this.typePopup = 'failed-popup';
              this.resultSubmitForm = 'Getting recapcha value failed';
            });
        } else {
          this.typePopup = 'failed-popup';
          this.resultSubmitForm = 'กรุณาระบุช้อมูลให้ครบถ้วน';
          this.$refs.ResultSubmitForm.showModal();
        }
      });
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
    clearRequestQuoteToDealer(){
      this.vName = "";
      this.vLastName = "";
      this.vEmail = "";
      this.vPhone = "";
      this.timeContactValue = {};
    },
    scrollTopComponent() {
      this.$root.$on('scroll:RequestQuoteToDealerForm', () => {
        this.$el.scrollIntoView();
      });
    },
  },
  mounted() {
    getLineConfig().then(res => {
      this.client_id = res.data?.LineKey?.ClientId?.length ? res.data.LineKey.ClientId : fallBackClientId;
      this.client_secret = res.data?.LineKey?.ClientSecret?.length ? res.data.LineKey.ClientSecret : fallBackClientSecret;
      let captchaKey = res.data?.CaptchaSiteKey?.length ? res.data.CaptchaSiteKey : fallBackCaptchaKey;
      Vue.use(VueReCaptcha, { siteKey: captchaKey });
    });

    this.domain = window.location.href;
    this.listPreferredContactTime = this.fields.PreferredContactTime;
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
          // INFO: remove url param
          window.history.pushState('', '', window.location.pathname);
          this.vEmail = userInfo.data.email;
          this.vName = userInfo.data.name;
        });
      });
    }
    this.$root.$on('show:RequestQuoteToDealer', (data) => {
      this.isShowDealerForm = data;
    });
    this.$root.$on('data:CalculationResults', (data) => {
      this.calculationResultsData = data;
    });
    this.scrollTopComponent();
  },
};
</script>


<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

h1 {
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

.i-btn {
  @include media-breakpoint-down(lg) {
    min-width: 155px;
  }
}

.i-btn__primary  {
  border: none;

  &:hover {
    color: $white;
    background-color: $red-hover-color;
    border: none;
  }
}

.test-drive {
  &__infoForm {
    padding: 10px 0 0 0;
    background-color: #f5f5f5;
    z-index: $NOMAL-ZINDEX;
    position: relative;

    @include media-breakpoint-up(lg) {
      padding: 0 0 50px 0;

    }

    &__wrap {
      @include media-breakpoint-up(lg) {
        padding: 0 95px;
      }
    }

    &__number {
      font-size: 5rem;
      line-height: 2.4rem; //INFO: Line-height follow as the design
      color: #cccccc;
      text-align: center;
      margin-bottom: 10px;

      @include media-breakpoint-up(lg) {
        font-size: 6rem;
        line-height: 4.8rem; //INFO: Line-height follow as the design
        margin-bottom: 0;
      }
    }

    &__title {
      text-align: center;
      margin-bottom: 20px;

      @include media-breakpoint-up(lg) {
        margin-bottom: 60px;
      }
    }

    .infoForm-col {
      margin-bottom: 20px;
    }

    .terms {
      font-size: $font-size-small;

      @include media-breakpoint-up(lg) {
        font-size: 1.9rem;
      }

      &__contents {
        margin-bottom: 35px;

        @include media-breakpoint-up(lg) {
          margin-bottom: 12px;
        }
      }
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


    & >>> .v-select {
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

        label {
          margin-bottom: 12px;
        }
      }

      .form-control {
        padding: 8px 10px;
        color: $gray-700;
      }

      .terms-checkbox {
        position: relative;
        
        >>> .isu-checkbox {
          z-index: 1;

          input {
            width: 100%;
          }
        }
      }

      .checkbox-label {
        position: absolute;
        top: -2px;
        left: 22px;

        @include media-breakpoint-up(md) {
          left: 25px;
        }
      }
      .isu-select-option-mux {
        margin-bottom: 20px;
        >>> select {
          margin-bottom: 0;
          border: 1px solid #b7b7b7;
          border-radius: 0;
          height: 45px;
          @include media-breakpoint-down(xs) {
            height: 35px;
          }
        }
        >>> .form-error {
          font-size: 2.5rem;
        }
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
          line-height: 1.8rem; //INFO: Line-height follow as the design

          @include media-breakpoint-up(lg) {
            font-size: $font-size-small;
            font-weight: normal;
            line-height: 2.4rem; //INFO: Line-height follow as the design
            padding: 0 34px;
          }
        }

        &:hover{
          text-decoration: none;
        }
      }

      &__text {
        margin-top: 14px;

        @include media-breakpoint-up(lg) {
          margin-top: 20px;
          margin-left: 0;
        }
      }
    }

    &__submit {
      text-align: center;
      order: 2;
      // padding-top: 42px;
      // background-color: $white;
      padding: 20px 0;

      @include media-breakpoint-up(lg) {
        margin-top: 18px;
        // background-color: $white;
        margin-top: 8px;
        padding-top: 2px;
      }

      button {
        padding: 9px 0;

        @include media-breakpoint-up(lg) {
          padding: 10px 0;
        }
      }
    }
  }
}
</style>