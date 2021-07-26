<template>
  <div class="company-information">
    <div class="row">
      <div class="col-md-6">
        <div class="company-information__data">
          <h3 class="company-information__data__name">{{item.DealerName}}</h3>
          <div class="company-information__data__address">{{item.Address}}</div>
          <!-- <div
            class="company-information__data__tableInfo"
            :key="service.ID"
            v-for="(service, index) in item.Services"
          >
            <template v-if="service.IsShowInfor">
              <div class="tableInfo-head">
                <div class="tableInfo-head__name">{{service.Title}}</div>
                <a class="tableInfo-head__call" :href="'tel:' + service.PhoneNumber">
                  <sc-text
                    tag="span"

                    :field="fields.PhoneCallTitle"
                  />
                </a>

              </div>
              <div class="tableInfo-body">
                <div class="tableInfo-body__phone">
                  <div class="row">
                    <div class="col-4">Phone</div>
                    <div class="col-8">{{service.PhoneNumber}}</div>
                  </div>
                </div>
                <div class="tableInfo-body__email">
                  <div class="row">
                    <div class="col-4">Email</div>
                    <div class="col-8">
                      <a :href="'mailto:' + service.Email" target="_top">{{service.Email}}</a>
                    </div>
                  </div>
                </div>
                <div class="tableInfo-body__opening-hours" v-html="service.OpeningHours"></div>
                <div class="tableInfo-body__available" v-html="service.Description"></div>
              </div>
            </template>

          </div> -->
          <!-- Bind ShowRoom Dealer info -->
          <div class="company-information__data__tableInfo" v-if="item.ShowroomDealer && item.ShowroomDealer.DealerPageShowShowroomInfo">
            <div class="tableInfo-head">
              <!-- TODO: missing field -->
              <!-- <div class="tableInfo-head__name">ข้อมูลโชว์รูม</div> -->
              <sc-text tag="div" class="tableInfo-head__name" :field="fields.ShowRoomTitleLabel" />
              <a class="tableInfo-head__call" :href="'tel:' + checkPhone(item.ShowroomDealer.ShowroomCallCenter)" v-if="item.ShowroomDealer.ShowroomCallCenter">
                <!-- TODO: missing field from BE -->
                <!-- <sc-text
                  tag="span"
                  :field="null"
                /> -->
                <sc-text tag="span" :field="fields.PhoneCallTitle" />
              </a>
            </div>
            <div class="tableInfo-body">
              <div class="tableInfo-body__address" v-if="item.ServiceDealer.ServiceCenterAddress && item.ServiceDealer.ServiceCenterAddress != 'same'">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.AddressLabel" /> :</div>
                  <div class="col-8">
                    {{item.Address}}
                  </div>
                </div>
              </div>
              <div class="tableInfo-body__phone" v-if="item.ShowroomDealer.PhoneNumber">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.PhoneTitleLabel" /> :</div>
                  <div class="col-8">{{item.ShowroomDealer.PhoneNumber}}</div>
                </div>
              </div>
              <div class="tableInfo-body__opening_hours">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.WorkingDayAndTimeLabel" /> :</div>
                  <div class="col-8">
                    <div class="row" v-if="item.ShowroomDealer.HourMonToFri">
                      <!-- TODO: add data for this -->
                      <!-- <div class="col-6">วันจันทร์ – วันศุก</div> -->
                      <sc-text tag="div" class="col-6" :field="fields.MondayToFridayLabel" />
                      <div class="col-6" >{{item.ShowroomDealer.HourMonToFri}}</div>
                    </div>
                    <div class="row" v-if="item.ShowroomDealer.HourSat">
                      <!-- TODO: add data for this -->
                      <!-- <div class="col-6">วันเสาร์</div> -->
                      <sc-text tag="div" class="col-6" :field="fields.SaturdayLabel" />
                      <div class="col-6" >{{item.ShowroomDealer.HourSat}}</div>
                    </div>
                    <div class="row" v-if="item.ShowroomDealer.HourSun">
                      <!-- TODO: add data for this -->
                      <!-- <div class="col-6">วันอาทิตย์</div> -->
                      <sc-text tag="div" class="col-6" :field="fields.SundayLabel" />
                      <div class="col-6" >{{item.ShowroomDealer.HourSun}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tableInfo-body__ppv_and_sale">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.DisposeLabel" /> :</div>
                  <div class="col-8">
                    <ul>
                      <sc-text tag="li" v-if="item.ShowroomDealer.PickupAndPpvSale" :field="fields.PickupAndPpvSaleLabel" />
                      <sc-text tag="li" v-if="item.ShowroomDealer.TruckSale" :field="fields.IsuzuTruckLabel" />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Bind Service Info -->
          <div class="company-information__data__tableInfo" v-if="item.ServiceDealer && item.ServiceDealer.DealerPageShowServiceCenterInfo">
            <div class="tableInfo-head">
              <!-- TODO: missing field -->
              <!-- <div class="tableInfo-head__name">ข้อมูลศูนย์บริการ</div> -->
              <sc-text tag="div" class="tableInfo-head__name" :field="fields.ServiceCenterInformationLabel" />
              <a class="tableInfo-head__call" :href="'tel:' + checkPhone(item.ServiceDealer.ServiceCenterCallCenter)" v-if="item.ServiceDealer.ServiceCenterCallCenter">
                <!-- TODO: missing field from BE -->
                <!-- <sc-text
                  tag="span"
                  :field="null"
                /> -->
                <sc-text tag="span" :field="fields.PhoneCallTitle" />
              </a>
            </div>
            <div class="tableInfo-body">
              <div class="tableInfo-body__address" v-if="item.ServiceDealer.ServiceCenterAddress && item.ServiceDealer.ServiceCenterAddress != 'same'">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.AddressLabel" /> :</div>
                  <div class="col-8">
                    {{item.ServiceDealer.ServiceCenterAddress}}
                  </div>
                </div>
              </div>
              <div class="tableInfo-body__phone" v-if="item.ServiceDealer.PhoneNumber">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.PhoneTitleLabel" /> :</div>
                  <div class="col-8">{{item.ServiceDealer.PhoneNumber}}</div>
                </div>
              </div>
              <div class="tableInfo-body__appointment">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.ServiceCenterAppointmentLabel" /> :</div>
                  <div class="col-8">
                    <div>{{item.ServiceDealer.ServiceCenterAppointment}}</div>
                    <div>{{item.ServiceDealer.ServiceCenterAppointment2}}</div>
                  </div>
                </div>
              </div>
              <div class="tableInfo-body__opening_hours">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.WorkingDayAndTimeLabel" /> :</div>
                  <div class="col-8">
                    <div class="row" v-if="item.ServiceDealer.HourMonToFri">
                      <!-- TODO: add data for this -->
                      <!-- <div class="col-6">วันจันทร์ – วันศุก</div> -->
                      <sc-text tag="div" class="col-6" :field="fields.MondayToFridayLabel" />
                      <div class="col-6" >{{item.ServiceDealer.HourMonToFri}}</div>
                    </div>
                    <div class="row" v-if="item.ServiceDealer.HourSat">
                      <!-- TODO: add data for this -->
                      <!-- <div class="col-6">วันเสาร์</div> -->
                      <sc-text tag="div" class="col-6" :field="fields.SaturdayLabel" />
                      <div class="col-6" >{{item.ServiceDealer.HourSat}}</div>
                    </div>
                    <div class="row" v-if="item.ServiceDealer.HourSun">
                      <!-- TODO: add data for this -->
                      <!-- <div class="col-6">วันอาทิตย์</div> -->
                      <sc-text tag="div" class="col-6" :field="fields.SundayLabel" />
                      <div class="col-6" >{{item.ServiceDealer.HourSun}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="tableInfo-body__opening-hours" v-if="item.ServiceDealer.OpeningHours" v-html="item.ServiceDealer.OpeningHours"></div> -->
              <div class="tableInfo-body__service">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.ServiceLabel" /> :</div>
                  <div class="col-8">
                    <ul>
                      <li v-if="item.ServiceDealer.AllIsuzuVehicle"><sc-text tag="span" :field="fields.AllIsuzuVehicleLabel" /></li>
                      <li v-if="item.ServiceDealer.OnlyPickupAndPpv"><sc-text tag="span" :field="fields.OnlyPickupAndPPVLabel" /></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="tableInfo-body__service">
                <div class="row">
                  <div class="col-4"><sc-text tag="span" :field="fields.SpecicalServiceLabel" /> :</div>
                  <div class="col-8">
                    <sc-text tag="div" :field="fields.PickupTrucksAndMultiPurposeVehiclesLabel" />
                    <ul>
                      <li v-show="item.PaintAndBodyDealer && item.PaintAndBodyDealer.BodyRepairAndPaint"><sc-text tag="span" :field="fields.ReparingPaintAndBodyLabel" /></li>
                      <li v-show="item.PaintAndBodyDealer && item.PaintAndBodyDealer.CheckAndChangeTire"><sc-text tag="span" :field="fields.TireCheckingAndChangingServiceLabel" /></li>
                      <li v-show="item.PaintAndBodyDealer && item.PaintAndBodyDealer.IsuzuAirWash"><sc-text tag="span" :field="fields.IsuzuAirWashServiceLabel" /></li>
                      <li v-show="item.PaintAndBodyDealer && item.PaintAndBodyDealer.ExpressCheckup"><sc-text tag="span" :field="fields.ExpressCheckupLabel" /></li>
                      <li v-show="item.PaintAndBodyDealer && item.PaintAndBodyDealer.PremiumCarWash"><sc-text tag="span" :field="fields.PremiumCarWashServiceLabel" /></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="company-information__map">
          <!-- TODO: make sub map element here -->
          <div class="map" v-bind:id="'map-'+ name + '-' +(index + 1)"></div>
          <div class="list-app">
            <div class="row">
              <div class="col-4 group-app group-app--map">
                <a target="_blank" :href="calculateGoogleMapLink(item.Latitude, item.Longitude, item.DealerName)" class="group-app__link">
                  <sc-image class="group-app__icon" alt="x" :media="fields.GoogleMapIcon" />
                  <sc-text
                    tag="div"
                    class="group-app__name"
                    :field="fields.GoogleMapTitle"
                  />
                </a>

              </div>
              <div class="col-4 group-app group-app--graphic-map" @click="openImageMap(item.ImageMap)" v-if="item.ImageMap">
                <sc-image class="group-app__icon" alt="x" :media="fields.GraphicMapIcon" />
                <sc-text
                  tag="div"
                  class="group-app__name"
                  :field="fields.GraphicMapTitle"
                />
              </div>
              <div class="col-4 group-app group-app--test-drive" v-if="item.DealerPageShowTestdrive">
                <sc-link class="group-app__link" @click="savePlaceToStore(item)" :field="fields.TestDriveLink">
                  <sc-image class="group-app__icon" alt="x" :media="fields.TestDriveIcon" />
                  <sc-text
                    tag="div"
                    class="group-app__name"
                    :field="fields.TestDriveTitle"
                  />
                </sc-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import { mapActions } from 'vuex';

export default {
  name: 'DealerInformation',
  components: {
    ScLink: Link,
    ScImage: Image,
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    item: {
      DealerName: '',
      Address: '',
      Services: [],
    },
    name: '',
    index: '',
  },
  methods: {
    ...mapActions('dealers', ['updateTestDriveCurrentProvince']),
    ...mapActions('dealers', ['updateTestDriveCurrentDistrict']),
    ...mapActions('dealers', ['updateTestDriveCurrentDealer']),
    calculateGoogleMapLink(lat, long, name) {
      return 'https://www.google.com/maps/search/' + name + '/' + lat + ',' + long;
    },
    openImageMap(imageMap) {
      this.$emit('open:imageMap', imageMap);
    },
    savePlaceToStore(item){
      this.updateTestDriveCurrentProvince({
        id : item.ProvinceId,
        label : item.ProvinceName,
      });
      this.updateTestDriveCurrentDistrict({
        id : item.DistrictId,
        label : item.DistrictName,
      });
      this.updateTestDriveCurrentDealer({
        id: item.ItemID,
        label : item.DealerName,
        DealerId : item.DealerId,
      })
    },
    checkPhone(phone) {
      return phone.toString().charAt(0) == '0' ? phone.toString() : `0${phone}`;
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

@include ul-style();
.map {
  height: 300px;
  width: 100%;
  border: 1px solid #d8dde6;

  @include media-breakpoint-up(md) {
    height: 350px;
  }

  @include media-breakpoint-up(lg) {
    height: 385px;
  }
}

.row {
  @include media-breakpoint-up(md) {
    margin: 0 -10px;
  }
}

.company-information {
  background-color: #f8f8f8;
  border-bottom: 1px solid #b7b7b7;
  padding: 22px 0 10px 0;

  @include media-breakpoint-up(lg) {
    padding: 25px 0;
  }

  &__data {
    font-size: $font-size-find-dealer-small;
    padding-left: 15px;
    padding-right: 15px;

    @include media-breakpoint-up(md) {
      padding: 0;
    }

    @include media-breakpoint-up(lg) {
      font-size: $font-size-find-dealer-data-info;
      line-height: 2.4rem; //INFO : LINE HEIGH follow design
      padding-left: 20px;
      padding-right: 0;
    }

    &__name {
      font-size: $font-size-find-dealer-data-name-small;
      // line-height: 1.2rem;  //INFO : LINE HEIGH follow design
      font-weight: $font-weight-bold;

      @include media-breakpoint-up(md) {
        font-size: $font-size-find-dealer-data-name-md; 
        // line-height: 1.8rem; //INFO : LINE HEIGH follow design
      }

      @include media-breakpoint-up(lg) {
        font-size: $font-size-find-dealer-data-name-lg; 
        // line-height: 2.4rem; //INFO : LINE HEIGH follow design
      }
    }

    &__address {
      margin-bottom: 26px;
      color: #717171; // INFO: Follow color of current site
      font-size: $font-size-find-dealer-small;
      // line-height: 1.2rem;  //INFO : LINE HEIGH follow design

      @include media-breakpoint-up(lg) {
        font-size: $font-size-find-dealer-data-address-lg;
        // line-height: 2.4rem;  //INFO : LINE HEIGH follow design
      }
    }
  }

  &__map {
    padding: 0;
    
    @include media-breakpoint-up(lg) {
      padding: 0 20px 0 0;
    }
  }
}

.tableInfo-head {
  padding: 10px 15px 10px 0;
  border-top: 1px solid #b7b7b7;
  border-bottom: 1px solid #b7b7b7;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include media-breakpoint-up(lg) {
    padding: 15px 15px 15px 0;
  }

  &__name {
    line-height: 24px;   //INFO : LINE HEIGH follow design
    font-size: $font-size-find-dealer-data-name;
    font-weight: $font-weight-bold;
  }

  &__call {
    position: relative;
    padding-right: 25px;
    font-size: $font-size-find-dealer-small;
    color: $body-color;
    transition: color 0.25s ease-in;

    &:hover {
      @include media-breakpoint-up(lg) {
        color: $red-hover-color;
      }
    }

    &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 18px;
      height: 18px;
      top: 2px;
      background-image: url('../../assets/phone-icon.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      @include media-breakpoint-up(lg) {
        top: 0;
      }
    }

    @include media-breakpoint-up(lg) {
      padding-right: 32px;
      font-size: $font-size-find-dealer-data-info;

      &::after {
        width: 24px;
        height: 24px;
      }
    }
  }
}

.tableInfo-body {
  padding: 15px 0 20px 0;

  // INFO: TODO: is there any better way, need to add custom gutter class

  @include media-breakpoint-down(sm) {
    .row {
      margin-right: -4px;
      margin-left: -4px;
    }

    [class^='col-'] {
      padding-right: 4px;
      padding-left: 4px;
    }
  }

  &__email {
    a {
      color: $black;
      text-decoration: none;
    }
  }
}

.list-app {
  padding-bottom: 15px;
  text-align: center;

  @include media-breakpoint-up(lg) {
    padding: 15px 0;
  }
}

.group-app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 0;
  padding-left: 0;

  // INFO: change padding for col, but row still have negative margin
  @include media-breakpoint-up(md) {
    padding-right: 15px;
    padding-left: 15px;
  }

  &:hover {
    @include media-breakpoint-up(lg) {
      .group-app__name {
        color: $red-hover-color;
      }
    }
  }

  &__link {
    text-align: center;
    color: $body-color;
  }

  &__icon {
    width: 45px;

    @include media-breakpoint-up(md) {
      width: 55px;
    }

    @include media-breakpoint-up(lg) {
      width: 70px;
    }
  }

  &__name {
    margin-top: 8px;
    font-size: $font-size-find-dealer-small;
    line-height: 1.2rem;  //INFO : LINE HEIGH follow design
    transition: color 0.25s ease-in;

    @include media-breakpoint-up(lg) {
      margin-top: 15px;
      line-height: 2.4rem;  //INFO : LINE HEIGH follow design
    }
  }

  &--graphic-map {
    cursor: pointer;
  }
}
</style>