<template>
  <div>
    <waiting-icon-find-dealer v-if="false" :fields="fields"></waiting-icon-find-dealer>
    <map-find-dealer :fields="fields" @get:listDealers="getListDealers" @get:listNearDealers="getListNearDealers" @update:locationSharedStatus="updateLocationSharedStatus" :listServices="listServices"></map-find-dealer>
    <table-infor-find-dealer :name="'search-result'" :totalDealers="totalDealers" :listDealer="listDealer" :fields="fields" :locationSharedStatus="isLocationShared" :searchBody="searchBody" :isResetPaging="isResetPaging" :listServices="listServices" @add:RecentDealer="addRecentDealer"></table-infor-find-dealer>
    <table-infor-find-dealer :isRecentDealer="true" :name="'recent-result'" :listDealer="localDealer" :fields="fields" :locationSharedStatus="isLocationShared" :tableType="'recent-dealer'" :listServices="listServices"></table-infor-find-dealer>
  </div>
</template>

<script>
import MapFindDealer from './MapFindDealer';
import TableInforFindDealer from './TableInforFindDealer';
import WaitingIconFindDealer from './WaitingIconFindDealer';
import { localStorageService, STORAGE_LAST_SEARCH_DEALER } from '../../service/LocalStorage';
import { getServices } from '../../service/dealerService.js';

export default {
  name: 'DealerFinder',
  components: {
    MapFindDealer: MapFindDealer,
    TableInforFindDealer: TableInforFindDealer,
    WaitingIconFindDealer: WaitingIconFindDealer,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      listDealer: [],
      localDealer: [],
      isLocationShared: false,
      totalDealers: 0,
      searchBody : {},
      isResetPaging: false,
      listServices: [],
    }
  },
  mounted() {
    this.getDealerOnLocalStorage();
    getServices().then((res) => {
      this.listServices = res?.data?.Services || [];
    });
  },

  methods: {
    getListDealers({data,total,body,isResetPaging}) {
      this.listDealer = data;
      this.totalDealers = total;
      this.searchBody = body;
      this.isResetPaging = isResetPaging;
    },
    getListNearDealers({total}){
      this.totalDealers = total;
    },
    addRecentDealer(){
      this.getDealerOnLocalStorage();
    },
    getDealerOnLocalStorage() {
      let lastSearchDealer = localStorageService.getByKey(STORAGE_LAST_SEARCH_DEALER);
      if (lastSearchDealer && typeof lastSearchDealer != 'undefined') {
        this.localDealer = JSON.parse(lastSearchDealer);
      } else {
        this.localDealer = [];
      }
    },
    updateLocationSharedStatus(status) {
      this.isLocationShared = status;
    },
  },
};
</script>
