/* eslint-disable prettier/prettier */
<template>
  <div class="map-component">
    <div class="map-component__head">
      <sc-text tag="h2" class="isu-title" :field="fields.Title" />
    </div>
    <div class="map-component__body">
      <form action class="map-component__body__form">
        <div class="map-component__body__button i-btn__primary--none-active ripple" @click="searchNear()">
          <sc-text tag="p" class="search-title" :field="fields.SearchTitle" />
        </div>
        <div class="select-list">
          <!-- <isu-select
            :valSelect="provinceValue"
            :placeholder="fields.ProvinceSearchTitle.value"
            :listOptions="listProvince"
            :nameSelect="'provinceValue'"
            @onChangeSelect="getValSelect"
          ></isu-select> -->
          <isu-select-option :defaultValue="defaultProvinceName" :valSelect="provinceValue" :placeholder="fields.ProvinceSearchTitle.value" @onChangeSelect="getValSelect"  :nameSelect="'provinceValue'" :listOptions="listProvince"></isu-select-option>
        </div>
        <div class="select-list">
          <!-- <isu-select
            :valSelect="districtValue"
            :placeholder="fields.DistrictSearchTitle.value"
            :listOptions="listDistrict"
            :nameSelect="'districtValue'"
            @onChangeSelect="getValSelect"
          ></isu-select> -->
          <isu-select-option :defaultValue="defaultDistrictName" :valSelect="districtValue" :placeholder="fields.DistrictSearchTitle.value" @onChangeSelect="getValSelect"  :nameSelect="'districtValue'" :listOptions="listDistrict"></isu-select-option>
        </div>
        <isu-input
          :typeInput="'text'"
          :placeholder="fields.DealerNameSearchPlaceholder.value"
          :valInput="dealershipValue"
          :nameInput="'dealershipValue'"
          @inputChange="getDealershipValue"
        />
        <sc-text tag="div" class="filter-list" :field="fields.FilterbyServiceSearchTitle"/>
        <div class="list-checkbox">
          <isu-check-box
            :key="item.ID"
            v-for="(item, index) in listServiceData"
            @checkboxClick="getValueCheckbox"
            :typeCheckbox="'checkbox'"
            :idCheckbox="item.Name"
            :nameCheckbox="item.Name"
            :checked="item.isChecked"
            :textVal="item.Name"
            :required="false"
          ></isu-check-box>
        </div>
        <div class="btn-submit">
          <sc-text type="button" tag="button" class="i-btn i-btn__primary--none-active ripple" @click="handleClickBtnForm" :field="fields.ButtomSearchTitle" />
        </div>
      </form>
      <find-dealer-main-map ref="GoogleMap" :center="currentPos" :markerClusterIcon="markerClusterIcon" :markerIcon="markerIcon"  :fields="fields"></find-dealer-main-map>
    </div>
      <isu-popup ref="isuPopup" :isLoading="isLoading" :size="'sm'" :type="typePopup">
        <p v-if="resultSubmitForm" class="text-center">{{resultSubmitForm}}</p>
      </isu-popup>
  </div>
</template>

<script>
import IsuCheckBox from '../shared/IsuCheckBox';
import IsuInput from '../shared/IsuInput';
import IsuSelect from '../shared/IsuSelect';
import Paging from '../campaign/Paging';
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import FindDealerMainMap from './FindDealerMainMap';
import IsuPopup from '../shared/IsuPopup';
import { mapActions } from 'vuex';
import IsuSelectOption from '../shared/IsuSelectOption';
import {  detectLocaltion ,loadJsMap, getDistrictList, getProvinceList, createSearchDealerBody  } from './service/findDealerService';
import {
  getDealers,
  getSearchNearDealers,
  getProvinces,
} from '../../service/dealerService.js';

const DEFAULT_SEARCH_NEAR_MAX_SIZE = 5;

