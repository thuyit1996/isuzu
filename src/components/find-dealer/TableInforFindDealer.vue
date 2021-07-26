<template>
  <div class="table-infor-find-dealer" :class="!isRecentDealer ? 'all-dealer' : ''"  role="tablist">
    <div class="container container-extra">
      <div class="table-infor-find-dealer__head">
        <div v-if="isRecentDealer" class="table-infor-find-dealer__head__wrap">
          <sc-text tag="h2" class="isu-title" :field="recentDealerTitle" />
        </div>
        <div
          class="table-infor-find-dealer__head__top"
          v-if="isShowTitleResponse()"
        >
          {{ titleResponse() }}
        </div>
        <div role="tab">
          <div v-b-toggle="'collapse-' + name" class="table-infor-find-dealer__head__body table-infor-border">
            <sc-text
              tag="div"
              class="sub-title-head list-dealers"
              :field="fields.DealerNameHeaderTitle"
            />
            <sc-text
              tag="div"
              class="sub-title-head provices"
              :field="fields.ProvinceNameHeaderTitle"
            />
            <div class="sub-title-head showroom">{{listServiceName && listServiceName.length && listServiceName[0].Name}}</div>
            <div class="sub-title-head service-center">
              <span>{{listServiceName && listServiceName.length && listServiceName[1] && listServiceName[1].Name}}</span>
              <div class="type-service-center">
                <sc-text tag="div" class="type-service-center__all" :field="fields.AllIsuzuVehicleLabel" />
                <sc-text tag="div" class="type-service-center__only" :field="fields.OnlyPickupAndPPVLabel" />
              </div>
            </div>
            <div class="sub-title-head paint-body-repair">
              {{listServiceName && listServiceName.length && listServiceName[2] && listServiceName[2].Name}}
            </div>
            <div class="sub-title-head distance"></div>
            <div class="sub-title-head arrow">
              <img src="../../assets/arrow-up.png" alt="x" />
            </div>
          </div>
        </div>
      </div>
      <b-collapse visible role="tabpanel" :id="'collapse-'+ name">
        <div role="tab" :ref="'table-dealer-item-'+item.ItemID" :key="item.ItemID" v-for="(item, index) in listDealerClone">
          <div
            v-b-toggle="'collapse-' + name + '-' +(index + 1)"
            class="table-infor-find-dealer__body table-infor-border"
            @click="dealerItemClick(item)"
          >
            <div class="sub-title-head list-dealers">{{item.DealerName}}</div>
            <div class="sub-title-head provices">{{item.ProvinceName}}</div>
            <div class="sub-title-head showroom">
              <img v-if="item.HaveShowRoom" src="../../assets/icon-checked.png"  alt="x" />
              <img v-else src="../../assets/icon-uncheck.png"  alt="x" />
            </div>
            <div class="sub-title-head service-center">
              <div class="data-service-center">
                <div class="data-service-center__all">
                  <img v-if="item.ServiceDealer && item.ServiceDealer.AllIsuzuVehicle" src="../../assets/icon-checked.png"  alt="x" />
                  <img v-else src="../../assets/icon-uncheck.png"  alt="x" />
                </div>
                <div class="data-service-center__only">
                  <img v-if="item.ServiceDealer && item.ServiceDealer.OnlyPickupAndPpv" src="../../assets/icon-checked.png"  alt="x" />
                  <img v-else src="../../assets/icon-uncheck.png"  alt="x" />
                </div>
              </div>
            </div>
            <div class="sub-title-head paint-body-repair">
              <img v-if="item.PaintAndBodyDealer && item.PaintAndBodyDealer.BodyRepairAndPaint" src="../../assets/icon-checked.png"  alt="x" />
              <img v-else src="../../assets/icon-uncheck.png"  alt="x" />
            </div>
            <div class="sub-title-head distance">
              <template v-if="locationSharedStatus">
                <img src="../../assets/distance-icon.png" alt="x" />
                <span>{{ item.Distance | getDistance}} km</span>
              </template>
              <template v-else>-</template>
            </div>
            <div class="sub-title-head arrow">
              <img src="../../assets/arrow-down-collapse.png" alt="x" />
            </div>
          </div>
          <b-collapse  accordion="recent-dealer-accordion"  role="tabpanel" v-bind:id="'collapse-' + name + '-' +(index + 1)" v-if="tableType" @hidden="()=> onCollapseHidden(index)" @show="() => onCollapseShow(index, item)">
            <dealer-information @open:imageMap="openImageMap" :index="index" :fields="fields" :name="name" :item="item"></dealer-information>
          </b-collapse>
          <b-collapse  :visible="item.isOpenCollapse"  role="tabpanel" v-bind:id="'collapse-' + name + '-' +(index + 1)" @hidden="()=> onCollapseHidden(index)" @show="() => onCollapseShow(index, item)" v-else >
            <dealer-information @open:imageMap="openImageMap" :index="index" :fields="fields" :name="name" :item="item"></dealer-information>
          </b-collapse>
        </div>
      </b-collapse>
    </div>
    <isu-popup ref="imageMapModal" :picturePopup="true">
      <div class="image-detail">
        <img v-if="imageMap" :src="imageMap" alt="image detail" />
        <p v-else>There is no image Map</p>
      </div>
    </isu-popup>
    <isu-popup ref="markerModal" :picturePopup="false">
      <dealer-information v-if="popupDealer" @open:imageMap="openImageMap" :index="'0'" :fields="fields" :name="'popup'" :item="popupDealer"></dealer-information>
      <p v-else>There are problem on finding dealer</p>
    </isu-popup>
    <Paging v-if="!isRecentDealer" ref="paging" @changePage="changePage" :pagingIndex="pagingIndex" :total="total" :size="pagingSize"></Paging>
  </div>
