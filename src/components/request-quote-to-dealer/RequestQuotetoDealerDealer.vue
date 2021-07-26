<template>
  <div class="choose-dealer" v-show="isShowDealer">
    <div class="choose-dealer__heading">
      <div class="choose-dealer__number">
        <!-- <span>03</span> -->
      </div>
      <div class="text-center choose-dealer__title">
        <sc-text class="isu-title" tag="h2" :field="fields.Title" />
      </div>
    </div>
    <div class="container">
      <div class="choose-dealer__content">
        <div class="row">
          <div class="col-md-4">
            <div class="select-group">
              <label>
                <sc-text :field="fields.ProvinceLabel" />
                <span class="required"> *</span>
              </label>
              <!-- <isu-select
                :required="true"
                :placeholder="fields.ProvincePlaceholder && fields.ProvincePlaceholder.value"
                :valSelect="provinceValue"
                :listOptions="provinces"
                :nameSelect="'provinceValue'"
                :classLable="'select-label'"
                :formGroupName="'userAccount'"
                :formControlName="'จังหวัด'"
                @onChangeSelect="getSelectValue"
              ></isu-select> -->
              <isu-select-option-mux 
                :required="true"
                :placeholder="fields.ProvincePlaceholder && fields.ProvincePlaceholder.value"
                :valSelect="provinceValue" 
                :listOptions="provinces"
                :nameSelect="'provinceValue'" 
                :classLable="'select-label'"
                :formGroupName="'userAccount'"
                :formControlName="'จังหวัด'"
                @onChangeSelect="getSelectValue"
                >
              </isu-select-option-mux>
            </div>
          </div>
          <div class="col-md-4">
            <div class="select-group">
              <label>
                <sc-text :field="fields.DistrictLabel" />
                <span class="required"> *</span>
              </label>
              <!-- <isu-select
                :required="true"
                :placeholder="fields.DistrictPlaceholder && fields.DistrictPlaceholder.value"
                :valSelect="districtValue"
                :listOptions="listDistrict"
                :nameSelect="'districtValue'"
                :classLable="'select-label'"
                :formGroupName="'userAccount'"
                :formControlName="'อำเภอ'"
                @onChangeSelect="getSelectValue"
              ></isu-select> -->
              <isu-select-option-mux 
                :required="true"
                :placeholder="fields.DistrictPlaceholder && fields.DistrictPlaceholder.value"
                :valSelect="districtValue" 
                :listOptions="listDistrict"
                :nameSelect="'districtValue'" 
                :classLable="'select-label'"
                :formGroupName="'userAccount'"
                :formControlName="'อำเภอ'"
                @onChangeSelect="getSelectValue"
                >
              </isu-select-option-mux>
            </div>
          </div>
          <div class="col-md-4">
            <div class="select-group">
              <label>
                <sc-text :field="fields.DealerLabel" />
                <span class="required"> *</span>
              </label>
              <!-- <isu-select
                :required="true"
                :placeholder="fields.DealerPlaceholder && fields.DealerPlaceholder.value"
                :valSelect="dealerValue"
                :listOptions="dealers"
                :nameSelect="'dealerValue'"
                :classLable="'select-label'"
                :formGroupName="'userAccount'"
                :formControlName="'ผู้จำหน่าย'"
                @onChangeSelect="getSelectValue"
              ></isu-select> -->
              <isu-select-option-mux 
                :required="true"
                :placeholder="fields.DealerPlaceholder && fields.DealerPlaceholder.value"
                :valSelect="dealerValue" 
                :listOptions="dealers"
                :nameSelect="'dealerValue'" 
                :classLable="'select-label'"
                :formGroupName="'userAccount'"
                :formControlName="'ผู้จำหน่าย'"
                @onChangeSelect="getSelectValue"
                >
              </isu-select-option-mux>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import IsuSelect from '../shared/IsuSelect';
import { mapActions, mapState, mapGetters } from "vuex";
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';