export default {
  name: 'MapFindDealer',
  components: {
    IsuCheckBox: IsuCheckBox,
    IsuInput: IsuInput,
    IsuSelect: IsuSelect,
    IsuSelectOption: IsuSelectOption,
    ScText: Text,
    FindDealerMainMap: FindDealerMainMap,
    IsuPopup: IsuPopup,
  },

  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    provinces: Array,
    listServices: Array,
  },

  data() {
    return {
      provinceValue: {},
      districtValue: {},
      servicesOffered: {},
      dealershipValue: '',
      listProvince: [],
      listDistrict: [],
      chosenService: [],
      longitude: '',
      latitude: '',
      pagingSize: this.$getConst('FIND_DEALER_PAGING_SIZE'),
      pagingIndex: 0,
      currentPos: {
        lat: (this.fields.DefaultLatitude?.value && Number(this.fields.DefaultLatitude.value)) ? Number(this.fields.DefaultLatitude.value) : 0,
        lng: (this.fields.DefaultLongitude?.value && Number(this.fields.DefaultLongitude.value)) ? Number(this.fields.DefaultLongitude.value) : 0,
      },
      markerIcon : {},
      markerClusterIcon: {},
      isLoading: false,
      typePopup : '',
      defaultProvinceName: '',
      defaultDistrictName: '',
      isSharedLocation: false,
      listServiceData : [],
      resultSubmitForm: '',
    };
  },
  watch: {
    listServices(value) {
      this.listServiceData = value;
      this.listServiceData.forEach(item => item.isChecked = true);
      this.chosenService = this.listServiceData.map((item) => item.ID);
      this.initMapData();
      this.updateServiceList(this.listServiceData);
    },
  },
  mounted (){
    this.markerClusterIcon = this.$jss.routeData().fields.MapMarkerIcon;
    this.markerIcon = this.$jss.routeData().fields.IsuzuMapIcon;
    this.defaultProvinceName = this.fields?.ProvinceSearchTitle?.value || 'All Province';
    this.defaultDistrictName = this.fields?.DistrictSearchTitle?.value || 'All District';
    this.listDistrict = [{
        id: this.defaultDistrictName,
        label: this.defaultDistrictName,
      }];
    this.getListProvince();
    this.registerPagingHandler();
  },
  methods: {
    ...mapActions('dealers', ['updateServiceList']),
    initMapData(){
      let googleMap = this.$refs.GoogleMap;
      const fallBackKeyGoogle = 'AIzaSyClLRaSuv3A3o7gttmaGJx6yuw3w9eqmWo'
      const googleMapKey = this.$jss?.routeData()?.fields?.GoogleMapKey?.value || fallBackKeyGoogle;
      let initializeMap = () => {
        detectLocaltion().then(position => {
          this.isSharedLocation = true;
          this.currentPos = position;
          this.$emit('update:locationSharedStatus', true);
          googleMap.moveToLocation(this.currentPos);
          this.searchDealer();
        })
        .catch(() => this.searchDealer());
        googleMap.initMap(this.currentPos);
      };
      loadJsMap(initializeMap, googleMapKey);
    },
    getListProvince(){
      getProvinces().then((res) => {
        this.listProvince = getProvinceList(res, this.defaultProvinceName);
      });
    },
    changePage(param) {
      this.pagingIndex = param;
      this.resetSearchDealer();
    },

    handleClickBtnForm() {
      this.isLoading = true;
      this.typePopup = 'waiting-popup';
      this.resultSubmitForm = '';
      this.$refs.isuPopup.showModal();
      this.pagingIndex = 0;
      this.resetSearchDealer(true);
    },

    resetSearchDealer(isResetPaging) {
      this.searchDealer(isResetPaging);
    },

    appendDataTable(body, res, isResetPaging){
      let dataDealer = res?.data?.Records?.DealerResultModel || [];
      let totalDealer = res?.data?.totalSearchResults || 0;
      this.transformDataPaging(body, dataDealer, totalDealer, isResetPaging);
    },

    getParamsSearchDealer(){
      return {
        province: this.provinceValue,
        district : this.districtValue,
        dealerShip : this.dealershipValue,
        chosenService : this.chosenService,
        latitude: this.latitude,
        longitude: this.longitude,
        currentPos: this.isSharedLocation ? this.currentPos : {},
        pageSize : this.pagingSize,
        pageIndex: this.pagingIndex,
        defaultProvinceName: this.defaultProvinceName,
        defaultDistrictName: this.defaultDistrictName,
      }
    },

    searchDealer(isResetPaging = false) {
      let body = createSearchDealerBody(this.getParamsSearchDealer());
      let bodyGetLocaltion = {
        ...body,
      };
      delete bodyGetLocaltion.PageSize;
      delete bodyGetLocaltion.PageIndex;
      getDealers(body).then((res) => {
        this.typePopup = 'successful-popup';
        this.isLoading = false;
        this.$refs.isuPopup.hideModal();
        this.appendDataTable(body,res,isResetPaging);
        this.markerListLocation(res);
      });
    },
    // TODO: it is duplicated with above function
    searchDealerFromPaging(isResetPaging = false) {
      this.isLoading = true;
      this.typePopup = 'waiting-popup';
      this.resultSubmitForm = '';
      this.$refs.isuPopup.showModal();
      let body = createSearchDealerBody(this.getParamsSearchDealer());
      getDealers(body).then((res) => {
        this.typePopup = 'successful-popup';
        this.isLoading = false;
        this.$refs.isuPopup.hideModal();
        this.appendDataTable(body, res, isResetPaging);
      },err => {
        this.typePopup = 'failed-popup';
        this.isLoading = false;
        this.$refs.isuPopup.hideModal();
      });
    },
    selectedProvince(provinceID){
      this.listDistrict = getDistrictList(this.listProvince, provinceID, this.defaultDistrictName);
    },
    getValSelect(select) {
      if (select.name == 'provinceValue') {
        this.selectedProvince(select.value.id);
        //INFO: clear list district when select all province
        if (select.value.id == this.defaultProvinceName) {
          this.listDistrict = [{
            id: this.defaultDistrictName,
            label: this.defaultDistrictName
          }];
          this.provinceValue = {};
          this.districtValue = {};
          return;
        }
        // INFO: reset district value when province change
        this.districtValue = {};
      }
      this[select.name] = select.value;
    },
    getDealershipValue(dealershipVal) {
      this.dealershipValue = dealershipVal.data;
    },
    getValueCheckbox(param) {
      let isSelect = param.value;
      let findService = this.listServiceData.find((item) => item.Name == param.name);
      if(isSelect){
        this.chosenService.push(findService.ID);
        this.listServiceData.forEach(item => {
          if(item.Name == param.name){
            item.isChecked = true;
          }
        });
        this.listServiceData = JSON.parse(JSON.stringify(this.listServiceData));
      }else{
        this.listServiceData.forEach(item => {
          if(item.Name == param.name){
            item.isChecked = false;
          }
        });
        this.listServiceData = JSON.parse(JSON.stringify(this.listServiceData));
        this.chosenService = this.chosenService.filter(item => item != findService.ID)
      }
    },
    findProvince(id){
      return this.listProvince.find((item) => item.id == id).label;
    },
    findDistrict(id){
      return this.listDistrict.find((item) => item.id == id).label;
    },
    registerPagingHandler() {
      this.$root.$on('changePageDealer', (page) => {
        this.pagingIndex = page;
        this.searchDealerFromPaging();
     });
    },
    transformDataPaging(body, data, total, isResetPaging) {
      // INFO : get name district, province for title response table dealer
      if (body.provinceID) {
        body.provinceName = this.findProvince(body.provinceID);
      } else {
        body.provinceName = this.fields.ProvinceSearchTitle.value;
      }
      if (body.districtID) {
        body.districtName = this.findDistrict(body.districtID);
      } else {
        body.districtName = this.fields.DistrictSearchTitle.value;
      }
      this.$emit('get:listDealers', {
        data,
        total,
        body,
        isResetPaging,
      });
    },
    markerListLocation(res) {
      let dataLocations = res?.data?.Records?.DealerLocationModel || [];
      let newMarkers = dataLocations.map((item) => {
        return {
          lat: parseFloat(item.Latitude),
          lng: parseFloat(item.Longitude),
          id: item?.ItemId?.Guid,
        };
      });
      this.$refs.GoogleMap.generateMarkers(newMarkers);
    },
    searchNear() {
      // INFO: reset filter option
      this.provinceValue = {};
      this.districtValue = {};
      this.listDistrict = [{
          id: this.defaultDistrictName,
          label: this.defaultDistrictName,
      }];
      this.dealershipValue = '';
      let resetListService = this.listServiceData.map(item => {
        return {
          ...item,
          isChecked: true
        };
      });
      this.listServiceData = JSON.parse(JSON.stringify(resetListService));
      this.chosenService = this.listServiceData.map(item => item.ID);
      // INFO: detect location, if allow to share position
      detectLocaltion().then(res => {
        let body = createSearchDealerBody({...this.getParamsSearchDealer(), pageSize : DEFAULT_SEARCH_NEAR_MAX_SIZE});
        this.isLoading = true;
        this.typePopup = 'waiting-popup';
        this.resultSubmitForm = '';
        this.$refs.isuPopup.showModal();
        // INFO: get data
        getSearchNearDealers(body).then((res) => {
          this.typePopup = 'successful-popup';
          this.isLoading = false;
          this.$refs.isuPopup.hideModal();
          let totalDealer = res.data?.Records?.DealerResultModel?.length || 0;
          // INFO: append data to table
          this.appendDataTable(body,res);
          // INFO: access total element to table
          this.$emit('get:listNearDealers', {
            total : totalDealer,
          });
          // INFO: display total number marker on map
          this.markerListLocation(res);
        });
      }).catch(() => {
        this.typePopup = 'failed-popup';
        this.resultSubmitForm = 'กรุณาเปิดบริการหาตำแหน่งที่ตั้ง';
        this.$refs.isuPopup.showModal();
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
$form-width: 40%;
$map-width: 100% - $form-width;
$padding-left-container-lg: calc((100% - 970px) / 2 + 15px);
$padding-left-container-xl: calc((100% - 1140px) / 2 + 1px);

select,
input[type='text'] {
  width: 100%;
  padding: 5px 10px;
  color: $gray-700;
}

button {
  outline: none;
}

input::placeholder {
  color: $gray-700;
}

.map-component {
  position: relative;
  font-size: $font-size-find-dealer-map-comp-small;
  margin-top: $distance-find-dealer-map-comp;

  @include media-breakpoint-up(lg) {
    margin-top: $distance-find-dealer-map-comp-lg;
  }

  >>> .paging {
    position: absolute;
    width: 100%;
  }

  @include media-breakpoint-down(md) {
    // margin-bottom: 60px;
  }

  &__head {
    text-align: center;
    margin-bottom: 30px;
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    background-color: #f2f1f0;

    &__form {
      width: 100%;
      padding: 20px 15px 20px;

      @include media-breakpoint-up(md) {
         padding: 30px 15px 30px;
      }

      @include media-breakpoint-up(lg) {
        width: $form-width;
        padding: 30px 30px 20px $padding-left-container-lg;
      }

      @include media-breakpoint-up(xl) {
        padding-left: $padding-left-container-xl;
      }

      @media screen and (min-width: 1400px) {
        padding-left: calc((100% - 1380px) / 2 + 1px);
        width: 35%;
      }
    }

    &__map {
      width: 100%;

      @include media-breakpoint-up(lg) {
        width: $map-width;
      }

      @media screen and (min-width: 1400px) {
        width: 65%;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      border-radius: 40px;
      font-size: 2.3rem;
      transition: all .2s ease-in-out;
      margin:0 auto 20px;
      cursor: pointer;
      width: fit-content;
      padding: 0px 25px;

      @include media-breakpoint-up(lg) {
        width: 100%;
        height: 43px;
        padding: 2px;
      }
    }

    @include ripple($primary-bgr);
  }

  .select-list,
  .filter-list {
    width: 100%;
    margin-bottom: 15px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 20px;
    }
  }

  .filter-list {
    & >>> .vs__dropdown-toggle {
      border: none;
      border-bottom: 1px solid #cdcdcd;
      background-color: $gray-100;
    }
  }

  .list-checkbox {
    position: relative;
    margin-bottom: 10px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 15px;
    }

    input {
      width: 10px;
      height: 10px;
      opacity: 0;

      @include media-breakpoint-up(lg) {
        width: 16px;
        height: 16px;
      }

      &:checked + .check-label:before {
        background: url('../../assets/check-icon.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 75%;
      }
    }

    .check-label {
      display: inline-block;
      margin-bottom: 0;
      margin-left: 6px;

      @include media-breakpoint-up(lg) {
        margin-left: 10px;
      }

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border: 1px solid #666;
        border-radius: 2px;
        background-color: #f3f3f3;

        @include media-breakpoint-up(lg) {
          width: 16px;
          height: 16px;
          border-radius: 3px;
        }
      }
    }
  }

  input[type='text'] {
    margin-bottom: 15px;
    border: 1px solid #cdcdcd;
  }

  .btn-submit {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0;

    @include media-breakpoint-up(lg) {
      margin: 30px 0 0 0;
    }

    .i-btn {
      @include media-breakpoint-up(lg) {
        padding: 10px 62px;
        font-size: $font-size-find-dealer-button-lg; // INFO: following font-size of current website
      }
    }

    @include ripple($primary-bgr);
  }

  .filter-list {
    border-bottom: 1px solid #b7b7b7;
    padding: 5px;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-find-dealer-map-comp;
    }
  }

  & >>> .vs__dropdown-toggle {
    border-radius: 0;
    border: 1px solid #cdcdcd;
    background-color: $white;
    padding: 2px 0 4px 0;

    @include media-breakpoint-up(lg) {
      padding: 1px 0;
    }
  }

  & >>> .vs__dropdown-menu {
    color: $gray-700;
  }

  & >>> .vs__clear {
    display: none;
  }

  .search-title {
    text-align: center;
    margin: 0;
    line-height: 38px;
    font-size: $font-size-mobile;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-find-dealer-map-comp;
    }

    &::before {
      content: '';
      display: inline-block;
      width: 15px;
      height: 21px;
      background: url('../../assets/icon-location-dealer.svg') center no-repeat;
      background-size: contain;
      margin-right: 6px;
      transform: translateY(6px);

      @include media-breakpoint-up(lg) {
        margin-right: 15px;
        width: 19px;
        height: 26px;
      }
    }
  }

  >>> .v-select {
    @include media-breakpoint-up(lg) {
      width: 100%;
    }
  }
}
</style>
