<template>
  <div class="choose-dealer">
    <div class="container">
      <div class="choose-dealer__number">
        <span>02</span>
      </div>
      <div class="text-center choose-dealer__title">
        <sc-text class="isu-title" tag="h2" :field="fields.Title" />
      </div>
      <div class="choose-dealer__content">
        <div class="row">
          <div class="col-md-4">
            <div class="select-group">
              <!-- <isu-select
                :textLable="'จังหวัด'"
                :required="true"
                :placeholder="'กรุณาเลือกจังหวัด'"
                :valSelect="provinceValue"
                :listOptions="provinces"
                :nameSelect="'provinceValue'"
                :classLable="'select-label'"
                :formGroupName="'userAccount'"
                :formControlName="'จังหวัด'"
                @onChangeSelect="getSelectValue"
              ></isu-select> -->
              <isu-select-option-mux 
                :textLable="'จังหวัด'"
                :required="true"
                :placeholder="'กรุณาเลือกจังหวัด'" 
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
              <!-- <isu-select
                :textLable="'อำเภอ/เขต'"
                :required="true"
                :placeholder="'กรุณาเลือกอำเภอ'"
                :valSelect="districtValue"
                :listOptions="listDistrict"
                :nameSelect="'districtValue'"
                :classLable="'select-label'"
                :formGroupName="'userAccount'"
                :formControlName="'อำเภอ'"
                @onChangeSelect="getSelectValue"
              ></isu-select> -->
              <isu-select-option-mux 
                :textLable="'อำเภอ/เขต'"
                :required="true"
                :placeholder="'กรุณาเลือกอำเภอ'" 
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
              <!-- <isu-select
                :textLable="'ผู้จำหน่าย'"
                :required="true"
                :placeholder="'กรุณาเลือกผู้จำหน่าย'"
                :valSelect="dealerValue"
                :listOptions="dealers"
                :nameSelect="'dealerValue'"
                :classLable="'select-label'"
                :formGroupName="'userAccount'"
                :formControlName="'ผู้จำหน่าย'"
                @onChangeSelect="getSelectValue"
              ></isu-select> -->
              <isu-select-option-mux 
                :textLable="'ผู้จำหน่าย'"
                :required="true"
                :placeholder="'กรุณาเลือกผู้จำหน่าย'" 
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
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';
import { getDistricts, getProvinces, getDealersByDistrict } from '../../service/dealerService';
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: 'TestDriveDealer',
  components: {
    ScText: Text,
    IsuSelect: IsuSelect,
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
    }
  },
  computed: {
    ...mapState('dealers', { provinces: 'provinceList'}),
    ...mapState('dealers', { provinceValue: 'testDriveCurrentProvince'}),
    ...mapState('dealers', { districtValue: 'testDriveCurrentDistrict'}),
    ...mapState('dealers', { dealers: 'testDriveDealersList'}),
    ...mapState('dealers', { dealerValue: 'testDriveCurrentDealer'}),
    // ...mapGetters('dealers', { districts: 'getDistrictListByProvinceDealer'}),
  },

  methods: {
    ...mapActions('dealers', ['getProvinceList']),
    ...mapActions('dealers', ['getDistrictList']),
    ...mapActions('dealers', ['updateTestDriveCurrentProvince']),
    ...mapActions('dealers', ['updateTestDriveCurrentDistrict']),
    ...mapActions('dealers', ['updateTestDriveCurrentDealer']),
    ...mapActions('dealers', ['getTestDriveDealerList']),

    getSelectValue(values) {
      this[values.name] = values.value;
      if (values.name == 'provinceValue') {
        this.$root.$emit('provinceSelected', values.value);
        this.updateTestDriveCurrentProvince(values.value);
        this.getDistrictList();
      } else if (values.name == 'districtValue') {
        this.$root.$emit('districtSelected', values.value);
        this.updateTestDriveCurrentDistrict(values.value);
        this.getTestDriveDealerList(this.$jss.routeData().name);
      } else {
        this.$root.$emit('dealerSelected', values.value);
        this.updateTestDriveCurrentDealer(values.value);
        this.scrollToNextStep();
      }
    },
    getDistrictList(){
      if(this.provinceValue?.id){
        let province = this.provinces.find(item => item.id == this.provinceValue.id);
        if(province){
          this.listDistrict = province.SubItems || [];
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
    scrollToNextStep() {
      this.$root.$emit('scroll:TestDriveForm');
    },
    scrollTopComponent() {
      this.$root.$on('scroll:TestDriveDealer', () => {
        this.$el.scrollIntoView();
      })
    }
  },

  mounted() {
    this.getProvinceList();
    this.getDistrictList();
    if(this.districtValue){
      this.getTestDriveDealerList(this.$jss.routeData().name);
    }
    this.scrollTopComponent();
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.choose-dealer {
  text-align: center;
  background-color: $gray-100;
  padding: 50px 0;
  z-index: $TEST_DRIVER-DEALER_ZINDEX;
  position: relative;

  &__number {
    color: #cccccc;
    margin-bottom: 5px;

    @include media-breakpoint-up(lg) {
      margin-bottom: -7px;
    }

    span {
      font-size: $font-size-test-drive-heading-number-mobile;
      line-height: 2.4rem; //INFO: Line-height follow as design

      @include media-breakpoint-up(lg) {
        font-size: $font-size-test-drive-heading-number;
        line-height: 4.8rem; //INFO: Line-height follow as design
      }
    }
  }

  &__title {
    margin-bottom: 30px;
  }

  .isu-select {
    font-size: $font-size-test-drive-select;
  }

  .isu-select-option-mux {
    margin-bottom: 20px;
    font-size: 2.5rem;
    >>> select {
      background-color: transparent;
      padding: 0 35px 0 15px;
      height: 50px;
    }
    >>> .form-error {
      display: block;
    }
  }

  .select-group {
    width: 100%;
    margin-bottom: 15px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 25px;
    }

    >>> .select-label {
      display: block;
      text-align: left;
      font-size: $font-size-test-drive-label;
    }

    .select-input {
      width: 100%;
      padding: 6px 10px;
    }

    >>> .v-select {
      @include media-breakpoint-up(md) {
        width: 100%;
      }
    }
  }

  .asterisk {
    color: #ed2f25;
    font-size: $font-size-base;
  }
}
</style>