</template>

<script>
import IsuPopup from '../shared/IsuPopup';
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import DealerInformation from './DealerInformation';
import { mapGetters } from "vuex";
import { GetEndPoint } from '../../service/genericService';
import { saveDealerToStorage } from './service/dealerStorageService'
import { mapService } from './service/mapService';
import Paging from '../campaign/Paging';
import { getDealerById } from '../../service/dealerService';
import * as $ from 'jquery';

export default {
  name: 'TableInforFindDealer',
  extends : mapService,
  components: {
    ScText: Text,
    IsuPopup: IsuPopup,
    DealerInformation: DealerInformation,
    Paging : Paging,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    listDealer: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    isRecentDealer: {
      type: Boolean,
      default: false,
    },
    locationSharedStatus: false,
    // INFO: this is to separate with recent dealer
    tableType : {
      type : String,
    },
    totalDealers: 0,
    searchBody : {
      type : Object,
    },
    isResetPaging : {
      type : Boolean,
    },
    listServices: Array,
  },
  data() {
    return {
      listDealerClone: [],
      imageMap: '',
      popupDealer: undefined,
      recentDealerTitle: {},
      pagingSize : this.$getConst('FIND_DEALER_PAGING_SIZE'),
      pagingIndex: 0,
      total: this.totalDealers,
      markerIcon : {},
      listServiceName: [],
      isLoading : false,
    };
  },
  mounted() {
    this.isFirstLoad = true;
    this.markerIcon = this.$jss.routeData().fields.IsuzuMapIcon;
    if (!this.isRecentDealer) {
      this.$nextTick(() => {
        this.$refs.paging.updatePaging();
      });
    }
    this.$root.$on('open:markerDialog', (dealerId) => {
      if (!this.isRecentDealer) {
        getDealerById(dealerId).then(res => {
          if(res.data.records){
            this.popupDealer = res.data.records;
            this.$refs.markerModal.showModal();
            // INFO: cannot use $nextTick here because there are many nested $refs
            // TODO: need better way for this
            setTimeout(() => {
              mapService.methods.initMap.call(this,`map-popup-01`, this.popupDealer,this.markerIcon);
            }, 100);
          }
        });
      }
    });
    this.$root.$on('lastSearchDealerTitle', (title) => {
      this.recentDealerTitle = title;
    });
  },
  filters: {
    getDistance: function(value) {
      return Number(value).toFixed(2);
    },
  },
  methods: {
    // INFO: use bootstrap @show instead of @shown to bring back better UX
    onCollapseShow(collapseIdx, item) {
      this.scrollTopItemDealer(item.ItemID);
      mapService.methods.initMap.call(this,`map-${this.name}-${collapseIdx + 1}`, item, this.markerIcon);
    },
    onCollapseHidden(collapseIdx) {
      mapService.methods.clearMap.call(this, `map-${this.name}-${collapseIdx + 1}`);
    },
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },

    generateListDealerClone(originList) {
      this.listDealerClone = originList.map((item) => {
        return {
          ...item,
          isOpenCollapse : false,
        };
      });
    },

    openImageMap(imageMap) {
      this.imageMap = imageMap;
      this.$refs.imageMapModal.showModal();
    },

    dealerItemClick(dealer) {
      this.clickToCollapse(dealer);
      if(!this.isRecentDealer){
        saveDealerToStorage(dealer);
        this.$emit("add:RecentDealer");
      }
    },

    clickToCollapse(item){
      if(!this.tableType){
        this.listDealerClone.forEach(dealer => {
          if(dealer.ItemID === item.ItemID){
            dealer.isOpenCollapse = !dealer.isOpenCollapse;
          }else{
            dealer.isOpenCollapse = false;
          }
        })
      }
    },
    changePage(param) {
      this.pagingIndex = param;
      this.$root.$emit('changePageDealer',this.pagingIndex);
      this.$nextTick(() => {
        this.$refs.paging.updatePaging();
      });
    },
    scrollTop() {
      const topTable = $('.all-dealer .table-infor-find-dealer__head').offset().top - 50;
      $('body, html').animate({ scrollTop: topTable }, 100);
    },
    isShowTitleResponse(){
      return this.listDealerClone?.length && !this.isRecentDealer;
    },
    titleResponse(){
      let total = this.total;
      let resultTitle = this.fields?.ResultTitle?.value || '';
      let provinceName = this.searchBody?.provinceName || '';
      let districtName = this.searchBody?.districtName || '';
      let resultForTitle = this.fields?.ResultForTitle?.value || '';
      let dealerName = this.searchBody?.dealerName || '';
      let response = dealerName ? (resultForTitle + ' ' + dealerName) : '';
      return total + ' ' + resultTitle + ' ' + provinceName + ' - ' + districtName + ' ' + response
    },
    scrollTopItemDealer(id){
      setTimeout(() => {
        let target = this.$refs[`table-dealer-item-${id}`];
        let topPixel = $(target).offset().top - 50;
        window.scroll({ top: topPixel, behavior: 'smooth' });
      },500);
    }
  },
  watch: {
    totalDealers(newValue) {
      this.total = newValue;
      this.$nextTick(() => {
        this.$refs.paging.updatePaging();
      });
    },
    listDealer(val) {
      if(!this.isRecentDealer && !this.isFirstLoad){
        this.scrollTop();
      }
      this.isFirstLoad = false;
      this.generateListDealerClone(val);
    },
    isResetPaging (val){
      if(val){
        this.pagingIndex = 0;
        this.$nextTick(() => {
          this.$refs.paging.updatePaging();
        });
      }
    },
    listServices(val) {
      this.listServiceName = val;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.table-infor-border {
  border: 1px solid #b7b7b7;
  border-top: none;
}

.check-show {
  display: block;
}

.check-hidden {
  display: none;
}

.table-infor-find-dealer {
  margin-top: $distance-find-dealer-table-info;

  @include media-breakpoint-up(lg) {
    margin-top: $distance-find-dealer-table-info-lg;
  }

  &__head {
    color: $white;

    &__wrap {
      margin: 0 auto 30px;
      text-align: center;

      .isu-title {
        color: $black;
      }
    }

    &__top {
      background-color: #a8a8a8;
      line-height: 1.8rem;
      padding: 10px 6px;
      border: 1px solid #b7b7b7;
      text-align: left;
      font-size: $font-size-comparison-small;

      @include media-breakpoint-up(lg) {
        line-height: 2.4rem;
        padding: 20px;
        font-size: $font-size-base;
      }
    }

    &__body {
      background-color: $gray-500;
      display: flex;
      line-height: 1.7rem;

      @include media-breakpoint-up(lg) {
        line-height: 2.4rem;
      }

      &.collapsed {
        .arrow img {
          transform: rotate(180deg);
        }
      }

      .list-dealers {
        padding: 0 20px;
      }
    }

    .table-infor-find-dealer__head__body {
      .list-dealers {
        border-left: none;
        font-size: $font-size-find-dealer-list-dealer;
        line-height: 1.7rem;  //INFO : LINE HEIGH follow design

        @include media-breakpoint-up(lg) {
          line-height: 2.4rem;  //INFO : LINE HEIGH follow design
        }
      }

      .distance {
        border-left: none;

        @include media-breakpoint-up(lg) {
          border-left: 1px solid #b7b7b7;
        }
      }

      .arrow {
        border-left: none;

        @include media-breakpoint-up(lg) {
          border-left: 1px solid #b7b7b7;
        }
      }
    }
  }

  &__body {
    display: flex;
    cursor: pointer;
    font-size: $font-size-find-dealer-list-dealer;

    .arrow {
      img {
        transform: rotate(180deg);
        transition: all 0.3s ease;
      }
    }

    &.collapsed {
      .arrow {
        img {
          transform: rotate(0deg);
        }
      }
    }
  }

  .sub-title-head {
    flex: auto;
    border-left: 1px solid #b7b7b7;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 12px;
    width: 100%;

    @include media-breakpoint-up(xs) {
      padding: 5px 15px;
    }

    @include media-breakpoint-up(md) {
      padding: 10px 0;
    }

    @include media-breakpoint-up(lg) {
      padding: 12px 0;
    }

    @media screen and (min-width: 1400px) {
      padding: 8px 0;
    }

    &:first-of-type {
      border-left: none;
    }
  }

  .table-infor-border {
    .list-dealers {
      width: 68%;
      justify-content: left;
      font-size: $font-size-find-dealer-list-dealer;
      padding: 10px 5px;

      @include media-breakpoint-up(xs) {
        width: 72%;
      }

      @include media-breakpoint-up(lg) {
        justify-content: center;
        text-align: center;
        width: 100%;
        max-width: 250px;
      }

      @media screen and (min-width: 1400px) {
        max-width: 525px;
      }
    }

    .provices {
      display: none;

      @include media-breakpoint-up(lg) {
        max-width: 135px;
        display: flex;
      }

      @media screen and (min-width: 1400px) {
        max-width: 180px;
      }
    }

    .showroom {
      display: none;

      @include media-breakpoint-up(lg) {
        display: flex;
        max-width: 100px;
      }

      @media screen and (min-width: 1400px) {
        max-width: 90px;
      }
    }

    .service-center {
      flex-direction: column;
      display: none;
      padding: 0;

      @include media-breakpoint-up(lg) {
        display: flex;
        max-width: 200px;
      }

      @media screen and (min-width: 1400px) {
        max-width: 240px;
      }

      span {
        padding: 18px 0;
      }
    }

    .paint-body-repair {
      display: none;

      @include media-breakpoint-up(lg) {
        display: flex;
        max-width: 100px;
        justify-content: center;
        text-align: center;
      }

      @media screen and (min-width: 1400px) {
        max-width: 120px;
      }
    }

    .distance {
      width: 16%;
      flex-direction: column;
      text-align: center;

      @include media-breakpoint-up(lg) {
        width: 100%;
        max-width: 100px;
      }

      @media screen and (min-width: 1400px) {
        max-width: 145px;
      }
    }

    .arrow {
      width: 11%;

      @include media-breakpoint-up(xs) {
        width: 12%;
      }

      @include media-breakpoint-up(lg) {
        width: 100%;
        max-width: 75px;
      }

      @include media-breakpoint-up(xl) {
        max-width: 80px;
      }

      img {
        transition: all 0.3s ease;
      }
    }
  }

  .type-service-center {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #b7b7b7;
    width: 100%;
    justify-content: center;
    font-size: $font-size-find-dealer-data-info;
    line-height: 1.6rem;  //INFO : LINE HEIGH follow design
    text-align: center;

    &__all {
      padding: 8px 14px;
      width: 50%;
    }

    &__only {
      border-left: 1px solid #b7b7b7;
      padding: 8px 14px;
      width: 50%;
    }
  }

  .data-service-center {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    justify-content: center;

    &__all {
      padding: 8px 14px;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__only {
      border-left: 1px solid #b7b7b7;
      padding: 8px 14px;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .arrow {
    cursor: pointer;
  }
}

</style>
