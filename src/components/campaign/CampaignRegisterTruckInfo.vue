<template>
  <div class="register-campaign-truck" :class="{'register-campaign-truck--bgr-black': !(fields.IsWhiteBackground && fields.IsWhiteBackground.value)}">
    <div class="register-campaign__banner"> 
      <picture>
        <sc-image :media="fields.SmallImage" class="d-md-none" alt="Banner Image" v-if="!isEditing"/>
        <sc-image :media="fields.TabletImage" class="d-none d-md-block d-lg-none" alt="Banner Image" v-if="!isEditing"/>
        <sc-image :media="fields.Image" class="d-none d-md-none d-lg-block" alt="Banner Image" />
      </picture>
    </div>
    <div class="container">
      <div class="register-campaign-truck__heading">
        <sc-text tag="h2" class="register-campaign-truck__heading__title" :field="fields.Title" />
        <sc-text class="register-campaign-truck__heading__type-car" :field="fields.ModelTitle" />
        <sc-text tag="p" class="register-campaign-truck__heading__note" :field="fields.Description" />
      </div>
      <div class="register-campaign-truck__wrap">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-8">
            <sc-text tag="p" class="register-campaign-truck__select__title" :field="fields.FirstInformationLabel" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="register-campaign-truck__select__label">
              <sc-text tag="label" :field="fields.ProvinceLabel" />
              <span class="asterisk">*</span>
            </div>
          </div>
          <div class="col-md-8">
            <!-- <isu-select
              :valSelect="provinceValue"
              :placeholder="fields.ProvincePlaceholder && fields.ProvincePlaceholder.value"
              :listOptions="listProvince"
              :nameSelect="'provinceValue'"
              :formGroupName="'userAccount'"
              :formControlName="'จังหวัด'"
              :required="true"
              @onChangeSelect="getValSelect"
              >
            </isu-select> -->
            <isu-select-option-mux 
              :valSelect="provinceValue" 
              :placeholder="fields.ProvincePlaceholder && fields.ProvincePlaceholder.value" 
              :listOptions="listProvince"
              :nameSelect="'provinceValue'" 
              :formGroupName="'userAccount'"
              :formControlName="'จังหวัด'"
              :required="true"
              @onChangeSelect="getValSelect"
              >
              </isu-select-option-mux>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="register-campaign-truck__select__label">
              <sc-text tag="label" :field="fields.DistrictLabel" />
              <span class="asterisk">*</span>
            </div>
          </div>
          <div class="col-md-8">
            <!-- <isu-select
              :valSelect="districtValue"
              :placeholder="fields.DistrictPlaceholder && fields.DistrictPlaceholder.value"
              :listOptions="listDistrict"
              :nameSelect="'districtValue'"
              :formGroupName="'userAccount'"
              :formControlName="'อำเภอ/เขต'"
              :required="true"
              @onChangeSelect="getValSelect"
              >
            </isu-select> -->
            <isu-select-option-mux 
              :valSelect="districtValue" 
              :placeholder="fields.DistrictPlaceholder && fields.DistrictPlaceholder.value" 
              :listOptions="listDistrict"
              :nameSelect="'districtValue'" 
              :formGroupName="'userAccount'"
              :formControlName="'อำเภอ/เขต'"
              :required="true"
              @onChangeSelect="getValSelect"
              >
              </isu-select-option-mux>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-8">
            <sc-text tag="p" class="register-campaign-truck__input__title" :field="fields.SecondInformationLabel" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="register-campaign-truck__input__label">
              <sc-text tag="label" :field="fields.NameLabel" />
              <span class="asterisk">*</span>
            </div>
          </div>
          <div class="col-md-8">
            <isu-input
              :typeInput="'text'"
              :placeholder="fields.NamePlaceholder && fields.NamePlaceholder.value"
              :formGroupName="'userAccount'"
              :formControlName="'ชื่อ'"
              :required="true"
              :valInput="vName"
              :nameInput="'vName'"
              @inputChange="getDataInput"
              >
            </isu-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="register-campaign-truck__input__label">
              <sc-text tag="label" :field="fields.LastName" />
              <span class="asterisk">*</span>
            </div>
          </div>
          <div class="col-md-8">
            <isu-input
              :typeInput="'text'"
              :placeholder="fields.LastNamePlaceholder && fields.LastNamePlaceholder.value"
              :formGroupName="'userAccount'"
              :formControlName="'นามสกุล'"
              :required="true"
              :valInput="vLastName"
              :nameInput="'vLastName'"
              @inputChange="getDataInput"
              >
            </isu-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="register-campaign-truck__input__label">
              <sc-text tag="label" :field="fields.CompanyLabel" />
            </div>
          </div>
          <div class="col-md-8">
            <isu-input
              :typeInput="'text'"
              :placeholder="fields.CompanyPlaceholder && fields.CompanyPlaceholder.value"
              :formGroupName="'userAccount'"
              :formControlName="'บริษัท'"
              :valInput="vCompany"
              :nameInput="'vCompany'"
              @inputChange="getDataInput"
              >
            </isu-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="register-campaign-truck__input__label">
              <sc-text tag="label" :field="fields.EmailLabel" />
            </div>
          </div>
          <div class="col-md-8">
            <isu-input
              :typeInput="'text'"
              :placeholder="fields.EmailPlaceholder && fields.EmailPlaceholder.value"
              :formGroupName="'userAccount'"
              :formControlName="'อีเมล'"
              :nameInput="'vEmail'"
              :valInput="vEmail"
              :pattern="'email'"
              @inputChange="getDataInput"
              >
            </isu-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="register-campaign-truck__input__label">
              <sc-text tag="label" :field="fields.PhoneLabel" />
              <span class="asterisk">*</span>
            </div>
          </div>
          <div class="col-md-8">
            <isu-input
              :typeInput="'text'"
              :placeholder="fields.PhonePlaceholder && fields.PhonePlaceholder.value"
              :formGroupName="'userAccount'"
              :formControlName="'เบอร์โทรศัพท์'"
              :required="true"
              :nameInput="'vPhone'"
              :valInput="vPhone"
              :pattern="'phone'"
              @inputChange="getDataInput"
              >
            </isu-input>
          </div>
        </div>
      </div>
      <div class="register-campaign-truck__line"></div>
      <label class="register-campaign-truck__agree">
        <sc-rich-text tag="span" :field="fields.TermsDetail" />
        <input type="checkbox" class="register-campaign-truck__agree__check-box" v-model="valCheckbox">
        <span class="checkmark"></span>
      </label>
      <div class="register-campaign-truck__button">
        <button type="button"  class="i-btn i-btn__primary" @click="onCampaignRegisterTruckSubmit">
          <sc-text :field="fields.ButtonLabel" />
        </button>
      </div>
    </div>
    <isu-popup ref="ResultSubmitForm" :isLoading="isLoading" :size="'sm'" :type="typePopup">
      <p class="text-center">{{resultSubmitForm}}</p>
    </isu-popup>
  </div>
