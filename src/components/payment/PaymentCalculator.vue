<template>
  <div class="caculator">
    <div class="container container-extra-large">
      <div class="caculator__wrap">
        <div class="caculator__select-car first-select" v-show="!isShowInfomation">
          <div class="row">
            <div class="col-12">
              <sc-text tag="h4" class="caculator__select-car__title caculator__title" :field="fields.CarInformationTitle" />
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 offset-xl-3">
              <div class="row">
                <div class="col-md-5">
                  <div class="caculator__select-car__label">
                    <sc-text tag="label" :field="fields.CarTypeSelection" />
                  </div>
                </div>
                <div class="col-md-7">
                  <!-- <isu-select
                    :valSelect="carType"
                    :listOptions="listCarType"
                    :nameSelect="'carType'"
                    @onChangeSelect="getValSelect" >
                  </isu-select> -->
                  <isu-select-option-mux
                    :valSelect="carType"
                    :listOptions="listCarType"
                    :nameSelect="'carType'"
                    @onChangeSelect="getValSelect"
                  >
                  </isu-select-option-mux>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <div class="caculator__select-car__label">
                    <sc-text tag="label" :field="fields.CarModelSelection" />
                  </div>
                </div>
                <div class="col-md-7">
                  <!-- <isu-select
                    :valSelect="carModel"
                    :listOptions="listCarModel"
                    :nameSelect="'carModel'"
                    @onChangeSelect="getValSelect" >
                  </isu-select> -->
                  <isu-select-option-mux
                    :valSelect="carModel"
                    :listOptions="listCarModel"
                    :nameSelect="'carModel'"
                    @onChangeSelect="getValSelect"
                  >
                  </isu-select-option-mux>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <div class="caculator__select-car__label">
                    <sc-text tag="label" :field="fields.CarGradeSelection" />
                  </div>
                </div>
                <div class="col-md-7">
                  <!-- <isu-select
                    :valSelect="carGrade"
                    :listOptions="listCarGrade"
                    :nameSelect="'carGrade'"
                    @onChangeSelect="getValSelect" >
                  </isu-select> -->
                  <isu-select-option-mux
                    :valSelect="carGrade"
                    :listOptions="listCarGrade"
                    :nameSelect="'carGrade'"
                    @onChangeSelect="getValSelect"
                  >
                  </isu-select-option-mux>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <div class="caculator__select-car__label">
                    <sc-text tag="label" :field="fields.CarColorSelection" />
                  </div>
                </div>
                <div class="col-md-7">
                  <!-- <isu-select
                    :valSelect="carColor"
                    :listOptions="listCarColor"
                    :nameSelect="'carColor'"
                    @onChangeSelect="getValSelect" >
                  </isu-select> -->
                  <isu-select-option-mux
                    :valSelect="carColor"
                    :listOptions="listCarColor"
                    :nameSelect="'carColor'"
                    @onChangeSelect="getValSelect"
                    :placeholder="'เลือกสีรถ'"
                  >
                  </isu-select-option-mux>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="row">
            <div class="col-md-6">
              <div class="caculator__select-car__label">
                <sc-text tag="label" :field="fields.InsuranceTitle" />
              </div>
            </div>
            <div class="col-md-6">
              <isu-select
                :valSelect="carInsurance"
                :listOptions="listCarInsurance"
                :placeholder="fields.InsurancePlaceholder.value"
                :nameSelect="'carInsurance'"
                @onChangeSelect="getValSelect" >
              </isu-select>
            </div>
          </div> -->
        </div>
        <div class="caculator__select-detail second-select" v-show="!isShowInfomation">
          <div class="row">
            <div class="col-12">
              <sc-text tag="h4" class="caculator__select-detail__title caculator__title" :field="fields.PaymentDetailTitle" />
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 offset-xl-3">
              <div class="row">
                <div class="col-md-5">
                  <div class="caculator__select-detail__label">
                    <sc-text tag="label" :field="fields.CarPriceTitle" />
                  </div>
                </div>
                <div class="col-md-7">
                  <span class="car-price-selected">{{ priceSelectedCar | formatMoney }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <div class="caculator__select-detail__label">
                    <sc-text tag="label" :field="fields.DiscountAmountPercentageTitle" />
                    <span class="asterisk">*</span>
                  </div>
                </div>
                <div class="col-md-7">
                  <isu-input
                    :typeInput="'text'"
                    :valInput="paymentAmountPecent"
                    :placeholder="fields.DiscountAmountPercentagePlaceholder.value"
                    :nameInput="'paymentAmountPecent'"
                    @inputChange="getDataInput"
                    :isNumber="true"
                    :maxValue="100"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <div class="caculator__select-detail__label">
                    <sc-text tag="label" :field="fields.DiscountAmountThaiBathTitle" />
                    <span class="asterisk">*</span>
                  </div>
                </div>
                <div class="col-md-7">
                  <isu-input
                    :typeInput="'text'"
                    :valInput="paymentAmountBath"
                    :placeholder="fields.DiscountAmountThaiBathPlaceholder.value"
                    :nameInput="'paymentAmountBath'"
                    @inputChange="getDataInput"
                    :isNumber="true"
                    :maxValue="priceSelectedCar"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <div class="caculator__select-detail__label">
                    <sc-text tag="label" :field="fields.InterestRateTitle" />
                    <span class="asterisk">*</span>
                  </div>
                </div>
                <div class="col-md-7">
                  <isu-input
                    :typeInput="'text'"
                    :valInput="interestRate"
                    :placeholder="fields.InterestRatePlaceholder.value"
                    :nameInput="'interestRate'"
                    @inputChange="getDataInput"
                    :maxValue="100"
                    :isNumber="true"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <div class="caculator__select-detail__label">
                    <sc-text tag="label" :field="fields.InstallmentPeriodSelection" />
                    <span class="asterisk">*</span>
                  </div>
                </div>
                <div class="col-md-7">
                  <!-- <isu-select
                    :valSelect="installmentPeriodValue"
                    :placeholder="fields.InstallmentPeriodPlaceholder.value"
                    :listOptions="installmentPeriod"
                    :nameSelect="'installmentPeriodValue'"
                    @onChangeSelect="getValSelect" >
                  </isu-select> -->
                  <isu-select-option-mux
                    :valSelect="installmentPeriodValue"
                    :placeholder="fields.InstallmentPeriodPlaceholder.value"
                    :listOptions="installmentPeriod"
                    :nameSelect="'installmentPeriodValue'"
                    @onChangeSelect="getValSelect"
                  >
                  </isu-select-option-mux>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5"></div>
                <div class="col-md-7">
                  <a class="caculator__button button-install i-btn" v-if="!isShowInfomation" @click="installCaculation">{{fields.InstallmentCaculationButton.value}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="caculator__result" v-if="isShowInfomation">
          <div class="row">
            <div class="col-12">
              <sc-text tag="h4" class="caculator__result__title caculator__title" :field="fields.ResultTitle" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-5 col-xl-4">
              <div class="caculator__result__image" v-if="carColor">
                <img class="d-none d-sm-block" :src="imageEndPoint(carImage)" alt="x" />
                <img class="d-sm-none" :src="imageEndPoint(carImageSm)" alt="x" />
              </div>
            </div>
            <div class="col-md-7 col-xl-8">
              <div class="caculator__result__detail">
                <div class="row">
                  <div class="col-5">
                    <div  class="caculator__result__detail__title">
                      <sc-text tag="span" :field="fields.CarType" />
                    </div>
                  </div>
                  <div class="col-7">
                    <span class="caculator__result__detail__value"> {{ carType.Title }} </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div  class="caculator__result__detail__title">
                      <sc-text tag="span" :field="fields.CarModel" />
                    </div>
                  </div>
                  <div class="col-7">
                    <span class="caculator__result__detail__value"> {{ carModel.Title }} </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div  class="caculator__result__detail__title">
                      <sc-text tag="span" :field="fields.CarGrade" />
                    </div>
                  </div>
                  <div class="col-7">
                    <span class="caculator__result__detail__value"> {{ carGrade.Title }} </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div  class="caculator__result__detail__title">
                      <sc-text tag="span" :field="fields.CarColorSelection" />
                    </div>
                  </div>
                  <div class="col-7">
                    <span class="caculator__result__detail__value"> {{ carColor.ColorName || carColor.Title }} </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div  class="caculator__result__detail__title">
                      <sc-text tag="span" :field="fields.CarPrice" />
                    </div>
                  </div>
                  <div class="col-7">
                    <span class="caculator__result__detail__value"> {{ priceSelectedCar | formatMoney }} {{fields.CurrencyUnit.value}}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div  class="caculator__result__detail__title">
                      <sc-text tag="span" :field="fields.DiscountAmount" />
                    </div>
                  </div>
                  <div class="col-7">
                    <span class="caculator__result__detail__value"> {{ Number(paymentAmountPecent) }}% - {{ sanitizeNumber(paymentAmountBath) | formatMoney }} {{fields.CurrencyUnit.value}} </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div  class="caculator__result__detail__title">
                        <sc-text tag="span" :field="fields.InterestRate" />
                    </div>
                  </div>
                  <div class="col-7">
                    <span class="caculator__result__detail__value"> {{ interestRate }} </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div  class="caculator__result__detail__title">
                      <sc-text tag="span" :field="fields.InstallmentPeriod" />
                    </div>
                  </div>
                  <div class="col-7">
                    <span class="caculator__result__detail__value"> {{ installmentPeriodValue.id }} {{fields.TimeUnit.value}} </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div  class="caculator__result__detail__title">
                      <sc-text tag="span" :field="fields.Loan" />
                    </div>
                  </div>
                  <div class="col-7">
                    <span class="caculator__result__detail__value"> {{ (Number(priceSelectedCar) - sanitizeNumber(paymentAmountBath)) | formatMoney }}  {{fields.CurrencyUnit.value}} </span>
                  </div>
                </div>
              </div>
              <!-- <p class="caculator__result__note">
                หมายเหตุ รุ่นที่ปรากฎในภาพอาจแตกต่างจากรูปจริง โปรดศึกษารายละเอียดรุ่นรถและอุปกรณ์จากโบรชัวร์
              </p> -->
            </div>
          </div>
          <div class="caculator__result__footer" v-if="isShowInfomation">
            <div class="caculator__result__total">
              <sc-text tag="p" class="caculator__result__total__title" :field="fields.PriceResultTitle" />
              <div class="caculator__result__total__price">
                <span class="price-value">{{totalMoneyPayPerMonth() | formatMoney}} </span>
                <sc-text tag="span" class="price-unit" :field="fields.CurrencyUnit" />
              </div>
            </div>

            <div class="caculator__result__button-group">
              <div class="caculator__result__button" @click="resetInfomation">
                <sc-text class="caculator__button button-reset i-btn" :field="fields.ResetButton" />
              </div>
              <div class="caculator__result__button" @click="downloadPDF">
                <sc-text class="caculator__button button-reset i-btn" :field="fields.SaveAPDFButtonTitle" />
              </div>
              <div class="caculator__result__button" @click="showRequestQuoteToDealer">
                <sc-text class="caculator__button button-reset i-btn" :field="fields.RequestQuoteToDealerButtonTitle" />
              </div>
              <!-- <div class="caculator__result__button">
                <isu-button-link :field="fields.SaveAQuoteButton">
                  <sc-link class="caculator__button button-save-quote" :field="fields.SaveAQuoteButton" @click="saveAquote"></sc-link>
                </isu-button-link>
              </div>
              <div class="caculator__result__button">
                <isu-button-link :field="fields.RequestToDealerButton">
                  <sc-link class="caculator__button button-request-to-dealer" :field="fields.RequestToDealerButton" @click="sendDataToQuoteToDealer"></sc-link>
                </isu-button-link>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <sc-placeholder name="payment-calculator-cta-content" :rendering="rendering" v-show="isShowInfomation" />
      <div class="caculator__remark">
        <p class="caculator__remark__content">
          <sc-rich-text  :field="fields.PaymentCalculatorNote" />
          <!-- หมายเหตุ โปรแกรมคำนวณนี้ ใช้คำนวณเพื่อเป็นข้อมูลประกอบในการตัดสินใจเท่านั้น ไม่สามารถนำมาเป็นหลักฐานอ้างอิงได้ กรุณาศึกษาเพิ่มเติมจากผู้จำหน่ายอีซูซุทั่วประเทศ หรือสอบถามข้อมูลได้ที่ บริษัท ตรีเพชรอีซูซุลิสซิ่ง จำกัด โทรศัพท์ 1366</br>
          *เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด -->
        </p>
      </div>
      <isu-popup ref="CaculatorResult" :size="'sm'" :type="typePopup">
        <p class="text-center">{{caculatorResult}}</p>
      </isu-popup>
    </div>
  </div>
</template>


<script>
import IsuSelect from '../shared/IsuSelect';
import IsuInput from '../shared/IsuInput';
// import { getCarType, getCarGrade, getInsurance } from '../../service/requestQuotationService.js';
import { getCarType, getCarGrade } from '../../service/requestQuotationService.js';
import { customMoney } from '../pipes/moneyPipe';
import { mapActions, mapState } from 'vuex';
import { Link, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import IsuPopup from '../shared/IsuPopup';
import EndPointMixin from '../../mixin/endpoint-mixin';
import IsuButtonLink from '../shared/IsuButtonLink';
import IsuPlaceholder from '../../components/shared/IsuPlaceholder';
import { GetEndPoint } from '../../service/genericService';
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';
import { trackingApi } from '@sitecore-jss/sitecore-jss-tracking';
import { dataFetcher } from '../../dataFetcher';
import config from '../../temp/config';

export default {
  name: 'Caculator: Caculator',
  mixins: [EndPointMixin],
  components: {
    IsuSelect: IsuSelect,
    IsuInput: IsuInput,
    ScText: Text,
    ScRichText: RichText,
    ScLink: Link,
    IsuPopup: IsuPopup,
    IsuButtonLink : IsuButtonLink,
    ScPlaceholder: IsuPlaceholder,
    IsuSelectOptionMux: IsuSelectOptionMux,
  },
  props : {
    fields : {
      type : Object,
    },
    rendering: {
      type: Object,
    },
  },
  data() {
    return {
      carType: {},
      carModel: {},
      carGrade: {},
      carColor: {},
      // carInsurance :{},
      listCarType: [],
      listCarModel: [],
      listCarGrade: [],
      listCarColor: [],
      // listCarInsurance : [],
      paymentAmountPecent: '',
      paymentAmountBath: '',
      interestRate: '',
      installmentPeriod: [],
      installmentPeriodValue: {},
      isShowInfomation: false,
      isHaveDataFromQuote: false,
      caculatorResult: '',
      isChangeCarGradeId : false,
      defaultModel: null,
      defaultType: null,
      typePopup: '',
      isShowRequestQuoteToDealer: false,
      printPaymentData: {},
      pdfWidth: 1240,
      pdfHeight: 1754,
      marginLeftPdf: 60,
      docLibrary: {},
      pdfImageUrl: '',
      txtGoal: '',
      txtPageId: '',
    };
  },
  mounted() {
    this.txtPageId = this.$jss.routeData().itemId;
    this.txtGoal = this.fields.TriggerGoals?.id;
    import(/* webpackChunkName: "jspdf" */ /* webpackPreload: true */ 'jspdf').then(
      ({ default: jspdf }) => {
        this.jspdf = jspdf;
        window.jsPDF = jspdf;
        import(/* webpackChunkName: "pdfFont" */ './KittithadaMedium65-normal');
      }
    );
    // INFO : scroll to Top after change client route
    window.scrollTo(0, 0);

    this.installmentPeriod = this.$getConst("INSTALLMENT_PERIOD_DATA");

    if(this.quoteToDealerData?.carModel.Id && this.isFromRequestQuotation){
      this.isHaveDataFromQuote = true;
    }

    this.getCarType();
    window.addEventListener("beforeunload", this.onUnloadEvent);
  },
  filters: {
    formatMoney: function(value) {
      return customMoney(value);
    },
  },
  methods: {
    ...mapActions('savequote', ['addQuote']),
    ...mapActions('quotation', ['updateQuoteToDealerData']),
    ...mapActions('quotation', ['updateIsSendFromRequestQuotation']),
    ...mapActions('quotation', ['resetModifyingQuote']),
    ...mapActions('quotation', ['saveCarTypeData']),

    onUnloadEvent() {
      this.updateIsSendFromRequestQuotation(false);
      this.resetModifyingQuote();
    },

    sanitizeNumber(number) {
      return parseFloat(number.toString().split(',').join('')).toFixed(2);
      // return number.toFixed(2);
    },
    getCarType() {
      getCarType().then((res) => {
        this.listCarType = res.data.Records;
        this.listCarType.forEach((item) => this.transformDataSelect(item));
        this.carType = this.listCarType[0];
        if(this.isHaveDataFromQuote){
          let findCarTypeByName = this.listCarType.find(item => item.Title == this.quoteToDealerData.carType);
          this.carType = this.transformDataSelect(findCarTypeByName);
        };
        // INFO: check for corresponding car type from routing param here
        let searchString = this.$route.query.model;
        if (searchString) {
          this.defaultType = this.listCarType.find(type => {
            return type.ModelName == searchString;
          });
          if (!this.defaultType) {
            this.listCarType.forEach((type, typeIdx) => {
              if (this.defaultModel) return;
              this.defaultModel = this.listCarType[typeIdx].CarModels.find(model => {
                return model.ModelName == searchString;
              });
              if (this.defaultModel) {
                this.defaultType = this.listCarType[typeIdx];
              }
            });
          }
          // console.log("default type", this.defaultType);
          // console.log("default model", this.defaultModel);
          // INFO: when it is MUX, this.defaultType is truthy, this.defaultModel is undefined
          // INFO: when it is D-MAX, this.defaultType and this.defaultModel is trutty
          // other wise, both are undefined, then it will NOT affect the sequence
          if (this.defaultType) {
            this.carType = this.defaultType;
          }
        }

        this.getValSelect({ value: this.carType, name: 'carType' });
      })
    },

    getCarGrade(carModelId) {
      getCarGrade(carModelId).then((res) => {
        this.listCarGrade = res.data.Records;
        this.listCarGrade.forEach((item) => this.transformDataSelect(item));
        this.carGrade = this.listCarGrade[0];
        // INFO : check if user changed car model
        if(carModelId != this.quoteToDealerData?.carModel?.Id){
          this.isHaveDataFromQuote = false;

        }
        if(this.isHaveDataFromQuote){
          this.carGrade = this.transformDataSelect(this.quoteToDealerData.carGrade);
        }
        this.getValSelect({ value: this.carGrade, name: 'carGrade' });
      });
    },

    // getCarInsurance(carGradeId){
    //   getInsurance(carGradeId).then(res => {
    //     this.listCarInsurance = res.data.Records;
    //     if(this.listCarInsurance?.length){
    //       this.listCarInsurance.forEach(item => {
    //         item.price = item.Price;
    //         item.title = item.Title;
    //         this.transformDataSelect(item)
    //       });
    //       let defaultInsurance = this.fields?.NoChoiceTitle?.value?.length ? this.fields.NoChoiceTitle.value : 'No insurance';
    //       this.listCarInsurance = [{label : defaultInsurance}, ...this.listCarInsurance];
    //       if(this.isHaveDataFromQuote){
    //         this.carInsurance = {
    //           ...this.quoteToDealerData.carInsurance,
    //           id : this.quoteToDealerData.carInsurance.Id,
    //           label : this.quoteToDealerData.carInsurance.title,
    //         }
    //       }
    //     }
    //   });
    // },

    getValSelect(selectVal) {
      // INFO: after select car option, hidden infomation aleady chosen
      this.isShowInfomation = false;
      let value = selectVal.value;
      this[selectVal.name] = value;
      if (selectVal.name == 'carType') {
        // INFO: check if user change car type

        if(selectVal.value.Title != this.quoteToDealerData.carType){
          this.isHaveDataFromQuote = false;
        }

        this.listCarModel = value.CarModels;
        this.listCarModel.forEach((item) => this.transformDataSelect(item));
        this.carModel = this.listCarModel[0];
        // TODO NEW: check for corresponding car model here
        if(this.isHaveDataFromQuote){
          this.carModel = this.transformDataSelect(this.quoteToDealerData.carModel);
        }
        // INFO: when it is D-MAX, this.defaultType and this.defaultModel is trutty
        if (this.defaultModel) {
          this.carModel = this.defaultModel;
        }
        this.getValSelect({value : this.carModel , name : 'carModel'});
      } else if (selectVal.name == 'carModel') {
        this.getCarGrade(value.id);
      } else if (selectVal.name == 'carGrade') {
        // INFO: check if user change car grade
        if(selectVal.value.Id != this.quoteToDealerData?.carGrade?.Id){
          this.isHaveDataFromQuote = false;
          this.isChangeCarGradeId = true;
          // this.carInsurance = {};
        }
        this.listCarColor = value.Colors;
        if (this.listCarColor) {
          this.listCarColor.forEach((item) => {
            item.label = item.ColorName || item.Title;
            item.id = item.Id;
          });
        }
        this.carColor = this.listCarColor[0] || {};
        if(this.isHaveDataFromQuote){
          // INFO: interface for .price from quoteToDealerData is different to API reponse, need filter:
          let currentColor = {...this.quoteToDealerData.carColor, ColorPrice : this.quoteToDealerData.carColor.price};
          this.carColor = {
            ...currentColor,
            label : this.quoteToDealerData.carColor.name,
            ColorName : this.quoteToDealerData.carColor.name,
            Title : this.quoteToDealerData.carColor.name,
          };
        }
        this.carColor.name = this.carColor?.ColorName || this.carColor?.Title || '';
        this.getValSelect({value : this.carColor , name : 'carColor'});
        // this.getCarInsurance(selectVal.value.id);

      } else if (selectVal.name == 'carColor') {
        // INFO: check if user changed car color;
        if(selectVal.value.Id != this.quoteToDealerData?.carColor?.Id){
          this.isHaveDataFromQuote = false;
        }
        this.carColor.name = this.carColor?.ColorName || this.carColor?.Title || '';
      }
    },
    getDataInput(valInput) {
      this[valInput.name] = valInput.data;
      if (valInput.name == 'paymentAmountPecent') {
        this.paymentAmountBath = this.getBathByPercent(valInput.data);
      }
      if (valInput.name == 'paymentAmountBath') {
        this.paymentAmountPecent = this.getPercentByBath(valInput.data);
      }
    },
    transformDataSelect(item) {
      item.id = item.Id;
      item.label = item.Title;
      return item;
    },
    checkHasPrice(item) {
      return Number(item) || 0;
    },
    getBathByPercent(percent) {
      return percent == '' ? 0 : ((this.sanitizeNumber(percent) * parseInt(this.priceSelectedCar)) / 100).toFixed(0);
    },
    getPercentByBath(bath) {
      let percent = ((this.sanitizeNumber(this.paymentAmountBath) * 100) / parseInt(this.priceSelectedCar));
      if (Number.isInteger(percent)) {
        return bath == '' ? 0 : percent.toFixed(0);
      } else {
        return bath == '' ? 0 : percent.toFixed(2);
      }
    },
    installCaculation() {
      if(this.paymentAmountPecent.length == 0 || this.paymentAmountBath.length == 0){
        this.typePopup = 'failed-popup';
        this.caculatorResult = this.fields.DiscountAmountNotification?.value?.length ? this.fields.DiscountAmountNotification.value : 'Please fill discount amount';
        this.$refs.CaculatorResult.showModal();
        return;
      }
      if(!this.interestRate){
        this.typePopup = 'failed-popup';
        this.caculatorResult = this.fields.InterestRateNotification?.value?.length ? this.fields.InterestRateNotification.value : 'Please fill interest rate';
        this.$refs.CaculatorResult.showModal();
        return;
      }
      if(!this.installmentPeriodValue.id){
        this.typePopup = 'failed-popup';
        this.caculatorResult = this.fields.InstallmentPeriodNotification?.value?.length ? this.fields.InstallmentPeriodNotification.value : 'Please fill installment period';
        this.$refs.CaculatorResult.showModal();
        return;
      }
      // INFO: input percent maximum is 100
      if(parseFloat(this.sanitizeNumber(this.paymentAmountPecent)) > 100){
        this.typePopup = 'failed-popup';
        this.caculatorResult = this.fields.LimmitedDiscountAmountNotification?.value?.length ? this.fields.LimmitedDiscountAmountNotification.value : 'Down payment must be less than car price';
        this.$refs.CaculatorResult.showModal();
        return;
      }
      trackingApi
        .trackEvent([{ goalId: this.txtGoal, pageId: this.txtPageId }], this.trackingApiOptions)
        .catch((error) => console.error(error));
      this.saveCarTypeData({
        carTypeData: {
          ...this.carType,
          CarModelId: this.carModel.Id,
          CarModelName: this.carModel.label,
          CarSubModelId: this.carGrade.Id,
          CarSubModelName: this.carGrade.label,
          CarSubModelPrice: this.carGrade.Price,
          CarColorId: this.carColor.Id,
          CarColorName: this.carColor.ColorName,
          CarColorPrice: this.carColor.ColorPrice,
        }
      });
      this.isShowInfomation = true;
      this.$nextTick(() => {
        this.$root.$emit('currencyUnit', this.fields.CurrencyUnit);
        this.$root.$emit('listCarTypeData', this.listCarType);
      })
      this.$el.scrollIntoView();
    },
    resetInfomation() {
      this.$nextTick(() => {
        this.$root.$emit('show:RequestQuoteToDealer', (this.isShowRequestQuoteToDealer = false));
      });
      this.isShowInfomation = false;
      // this.paymentAmountPecent = '';
      // this.paymentAmountBath = '';
      // this.interestRate = '';
      // this.installmentPeriodValue = {};
      this.$el.scrollIntoView();
    },
    showRequestQuoteToDealer() {
      let chooseDealer = this.$el.querySelector('.caculator__result__footer');
      this.$nextTick(() => {
        this.$root.$emit('show:RequestQuoteToDealer', (this.isShowRequestQuoteToDealer = true));
        this.$root.$emit('data:CalculationResults', {
          PaymentAmountPecent: this.paymentAmountPecent,
          PaymentAmountPrice: this.paymentAmountBath,
          InterestRate: this.interestRate,
          MonthlyPeriod: this.installmentPeriodValue.id,
        });
      });
      if (chooseDealer) {
        chooseDealer.scrollIntoView();
      }
    },

    getInstallmentYear(year){
      // INFO: list year input from BRD, The number of years is always rounded
      return Math.floor(Number(year) / 12);
    },

    totalMoneyPayPerMonth(){
      let paymentInstallment = this.priceSelectedCar - this.sanitizeNumber(this.paymentAmountBath);
      let totalMonth = this.installmentPeriodValue.id;
      let payMoney =  (paymentInstallment + (paymentInstallment * this.interestRate * this.getInstallmentYear(this.installmentPeriodValue.id)) / 100 ) / totalMonth;
      return Math.ceil(payMoney);
    },

    dataPassToStore(){
      let saveAquoteData = {
        carGrade : this.carGrade,
        carModel : this.carModel,
        carType : this.carType.Title,
        carColor : {...this.carColor, price: this.carColor.ColorPrice},
        // INFO: if user changed car grade => car insurance will be change to 0
        // carInsurance: this.isFromRequestQuotation && !this.isChangeCarGradeId ? this.quoteToDealerData?.carInsurance : {},
        totalPrice : Number(this.priceSelectedCar),
        downPayment : Number(this.sanitizeNumber(this.paymentAmountBath)),
        interestRate : Number(this.interestRate),
        installmentPeriod : Number(this.installmentPeriodValue.id),
        loanAmount : Number(this.priceSelectedCar - this.sanitizeNumber(this.paymentAmountBath)),
        monthlyInstallments : Number(this.totalMoneyPayPerMonth()),
      }
      return saveAquoteData;
    },
    saveAquote(){
      let quoteId = '';
      if (this.isModifyingQuote) {
        quoteId = this.currentQuoteId;
      } else {
        // INFO: use time from EPOC, that will ensure that no ID collision
        quoteId = new Date().getTime().toString();
      }
      const quoteData = this.dataPassToStore();
      this.addQuote({
        ...quoteData,
        id: quoteId,
      });
      this.resetModifyingQuote();
    },

    sendDataToQuoteToDealer(){
      if (this.isHaveDataFromQuote) {
        this.updateQuoteToDealerData({ ...this.quoteToDealerData, ...this.dataPassToStore() });
      } else {
        this.updateQuoteToDealerData({ ...this.dataPassToStore() });
      }
      this.resetModifyingQuote();
    },

    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },

    totalPrice(quote, isHasInsurance = true){
      let totalPrice = 0;
      if (quote.carGrade?.Price) {
        totalPrice += Number(quote.carGrade?.Price);
      }
      if (quote.carColor?.price) {
        totalPrice += Number(quote.carColor?.price);
      }
      if (quote.carInsurance?.price && isHasInsurance) {
        totalPrice += Number(quote.carInsurance?.price);
      }
      return totalPrice;
    },

    customMoneyForPdf(value){
      return customMoney(value);
    },

    redLineLeftMargin(carTypeWidth) {
      let containerWidth = this.pdfWidth - this.marginLeftPdf * 2;
      let withoutTextWidth = containerWidth / 2 - carTypeWidth / 2;
      let lineMarginText = 23;
      return withoutTextWidth - lineMarginText;
    },

    redLineRightMargin(carTypeWidth) {
      let containerWidth = this.pdfWidth - this.marginLeftPdf * 2;
      let withoutTextWidth = containerWidth / 2 + carTypeWidth / 2;
      let lineMarginText = 46;
      return withoutTextWidth + lineMarginText + lineMarginText;
    },

    textMarginRight (textWidth){
      return this.pdfWidth  - 60 - textWidth;
    },

    textHalfPdf(textWidth){
      return this.pdfWidth / 2 - textWidth - 10;
    },
    breakTextLine(text = "", breakLine){
      let splitText = text.split(' ');
      let firstLine = [];
      let secondLine = [];
      let count = 0;
      splitText.forEach((item,index) => {
        count = count + item.length + 1;
        if (count <= breakLine) {
          firstLine.push(item);
        } else {
          secondLine.push(item);
        }
      });
      let firstLineString = '';
      let secondLineString = '';
      firstLine.forEach((item,index) => firstLineString += index == 0 ? '' + item : ' ' + item);
      secondLine.forEach((item,index) => secondLineString += index == 0 ? '' + item : ' ' + item);
      return {
        firstLineString,
        secondLineString,
      }
    },
    truncateString(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + '...';
      } else {
        return str;
      }
    },
    downloadPDF() {
      this.printPaymentData = {
        carModel: this.carModel.Title,
        carGrade: this.carGrade.Title,
        carColor: this.carColor.ColorName,
      };
      // this.pdfImageUrl = this.imageEndPoint(carImage);
      this.$nextTick(() => {
        this.savePdf(this.printPaymentData);
      }, 1000);
    },
    savePdf(quote) {
      const { carModel, carGrade, carColor } = quote;
      let doc = new this.jspdf('p', 'pt', [this.pdfWidth, this.pdfHeight]);

      const MARGIN_COMPONENT = 90;
      const HEIGHT_TEXT_FONT_SIZE_LG = 33;
      const HEIGHT_TEXT_FONT_SIZE_MD = 23;
      const MARGIN_BLOCK_TEXT = 25;
      const MARGIN_TEXT_LG = 30;
      const MARGIN_TEXT_SM = 20;
      const MARGIN_TEXT_XS = 15;

      const FONT_SIZE_HEADER = 62;
      const FONT_SIZE_LG = 50;
      const FONT_SIZE_MD = 40;
      const FONT_SIZE_SM = 35;
      const FONT_SIZE_XS = 30;
      const HEIGHT_HEADER = 120;
      const TOP_BOX_TITLE = HEIGHT_HEADER + MARGIN_COMPONENT;
      const HEIGHT_BOX_TITLE = 320;
      const WIDTH_BOX_TITLE = 520;
      const TOP_FIRST_LINE = HEIGHT_HEADER + MARGIN_COMPONENT + HEIGHT_BOX_TITLE + MARGIN_COMPONENT;
      const HEIGHT_ROW_TABLE = 80;
      const TOP_CAR_MODEL_TEXT = TOP_BOX_TITLE + 70;
      const TOP_FIRST_ROW_TABLE = TOP_FIRST_LINE + MARGIN_COMPONENT + 45;
      const TOP_SECOND_LINE = TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE + HEIGHT_ROW_TABLE + MARGIN_COMPONENT;
      const WIDTH_BLOCK_CAR_IMAGE = this.pdfWidth - this.marginLeftPdf - 520 - this.marginLeftPdf - this.marginLeftPdf / 2
      const HEIGHT_BLOCK_CAR_IMAGE = MARGIN_COMPONENT + HEIGHT_BOX_TITLE + MARGIN_COMPONENT;
      const TEXT_HEADER_TOP = 73;
      const POSITION_TEXT_RIGHT = 'right';
      const POSITION_TEXT_CENTER = 'center';
      const LEFT_HEADER_CONTENT = 100;

      //INFO: Draw Header
      doc.setFont('KittithadaMedium65');
      doc.setFontSize(FONT_SIZE_HEADER);
      doc.setDrawColor(229, 0, 17);
      doc.setFillColor(229, 0, 17);
      doc.rect(0, 0, this.pdfWidth, HEIGHT_HEADER, 'FD');


      //INFO: Text header
      let thailandText = this.fields?.PDFTitle?.value;
      doc.setTextColor(255, 255, 255);
      doc.text(thailandText, this.pdfWidth - this.marginLeftPdf, TEXT_HEADER_TOP, null, null, POSITION_TEXT_RIGHT);

      //INFO: Box title
      doc.setDrawColor(100);
      doc.setFillColor(255, 255, 255);
      doc.setLineWidth(1);
      doc.rect(this.marginLeftPdf, TOP_BOX_TITLE, WIDTH_BOX_TITLE, HEIGHT_BOX_TITLE, 'FD');

      //INFo: header content
      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_LG);
      doc.setFontType('400');
      doc.setFont('KittithadaMedium65');
      if (this.breakTextLine(carModel, 25)?.secondLineString?.length) {
        doc.text(this.breakTextLine(carModel, 25)?.firstLineString, LEFT_HEADER_CONTENT, TOP_CAR_MODEL_TEXT);
        doc.text(
          this.breakTextLine(carModel, 25)?.secondLineString,
          LEFT_HEADER_CONTENT,
          TOP_CAR_MODEL_TEXT + HEIGHT_TEXT_FONT_SIZE_LG + MARGIN_TEXT_SM
        );
      } else {
        doc.text(this.breakTextLine(carModel, 25)?.firstLineString, LEFT_HEADER_CONTENT, TOP_CAR_MODEL_TEXT);
      }

      if (this.breakTextLine(carModel, 25)?.secondLineString?.length) {
        doc.setTextColor(0);
        doc.setFontSize(FONT_SIZE_MD);
        doc.setFontType('400');
        doc.setFont('KittithadaMedium65');
        if (this.breakTextLine(carGrade, 35)?.secondLineString?.length) {
          doc.text(
            this.breakTextLine(carGrade, 35)?.firstLineString,
            LEFT_HEADER_CONTENT,
            TOP_CAR_MODEL_TEXT +
              HEIGHT_TEXT_FONT_SIZE_LG +
              MARGIN_TEXT_SM +
              HEIGHT_TEXT_FONT_SIZE_LG +
              MARGIN_BLOCK_TEXT
          );
          doc.text(
            this.breakTextLine(carGrade, 35)?.secondLineString,
            LEFT_HEADER_CONTENT,
            TOP_CAR_MODEL_TEXT +
              HEIGHT_TEXT_FONT_SIZE_LG +
              MARGIN_TEXT_SM +
              HEIGHT_TEXT_FONT_SIZE_LG +
              MARGIN_BLOCK_TEXT +
              HEIGHT_TEXT_FONT_SIZE_MD +
              MARGIN_TEXT_SM
          );
        } else {
          doc.text(
            this.breakTextLine(carGrade, 35)?.firstLineString,
            LEFT_HEADER_CONTENT,
            TOP_CAR_MODEL_TEXT +
              HEIGHT_TEXT_FONT_SIZE_LG +
              MARGIN_TEXT_SM +
              HEIGHT_TEXT_FONT_SIZE_LG +
              MARGIN_BLOCK_TEXT
          );
        }

        if (this.breakTextLine(carGrade, 25)?.secondLineString?.length) {
          doc.setTextColor(0);
          doc.setFontSize(FONT_SIZE_MD);
          doc.setFontType('400');
          doc.setFont('KittithadaMedium65');
          if (this.breakTextLine(carColor, 35)?.secondLineString?.length) {
            doc.text(
              this.breakTextLine(carColor, 35)?.firstLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT
            );
            doc.text(
              this.breakTextLine(carColor, 35)?.secondLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM
            );
          } else {
            doc.text(
              this.breakTextLine(carColor, 35)?.firstLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT
            );
          }
        } else {
          doc.setTextColor(0);
          doc.setFontSize(FONT_SIZE_MD);
          doc.setFontType('400');
          doc.setFont('KittithadaMedium65');
          if (this.breakTextLine(carColor, 35)?.secondLineString?.length) {
            doc.text(
              this.breakTextLine(carColor, 35)?.firstLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT
            );
            doc.text(
              this.breakTextLine(carColor, 35)?.secondLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM
            );
          } else {
            doc.text(
              this.breakTextLine(carColor, 35)?.firstLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT
            );
          }
        }
      } else {
        doc.setTextColor(0);
        doc.setFontSize(FONT_SIZE_MD);
        doc.setFontType('400');
        doc.setFont('KittithadaMedium65');
        if (this.breakTextLine(carGrade, 35)?.secondLineString?.length) {
          doc.text(
            this.breakTextLine(carGrade, 35)?.firstLineString,
            LEFT_HEADER_CONTENT,
            TOP_CAR_MODEL_TEXT + HEIGHT_TEXT_FONT_SIZE_LG + MARGIN_BLOCK_TEXT
          );
          doc.text(
            this.breakTextLine(carGrade, 35)?.secondLineString,
            LEFT_HEADER_CONTENT,
            TOP_CAR_MODEL_TEXT +
              HEIGHT_TEXT_FONT_SIZE_LG +
              MARGIN_BLOCK_TEXT +
              HEIGHT_TEXT_FONT_SIZE_MD +
              MARGIN_TEXT_SM
          );
        } else {
          doc.text(
            this.breakTextLine(carGrade, 35)?.firstLineString,
            LEFT_HEADER_CONTENT,
            TOP_CAR_MODEL_TEXT + HEIGHT_TEXT_FONT_SIZE_LG + MARGIN_BLOCK_TEXT
          );
        }

        if (this.breakTextLine(carGrade, 25)?.secondLineString?.length) {
          doc.setTextColor(0);
          doc.setFontSize(FONT_SIZE_MD);
          doc.setFontType('400');
          doc.setFont('KittithadaMedium65');
          if (this.breakTextLine(carColor, 35)?.secondLineString?.length) {
            doc.text(
              this.breakTextLine(carColor, 35)?.firstLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT
            );
            doc.text(
              this.breakTextLine(carColor, 35)?.secondLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM
            );
          } else {
            doc.text(
              this.breakTextLine(carColor, 35)?.firstLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT
            );
          }
        } else {
          doc.setTextColor(0);
          doc.setFontSize(FONT_SIZE_MD);
          doc.setFontType('400');
          doc.setFont('KittithadaMedium65');
          if (this.breakTextLine(carColor, 35)?.secondLineString?.length) {
            doc.text(
              this.breakTextLine(carColor, 35)?.firstLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT
            );
            doc.text(
              this.breakTextLine(carColor, 35)?.secondLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_TEXT_SM
            );
          } else {
            doc.text(
              this.breakTextLine(carColor, 35)?.firstLineString,
              LEFT_HEADER_CONTENT,
              TOP_CAR_MODEL_TEXT +
                HEIGHT_TEXT_FONT_SIZE_LG +
                MARGIN_BLOCK_TEXT +
                HEIGHT_TEXT_FONT_SIZE_MD +
                MARGIN_BLOCK_TEXT
            );
          }
        }
      }

      //INFO: first line
      doc.setDrawColor(100);
      doc.setLineWidth(1);
      doc.line(0, TOP_FIRST_LINE, this.pdfWidth, TOP_FIRST_LINE);

      //INFO: Car price (tax included)
      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_MD);
      doc.setFontType('400');
      doc.setFont('KittithadaMedium65');
      doc.text('ราคารถ (รวมภาษี)', this.marginLeftPdf, TOP_FIRST_LINE + MARGIN_COMPONENT);

      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_LG);
      doc.setFontType('400');
      doc.setFont('KittithadaMedium65');
      doc.text(
        this.customMoneyForPdf(this.priceSelectedCar.toString()) + ' ' + this.fields.CurrencyUnit.value,
        this.pdfWidth - this.marginLeftPdf,
        TOP_FIRST_LINE + MARGIN_COMPONENT,
        null,
        null,
        POSITION_TEXT_RIGHT
      );

      //INFO: Row 1
      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(217, 217, 217);
      doc.rect(
        this.marginLeftPdf / 2,
        TOP_FIRST_ROW_TABLE,
        (3 * (this.pdfWidth - this.marginLeftPdf)) / 8,
        HEIGHT_ROW_TABLE,
        'FD'
      );

      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(217, 217, 217);
      doc.rect(
        this.marginLeftPdf / 2 + (3 * (this.pdfWidth - this.marginLeftPdf)) / 8,
        TOP_FIRST_ROW_TABLE,
        (1 * (this.pdfWidth - this.marginLeftPdf)) / 8,
        HEIGHT_ROW_TABLE,
        'FD'
      );

      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(217, 217, 217);
      doc.rect(
        this.marginLeftPdf / 2 + (this.pdfWidth - this.marginLeftPdf) / 2,
        TOP_FIRST_ROW_TABLE,
        (1 * (this.pdfWidth - this.marginLeftPdf)) / 4,
        HEIGHT_ROW_TABLE,
        'FD'
      );

      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(217, 217, 217);
      doc.rect(
        this.marginLeftPdf / 2 + (3 * (this.pdfWidth - this.marginLeftPdf)) / 4,
        TOP_FIRST_ROW_TABLE,
        (1 * (this.pdfWidth - this.marginLeftPdf)) / 4,
        HEIGHT_ROW_TABLE,
        'FD'
      );
      //INFO: Row 2
      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(217, 217, 217);
      doc.rect(
        this.marginLeftPdf / 2,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE,
        (3 * (this.pdfWidth - this.marginLeftPdf)) / 24,
        HEIGHT_ROW_TABLE,
        'FD'
      );

      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(217, 217, 217);
      doc.rect(
        this.marginLeftPdf / 2 + (3 * (this.pdfWidth - this.marginLeftPdf)) / 24,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE,
        (6 * (this.pdfWidth - this.marginLeftPdf)) / 24,
        HEIGHT_ROW_TABLE,
        'FD'
      );

      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(217, 217, 217);
      doc.rect(
        this.marginLeftPdf / 2 + (3 * (this.pdfWidth - this.marginLeftPdf)) / 8,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE,
        (1 * (this.pdfWidth - this.marginLeftPdf)) / 8,
        HEIGHT_ROW_TABLE,
        'FD'
      );

      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(217, 217, 217);
      doc.rect(
        this.marginLeftPdf / 2 + (this.pdfWidth - this.marginLeftPdf) / 2,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE,
        (1 * (this.pdfWidth - this.marginLeftPdf)) / 4,
        HEIGHT_ROW_TABLE,
        'FD'
      );

      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(217, 217, 217);
      doc.rect(
        this.marginLeftPdf / 2 + (3 * (this.pdfWidth - this.marginLeftPdf)) / 4,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE,
        (1 * (this.pdfWidth - this.marginLeftPdf)) / 4,
        HEIGHT_ROW_TABLE,
        'FD'
      );

      //INFO: content row 1
      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      doc.text(
        'เงินดาวน์',
        this.marginLeftPdf / 2 + (3 * (this.pdfWidth - this.marginLeftPdf)) / (8 * 2) - 88 / 2,
        TOP_FIRST_ROW_TABLE + 50
      );

      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      doc.text(
        'ดอกเบี้ย',
        this.marginLeftPdf / 2 +
          (3 * (this.pdfWidth - this.marginLeftPdf)) / 8 +
          (1 * (this.pdfWidth - this.marginLeftPdf)) / (8 * 2) -
          82 / 2,
        TOP_FIRST_ROW_TABLE + 50
      );

      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      doc.text(
        'ระยะเวลาผ่อนชำระ',
        this.marginLeftPdf / 2 +
          (this.pdfWidth - this.marginLeftPdf) / 2 +
          (1 * (this.pdfWidth - this.marginLeftPdf)) / (4 * 2) -
          172 / 2,
        TOP_FIRST_ROW_TABLE + 50
      );

      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      doc.text(
        'ผ่อนชำระต่อเดือน',
        this.marginLeftPdf / 2 +
          (3 * (this.pdfWidth - this.marginLeftPdf)) / 4 +
          (1 * (this.pdfWidth - this.marginLeftPdf)) / (4 * 2) -
          178 / 2,
        TOP_FIRST_ROW_TABLE + 50
      );

      //INFO: content row 2
      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      doc.text(
        this.paymentAmountPecent + '%',
        this.marginLeftPdf / 2 + (3 * (this.pdfWidth - this.marginLeftPdf)) / (24 * 2) - 48 / 2,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE + 50
      );

      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      let downPaymentAmountPrice = this.paymentAmountBath.split(',').join('');
      doc.text(
        this.customMoneyForPdf(downPaymentAmountPrice) + ' ' + this.fields.CurrencyUnit.value,
        this.marginLeftPdf / 2 +
          (3 * (this.pdfWidth - this.marginLeftPdf)) / 24 +
          (6 * (this.pdfWidth - this.marginLeftPdf)) / (24 * 2) -
          128 / 2,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE + 50
      );

      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      doc.text(
        this.interestRate + '%',
        this.marginLeftPdf / 2 +
          (3 * (this.pdfWidth - this.marginLeftPdf)) / 8 +
          (1 * (this.pdfWidth - this.marginLeftPdf)) / (8 * 2) -
          48 / 2,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE + 50
      );

      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      doc.text(
        this.installmentPeriodValue.id + ' ' + this.fields.TimeUnit.value,
        this.marginLeftPdf / 2 +
          (this.pdfWidth - this.marginLeftPdf) / 2 +
          (1 * (this.pdfWidth - this.marginLeftPdf)) / (4 * 2) -
          88 / 2,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE + 50
      );
      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      doc.text(
        this.customMoneyForPdf(this.totalMoneyPayPerMonth()) + ' ' + this.fields.CurrencyUnit.value,
        this.marginLeftPdf / 2 +
          (3 * (this.pdfWidth - this.marginLeftPdf)) / 4 +
          (1 * (this.pdfWidth - this.marginLeftPdf)) / (4 * 2) -
          128 / 2,
        TOP_FIRST_ROW_TABLE + HEIGHT_ROW_TABLE + 50
      );

      //INFO: line
      doc.setDrawColor(100);
      doc.setLineWidth(1);
      doc.line(0, TOP_SECOND_LINE, this.pdfWidth, TOP_SECOND_LINE);

      //INFO: remax
      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_SM);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      doc.text('หมายเหตุ', this.marginLeftPdf, TOP_SECOND_LINE + MARGIN_COMPONENT);

      const date = new Date()
      let getMonth =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1).toString()
          : (date.getMonth() + 1).toString();
      let getDay =
        date.getDate() < 10
          ? '0' + date.getDate().toString()
          : date.getDate().toString();
      let remaxDate = ' ' + getDay + '/' + getMonth + '/' + date.getFullYear().toString();
      doc.setTextColor(0);
      doc.setFontSize(FONT_SIZE_XS);
      doc.setFontType('300');
      doc.setFont('KittithadaMedium65');
      if (this.breakTextLine(this.fields?.PDFRemark?.value + remaxDate, 120)?.secondLineString?.length) {
        doc.text(
          this.breakTextLine(this.fields?.PDFRemark?.value + remaxDate, 120)?.firstLineString,
          this.marginLeftPdf,
          TOP_SECOND_LINE + MARGIN_COMPONENT + HEIGHT_TEXT_FONT_SIZE_MD + MARGIN_TEXT_LG
        );
        doc.text(
          this.breakTextLine(this.fields?.PDFRemark?.value + remaxDate, 120)?.secondLineString,
          this.marginLeftPdf,
          TOP_SECOND_LINE +
            MARGIN_COMPONENT +
            HEIGHT_TEXT_FONT_SIZE_MD +
            MARGIN_TEXT_LG +
            HEIGHT_TEXT_FONT_SIZE_MD +
            MARGIN_TEXT_XS
        );
      } else {
        doc.text(
          this.breakTextLine(this.fields?.PDFRemark?.value + remaxDate, 120)?.firstLineString,
          this.marginLeftPdf,
          TOP_SECOND_LINE + MARGIN_COMPONENT + HEIGHT_TEXT_FONT_SIZE_MD + MARGIN_TEXT_LG
        );
      }

      // INFO : draw footer
      doc.setDrawColor(229, 0, 17);
      doc.setFillColor(229, 0, 17);
      doc.rect(0, this.pdfHeight - 130, this.pdfWidth, 130, 'FD');

      // doc.setFontSize(20);
      // doc.setTextColor(255, 255, 255);
      // doc.setFont('KittithadaMedium65');
      // doc.text('สงวนลิขสิทธิ์ © 2019 บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด', this.marginLeftPdf + 6, this.pdfHeight - 55);
      // doc.addImage(hotLine, 'PNG', this.pdfWidth - 350, this.pdfHeight - 90, 290, 54);

      // INFO: waiting for the file to be loaded, wait for 1200.
      // TODO: use promise chaning for this

      //INFO: Logo
      let getLogoPromise = new Promise((resolve, reject) => {
        let logoImg = new Image();
        logoImg.setAttribute('crossorigin', 'anonymous');
        logoImg.src = this.extractPdfLink(this.fields?.PDFLogo?.value?.src);
        logoImg.onload = function(){
          resolve(logoImg);
        };
        logoImg.onerror = () => {
          reject(new Error('error when loading image '))
        }
      }).catch((e) => {
        console.error(e);
      });

      //INFO: car image
       let getCarImgPromise = new Promise((resolve, reject) => {
        let carImg = new Image();
        carImg.setAttribute('crossorigin', 'anonymous');
        carImg.src = this.extractPdfLink(this.carImage);
        carImg.onload = function(){
          resolve(carImg);
        };
        carImg.onerror = () => {
          reject(new Error('error when loading image '))
        }
      }).catch((e) => {
        console.error(e);
      });

      Promise.all([getLogoPromise, getCarImgPromise]).then(([logoImg, carImg]) => {
        doc.addImage(logoImg, 'PNG', 60, HEIGHT_HEADER - 71, 140, 25);
        doc.addImage(carImg, 'PNG', 
        this.marginLeftPdf + 520 + this.marginLeftPdf / 2 + (WIDTH_BLOCK_CAR_IMAGE - 480) / 2,
        HEIGHT_HEADER + (HEIGHT_BLOCK_CAR_IMAGE - 279) / 2,
        480,
        279);
        let dateString = date.getFullYear().toString() + getMonth + getDay;
        let fileName = dateString + carGrade + '-'+ carColor;
        // INFO : replace space, dot  by whitespace
        fileName = fileName.replace(/\./g, '');
        fileName = fileName.replace(/\s/g, '');
        doc.save(fileName);
      }).catch(error => {
        alert('Error when loading image')
      });
    },
    extractPdfLink(link = '') {
      let linkArray = link.split('/');
      let returnLink = ''
      // INFO: remove http://domain/
      if (linkArray.length > 3) {
        returnLink = linkArray.slice(3, linkArray.length).join('/');
      } else {
        console.error("parsing relative link failed")
      }
      return window.location.origin + '/' + returnLink;
    },
    getBathByPrice() {
      this.paymentAmountBath = this.getBathByPercent(this.paymentAmountPecent);
    }
  },
  watch: {
    priceSelectedCar() {
      // Recalculate Bath by Percent when priceSelectedCar on change.
      this.getBathByPrice();
    }
  },
  computed: {
    ...mapState('quotation', { isModifyingQuote: 'isModifyingQuote'}),
    ...mapState('quotation', { currentQuoteId: 'currentQuoteId'}),
    ...mapState('quotation', { quoteToDealerData: 'quoteToDealerData' }),
    ...mapState('quotation', { isFromRequestQuotation: 'isFromRequestQuotation'}),
    priceSelectedCar: function() {
      // TODO: where is the insurance price?
      // let carInsurancePrice = 0;
      // if(this.isHaveDataFromQuote && !this.isChangeCarGradeId){
      //   carInsurancePrice = this.checkHasPrice(this.quoteToDealerData.carInsurance.price);
      // }
      // let totalPrice =
      //   this.checkHasPrice(this.carGrade.Price) + this.checkHasPrice(this.carColor.ColorPrice) + carInsurancePrice;
      let totalPrice =
        this.checkHasPrice(this.carGrade.Price) + this.checkHasPrice(this.carColor.ColorPrice);
      return totalPrice;
    },
    carImage: function() {
      let carRotate =
        this.carColor.rotateImage &&
        this.carColor.rotateImage.length &&
        this.carColor.rotateImage[0];
      let carNormal = this.carGrade.Image
        ? this.carGrade.Image
        : this.carModel.Image;

      let carColor = this.carColor.Image
        ? this.carColor.Image
        : carNormal;

      return carRotate ? carRotate : carColor;
    },
    carImageSm: function() {
      let carRotate =
        this.carColor.rotateImage &&
        this.carColor.rotateImage.length &&
        this.carColor.rotateImage[0];

      let carNormal = this.carGrade.ImageSm
        ? this.carGrade.ImageSm
        : this.carModel.ImageSm;

      let carColor = this.carColor.ImageSm
        ? this.carColor.ImageSm
        : carNormal;

      return carRotate ? carRotate : carColor;
    },
    trackingApiOptions() {
      return {
        host: config.sitecoreApiHost,
        querystringParams: {
          sc_apikey: config.sitecoreApiKey,
        },
        fetcher: dataFetcher,
      };
    },
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.onUnloadEvent);
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.caculator {
  background: #f5f5f5;
  padding: 30px 0;

  @include media-breakpoint-up(lg) {
    padding: 50px 0;
  }

  &__wrap {
    background: $white;
    padding: 20px 20px 0;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    z-index: $NOMAL-ZINDEX;
    position: relative;

    @include media-breakpoint-up(md) {
      padding: 30px 25px 0;
    }

    @include media-breakpoint-up(lg) {
      // width: 95%;
      margin: 0 auto;
    }
  }

  &__title {
    font-size: 2.7rem;
    font-weight: $font-weight-bold;

    @include media-breakpoint-up(lg) {
      margin-left: 25px;
    }
  }

  &__select-car,
  &__select-detail {
    &__label {
      font-size: $font-size-payment-label-mobile;

      @include media-breakpoint-up(md) {
        vertical-align: middle;
        font-size: $font-size-payment-label;
        line-height: 4.5rem;
      }

      @include media-breakpoint-up(lg) {
        text-align: right;
      }
    }
  }

  &__select-car {
    border-bottom: 1px solid #eee;
    padding: 0 0 15px;
  }

  &__select-detail {
    padding: 20px 0 0;
  }

  &__result {
    padding: 20px 0 0;

    &__image {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      padding: 10px 0 20px;
      width: 100%;

      @include media-breakpoint-up(xl) {
        margin-left: 50px;
      }

    }

    &__detail {
      &__title {
        text-align: right;
        margin-right: -10px;
        font-size: $font-size-payment-result-mobile;
      }

      &__value {
        font-weight: bold;
        font-size: $font-size-payment-result-mobile;

        @include media-breakpoint-up(lg) {
          flex-direction: row;
          font-size: $font-size-payment-result;
        }
      }
    }

    &__note {
      font-size: 1.8rem;
      margin: 0;
    }

    &__button-group {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      @include media-breakpoint-up(md) {
        flex-direction: row;
        justify-content: center;
      }
    }

    &__button {
      margin-bottom: 10px;
      width: 100%;

      @include media-breakpoint-up(md) {
        margin: 0 15px;
        width: auto;
      }
    }

    &__footer {
      background: #222;
      color: $white;
      padding: 15px 20px 15px;
      margin: 20px -20px 0;
      border-radius: 3px;
      display: flex;
      justify-content: center;

      @include media-breakpoint-up(md) {
        padding: 10px 20px 20px;
        margin: 50px -25px 0;
        flex-direction: column;
        align-items: center;
      }
    }

    &__total {
      margin-left: 10px;
      width: 60%;
      order: 1;
      text-align: right;

      @include media-breakpoint-up(md) {
        order: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__title {
        margin: 0;
        font-size: $font-size-payment-total-title-mobile;

        @include media-breakpoint-up(md) {
          font-size: $font-size-payment-total-title;
          display: inline-block;
        }
      }

      &__price {
        @include media-breakpoint-up(md) {
          display: inline-block;
          margin-left: 30px;
        }

        .price-value {
          font-size: $font-size-payment-price-value-mobile;

          @include media-breakpoint-up(md) {
            font-size: $font-size-payment-price-value;
            display: inline-block;
          }
        }

        .price-unit {
          font-size: $font-size-payment-price-unit-mobile;

          @include media-breakpoint-up(md) {
            margin-left: 15px;
          }
        }
      }
    }
  }

  &__remark {
    // padding: 25px 20px 0;
    // width: 95%;
    // margin: 0 auto;
    margin-top: 25px;
    font-size: $font-size-payment-remark;

    // &__content {
    //   padding-left: 0;
    //   margin-left: -15px;
    //   margin-bottom: 0;
    // }
  }

  .caculator__button {
    text-decoration: none;
    font-weight: bold;
    padding: 8px 20px;
    width: 100%;
    border: 0;
    cursor: pointer;
    transition: all 0.2s ease-out;
    height: 43px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    line-height: 1.6rem; //INFO: Style button when it has 2 lines text
    font-size: $font-size-payment-button-mobile;
    font-family: KittithadaBold75;

    @include media-breakpoint-up(md) {
      width: auto;
      font-size: $font-size-payment-button;
    }

    @include media-breakpoint-up(lg) {
      padding: 8px 30px;
    }
  }

  .button-install {
    margin: 10px 0 25px 0;
    @include i-btn-payment ($primary-bgr, $primary-color, $primary-bgr-activated, $primary-color-activated);
    width: fit-content;
  }

  .button-reset {
    padding: 8px 15px;
    @include i-btn-payment ($secondary-bgr, $secondary-color, $secondary-bgr-activated, $secondary-color-activated);

    @include media-breakpoint-up(md) {
      padding: 8px 30px;
    }
  }

  .button-save-quote {
    @include i-btn-payment (#ff0000, $white, darken(#ff0000,10), $white);
  }

  .button-request-to-dealer {
    @include i-btn-payment (#00cc00, $white, darken(#00cc00,10), $white);
  }

  .asterisk {
    font-size: $font-size-base;
    color: red;
  }

  .car-price-selected {
    display: inline-block;
    margin-bottom: 10px;
    font-size: $font-size-payment-value-selected;

    @include media-breakpoint-up(md) {
      line-height: 4.5rem;
    }
  }

  //Customize IsuSelect, IsuInput

  & >>> .select-group {
    margin-bottom: 15px;
    font-size: $font-size-payment-value-selected;

    label {
      font-size: 2rem;

      @include media-breakpoint-up(lg) {
        font-size: 2.3rem;
      }
    }
  }

  & >>> .isu-select-option-mux {
    select {
      padding: 0 35px 0 15px;
      background-color: #EAEAEA;
      border-radius: 3px;
      margin-bottom: 20px;
      border: none;
      height: 45px;
      @include media-breakpoint-down(xs) {
        height: 35px;
      }
      option {
        background: $white;
      }
    }
  }

  & >>> .v-select {
    width: 100%;
    background: #EAEAEA;
    border-radius: 3px;
    font-size: $font-size-payment-value-selected;
  }

  & >>> .vs__dropdown-toggle {
    border: none;
    padding: 0;
  }

  & >>> .vs__selected {
    margin-top: 0;
    padding-left: 11px;
  }

  & >>> .vs__search {
    padding-left: 13px;
  }

  & >>> .vs__selected-options {
    height: 35px;

    @include media-breakpoint-up(md) {
      height: 45px;
    }
  }

  & >>> .vs__actions {
    padding: 0 14px 0 0;
  }

  & >>> .isu-input {
    margin-bottom: 15px;
    font-size: $font-size-payment-value-selected;

    label {
      font-size: 2rem;

      @include media-breakpoint-up(lg) {
        font-size: 2.3rem;
      }
    }
  }

  & >>> .input-control {
    padding: 10px;
    padding-left: 15px;
    border: none;
    border-radius: 3px;
    background: #EAEAEA;
    height: 35px;

    @include media-breakpoint-up(md) {
      height: 45px;
    }
  }
}
</style>