export default {
  name: 'RequestQuotetoDealerDealer',
  components: {
    ScText: Text,
    IsuSelect,
    IsuSelectOptionMux: IsuSelectOptionMux,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data (){
    return {
      listDistrict : [],
      isShowDealer: false,
    }
  },
  methods: {
    ...mapActions('dealers', ['getProvinceList']),
    ...mapActions('dealers', ['getDistrictList']),
    ...mapActions('dealers', ['updateQuoteToDealerCurrentProvince']),
    ...mapActions('dealers', ['updateQuoteToDealerCurrentDistrict']),
    ...mapActions('dealers', ['updateQuoteToDealerCurrentDealer']),
    ...mapActions('dealers', ['getDealerList']),

    getSelectValue(values) {
      this[values.name] = values.value;
      if (values.name == 'provinceValue') {
        this.$root.$emit('provinceSelected', values.value);
        this.updateQuoteToDealerCurrentProvince(values.value);
        this.getDistrictList();
        this.getDealerList(); //INFO: Do it to reset dealer when select province again
      } else if (values.name == 'districtValue') {
        this.$root.$emit('districtSelected', values.value);
        this.updateQuoteToDealerCurrentDistrict(values.value);
        this.getDealerList();
      } else {
        this.$root.$emit('dealerSelected', values.value);
        this.updateQuoteToDealerCurrentDealer(values.value);
        this.scrollToNextStep();
      }
    },
    scrollToNextStep() {
      this.$root.$emit('scroll:RequestQuoteToDealerForm');
    },
    getDistrictList(){
      if(this.provinceValue?.id){
        let province = this.provinces.find(item => item.id == this.provinceValue.id);
        if(province){
          this.listDistrict = province.SubItems;
          this.listDistrict = this.listDistrict.map(item => {
            return {
              ...item,
              id : item.ItemId,
              label : item.LocateName
            }
          })
        }
      }
    },
  },
  computed: {
    ...mapState('dealers', { provinces: 'provinceList'}),
    ...mapState('dealers', { provinceValue: 'quoteToDealerCurrentProvince'}),
    ...mapState('dealers', { districtValue: 'quoteToDealerCurrentDistrict'}),
    ...mapState('dealers', { dealers: 'dealersList'}),
    ...mapState('dealers', { dealerValue: 'quoteToDealerCurrentDealer'}),

    // ...mapGetters('dealers', { districts: 'getDistrictListByProvinceQuotation'}), 
  },
  mounted() {
    this.getProvinceList();
    this.$root.$on('show:RequestQuoteToDealer', (data) => {
      this.isShowDealer = data;
    });
    if (this.provinceValue) {
      this.getDistrictList();
    }
    if (this.districtValue) {
      this.getDealerList();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.choose-dealer {
  text-align: center;
  background-color: #f5f5f5;
  padding: 0 0 50px;
  z-index: $TEST_REQUEST_QUOTE_DEALER_ZINDEX;
  position: relative;

  @include media-breakpoint-up(md) {
    padding: 50px 0;
  }

  &__number {
    color: #cccccc;
    margin-bottom: 8px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 2px;
    }

    span {
      font-size: 5rem;
      line-height: 2.4rem; //INFO: Line-height follow as the design

      @include media-breakpoint-up(lg) {
        font-size: 6rem;
        line-height: 4.8rem; //INFO: Line-height follow as the design
      }
    }
  }

  &__heading {
    // background-color: $white;

    // @include media-breakpoint-up(md) {
    //   background-color: $white;
    // }
  }

  &__title {
    margin-bottom: 20px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 46px;
    }
  }


  .select-group {
    width: 100%;
    margin-bottom: 15px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 25px;
    }

    .select-label {
      display: block;
      text-align: left;
    }

    .select-input {
      width: 100%;
      padding: 6px 10px;
    }

    > label {
      text-align: left;
      display: block;

      .required {
        color: #ee3026;
      }
    }
  }

  & >>> .isu-select {
    label {
      text-align: left;
    }
  }

  & >>> .v-select {
    @include media-breakpoint-up(md) {
      width: 100%;
    }
  }

  .asterisk {
    color: #ed2f25;
    font-size: $font-size-base;
  }
  .isu-select-option-mux {
    >>> select {
      margin-bottom: 0;
    }
    >>> .form-error {
      display: block;
    }
  }
}
</style>