</template>
<script>
import Vue from 'vue';
import { Text, Image, RichText } from '@sitecore-jss/sitecore-jss-vue';
import IsuSelect from '../shared/IsuSelect';
import IsuInput from '../shared/IsuInput';
import IsuPopup from '../shared/IsuPopup';
import { getTruckProvinces, submitCampaignRegisterTruck } from '../../service/campaignService';
import { getCookieData } from '../../service/cookieService';
import { mapState, mapActions } from 'vuex';
import ProgressiveImageItem from '../shared/ProgressiveImageItem';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { getLineConfig } from '../../service/loginLineService';
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';

const fallBackCaptchaKey = '6LfvM5sUAAAAACs1XkNdQloWzf8TzUd1szhqfbJU';

export default {
  name: 'CampaignTruckRegisterInfo',
  components: {
    ScImage: Image,
    IsuSelect: IsuSelect,
    IsuInput: IsuInput,
    ScText: Text,
    ScRichText: RichText,
    IsuPopup: IsuPopup,
    ProgressiveImageItem: ProgressiveImageItem,
    IsuSelectOptionMux: IsuSelectOptionMux,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      provinceValue: {},
      districtValue: {},
      vName: '',
      vLastName: '',
      vEmail: '',
      vPhone: '',
      valCheckbox: false,
      listProvince: [],
      listDistrict: [],
      resultSubmitForm: '',
      typePopup: '',
      isLoading: false,
      isAcceptTerm: true,
      isEmailValid: true,
      isPhoneValid: true,
      pageData: {},
      isEditing: false,
    }
  },
  mounted() {
    getTruckProvinces().then((res) => {
      let records = res?.data?.records || [];
      this.listProvince = records.map((item) => {
        return {
          id: item.ItemId,
          label: item.LocateName,
          subItems: item.SubItems,
        };
      });
    });
    // this.saveCampaignRegisterData({
    //   campaignRegisterImage: {
    //     Image: this.fields.Image,
    //     SmallImage: this.fields.SmallImage,
    //     TabletImage: this.fields.TabletImage,
    //   },
    // });
    getLineConfig().then((res) => {
      let captchaKey = res.data?.CaptchaSiteKey?.length
        ? res.data.CaptchaSiteKey
        : fallBackCaptchaKey;
      Vue.use(VueReCaptcha, { siteKey: captchaKey });
    });
    this.$root.$on('CampaignRegisterPageData', (data) => {
      this.pageData = data;
    });
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
  },
  methods: {
    ...mapActions('campaign', ['saveCampaignRegisterData']),
    ...mapActions('campaignthanks', ['setColorTheme']),

    async recaptcha() {
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      return token;
    },

    onCampaignRegisterTruckSubmit() {
      const formGroupName = 'userAccount';
      const getUserId = getCookieData('_td');
      this.$root.$emit('submitForm', formGroupName);
      let payload = {
        UserId: getUserId,
        Province: this.provinceValue.label,
        District: this.districtValue.label,
        CustomerName: this.vName,
        CustomerSurname: this.vLastName,
        Mobile: this.vPhone,
      };
      this.submitFormHandler(payload);

    },
    getDataInput(valInput) {
      if (valInput.name == 'vEmail') {
        this.isEmailValid = valInput.valid;
      }
      if (valInput.name == 'vPhone') {
        this.isPhoneValid = valInput.valid;
      }
      this[valInput.name] = valInput.data;
    },
    getValSelect(select) {
      this[select.name] = select.value;
      if (select.name == 'provinceValue') {
        this.resetDistrict();
        let findListDistrcts = this.findListDistrctByProvince(select.value.id);
        this.listDistrict = findListDistrcts.map((item) => {
          return {
            id: item.ItemId,
            label: item.LocateName,
          };
        });
      }
    },
    findListDistrctByProvince(provinceId){
      return this.listProvince.find((item) => item.id === provinceId).subItems;
    },
    checkFormInvalid(formValue) {
      // INFO: check all form field is valid or not
      return Object.keys(formValue).filter(
        (key) => formValue[`${key}`] === '' || typeof formValue[`${key}`] === 'undefined'
      ).length;
    },
    submitFormHandler(payload) {
      if (this.checkFormInvalid(payload) == 0 && this.isEmailValid && this.isPhoneValid) {
        if (this.vEmail) {
          payload.Email = this.vEmail;
        }
        // INFO: CompanyName is required by customer API, so set default value to ' '
        payload.CompanyName = this.vCompany ? this.vCompany : ' ';
        payload.InterestedModels = this.fields.InterestedModels?.value || '';
        payload.InterestedThModels = this.fields.InterestedThModels?.value || '';
        payload.CampaignId = this.pageData?.campaignId || '';
        payload.CampaignNameTh = this.pageData?.campaignNameTh || '';
        payload.CampaignName = this.pageData?.campaignName || '';
        if (this.valCheckbox) {
        this.isAcceptTerm = true;
        } else {
          this.isAcceptTerm = false;
          this.typePopup = 'failed-popup';
          this.resultSubmitForm = this.$getConst('ACCEPT_ALL_INFORMATION');
          this.$refs.ResultSubmitForm.showModal();
          return;
        }
        this.isLoading = true;
        this.typePopup = 'waiting-popup';
        this.resultSubmitForm = 'Loading...';
        this.$refs.ResultSubmitForm.showModal();
        this.recaptcha().then((captchaKey) => {
          payload.GoogleRecapcha = captchaKey;
          submitCampaignRegisterTruck(payload)
            .then((res) => {
              if (res.data.IsSuccess) {
                this.saveCampaignRegisterData({
                  campaignRegisterImage: {
                    Image: this.fields.Image,
                    SmallImage: this.fields.SmallImage,
                    TabletImage: this.fields.TabletImage,
                    UrlPage: window.location.pathname,
                  },
                });
                this.setColorTheme(this.fields?.IsWhiteBackground?.value);
                window.open(this.getUrlNavigateTo(), '_self')
              } else {
                this.isLoading = false;
                this.typePopup = 'failed-popup';
                this.resultSubmitForm = 'กรุณาระบุช้อมูลให้ครบถ้วน';
              }
              this.$refs.ResultSubmitForm.showModal();
            })
            .catch((err) => {
              this.isLoading = false;
              this.typePopup = 'failed-popup';
              this.resultSubmitForm = 'กรุณาระบุช้อมูลให้ครบถ้วน';
              this.$refs.ResultSubmitForm.showModal();
            });
        });
      } else {
        this.typePopup = 'failed-popup';
        this.resultSubmitForm = this.$getConst('FILL_ALL_INFORMATION');
        this.$refs.ResultSubmitForm.showModal();
      }
    },
    getUrlNavigateTo() {
      let thanksUrl = '';
      let pathName = window.location.pathname.split('/');
      if (pathName.length && this.pageData.thanksUrl) {
        thanksUrl = this.pageData.thanksUrl.split('/');
        pathName.push(thanksUrl);
      }
      pathName = pathName.filter((item) => {
        return item !== "";
      });
      pathName = pathName.join('/');
      return window.location.origin + "/" + pathName;
    },
    resetDistrict() {
      this.listDistrict = [];
      this.districtValue = {};
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.register-campaign-truck {
  padding-bottom: 95px;
  margin-top: -50px;

  &__heading {
    text-align: center;
    color: #004171;
    margin-top: 15px;
    font-family: $font-family-Kittithada-Bold75;
    
    @include media-breakpoint-up(md) {
      margin-top: 30px;
    }

    &__title {
      font-weight: bold;
    }

    &__type-car {
      font-weight: bold;
      font-size: 2.25rem;
      line-height: 0;

      @include media-breakpoint-up(md) {
        font-size: 3.6rem;
      }
    }

    &__note {
      color: #777;
      font-size: 1.68rem;
      margin-top: 5px;
      font-family: $font-family-base;

      @include media-breakpoint-up(md) {
        font-size: 1.9rem;
      }
    }
  }

  &__wrap {
    max-width: 540px;
    margin: 5px auto 60px;
    padding: 0 20px 40px;
    color: #004171;

    @include media-breakpoint-up(md) {
      margin: 0 auto 60px;
      padding: 0 30px 0px;
    }
  }

  &__select,
  &__input {
    &__label {
      text-align: left;
      font-size: 2.4rem;
      vertical-align: middle;
      line-height: 4.5rem;
      font-family: $font-family-Kittihada-Medium65;

      @include media-breakpoint-up(md) {
        text-align: right;
      }
    }
  }

  &__select,
  &__input {
    &__title {
      margin: 20px 0 6px;
      font-size: 2.4rem;
      font-family: $font-family-Kittihada-Medium65;
      
    }
  }

  &__line {
    border-top: 1px solid #013162;
  }

  &__agree{
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    line-height: 25px;
    cursor: pointer;
    background: #e8eaf1;
    font-size: 21px;
    padding: 20px 20px 20px 65px;
    font-weight: 400;
    margin-top: 1.5em;
    position: relative;
    user-select: none;

    &::before {
      width: 25px;
      height: 25px;
      border-radius: 5px;
      content: "";
      display: block;
      position: absolute;
      z-index: 1;
      top: 25px;
      left: 20px;
      background: #fff;
      border: 1px solid #999;
    }

    &__check-box:checked+span {
      position: absolute;
      width: 27px;
      height: 27px;
      top: 28px;
      left: 20px;
      z-index: 2;
      font-size: 22px;
      color: #ed1c24;
      text-align: center;

      &::before {
        content: "✔";
      }
    }

    input {
      display: none;
    }

  }

  &__button {
    text-align: center;
    margin-top: 90px;
  }

  picture {
    img {  
      width: 100%;
      height: auto;

    }
  }

  .asterisk {
    font-size: $font-size-base;
    color: #ef8d00;
  }

  label {
    margin-bottom: 0;
  }

  .i-btn {
    font-size: 3rem;
    width: 185px;
    padding: 12px 17px;
    height: 45px;
    line-height: 25px;
    font-family: $font-family-Kittihada-Medium65;
  }

  .input-done {
    color: $black;
    background-color: #E8F0FE;
  }

  //Customize IsuSelect, IsuInput
  & >>> .isu-select,
  .isu-select-option-mux {
    margin-bottom: 15px;
    font-size: $font-size-payment-value-selected;
  }

  & >>> .isu-select-option-mux {
    select {
      padding: 6px 35px 6px 15px;
      background-color: #d4d9e5;
      border-radius: 3px;
      height: 45px;
      border: none;
      color: #004171;
      @include media-breakpoint-down(xs) {
        height: 35px;
        padding: 6px 35px 6px 10px;
        font-size: 2.2rem;
      }
      option {
        background: $white;
      }
    }
  }

  & >>> .v-select {
    width: 100%;
    background: #d4d9e5;
    border-radius: 3px;
  }

  & >>> .vs__selected-options {
    height: 35px;

    @include media-breakpoint-up(md) {
      height: 45px;
    }
  }

  & >>> .vs__dropdown-toggle {
    border: none;
    padding: 0 7px;

  }

  >>> .vs__dropdown-option{
    color: #004171;
  }

  >>> .vs__dropdown-option--highlight {
    background-color: #d4d9e5;
    color: #004171;
  }

  & >>> .vs__selected {
    margin-top: 0;
    padding: 0;
    color: #004171;
  }

  & >>> .vs__search {
    padding-left: 0;
    color: #004171;
    font-size: 2.2rem;
    margin: 3px 0 0 0;

    @include media-breakpoint-up(md) {
      padding-left: 5px;

    }
  }

  & >>> .vs__actions {
    padding: 0 2px 0 0;

    @include media-breakpoint-up(md) {
      padding: 0 7px 0 0;
    }
  }

  & >>> .isu-input {
    margin-bottom: 15px;
    font-size: $font-size-payment-value-selected;
  }

  & >>> .input-control {
    padding: 10px;
    padding-left: 7px;
    border: none;
    border-radius: 3px;
    background: #d4d9e5;
    font-size: 2.2rem;
    height: 35px;
    color: #004171;

    &::placeholder {
      color: #8795b7;
      line-height: 25px;

    }

    @include media-breakpoint-up(md) {
      height: 45px;
      padding-left: 15px;
    }
  }

  & >>> .input-error {
    border: 1px solid red;
  }

  &--bgr-black {
    background-color: $black;
    color: $white;
    padding: 10px 0 90px 0;

    .register-campaign-truck {
      &__heading {
        color: $white;
      }
      
      &__wrap {
        color: $white;
      }

      &__select__label {
        color: $white;
      }

      &__input__label {
        color: $white;
      }

      &__line {
        border-top: 1px solid $white;
      }

      &__date__time {
        color: #c01300;
      }

      &__agree {
        background-color: #101112;
      }

      &__detail {
        font-size: 2.15rem;
      }
    }

    //Customize IsuSelect, IsuInput
    & >>> .vs__search {
      color: #808080;
    }

    & >>> .input-control {
      &::placeholder {
        color: #b2b4bc;
      }
    }

    >>> .vs__dropdown-option{
      color: #808080;
    }

    >>> .vs__selected{
      color: #808080;
    }

    >>> .vs__dropdown-option--highlight {
      background-color: $gray-400;
      color: $white;
    }

    & >>> .input-control {
      color: #808080;
      line-height: 25px;
    }

    .asterisk {
      color: $white;
    }
  }
}
</style>