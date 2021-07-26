<template>
  <div class="choose-car-type">
    <div class="container">
      <div class="choose-car-type__heading text-center">
        <sc-text tag="h2" class="choose-car-type__heading__title isu-title" :field="stepModel.Steps[0].fields.Title" />
      </div>
      <b-tabs class="choose-car-type__tabs">
        <b-tab :active="tab === index" class="choose-car-type__tabs__item" :key="type.Id" v-for="(type, index) in carTypes">
          <template slot="title">
            <!-- <img src="../../assets/pickup-truck-icon.svg" alt="image-icon" class="choose-car-type__tabs__item__icon icon-nomal"> -->
            <img :src="imageEndPoint(type.DeactiveIcon)" alt="image-icon" class="choose-car-type__tabs__item__icon icon-nomal">
            <!-- <img src="../../assets/icon-choose-type-car-red-1.svg" alt="image-icon" class="choose-car-type__tabs__item__icon icon-active"> -->
            <img :src="imageEndPoint(type.ActiveIcon)" alt="image-icon" class="choose-car-type__tabs__item__icon icon-active">
            <span class="choose-car-type__tabs__item__title">{{type.Title}}</span>
          </template>
          <div class="choose-car-type__tabs__content">
            <div class="row">
              <request-quotation-step-1-item
              v-for="item in type.CarModels"
              :key="item.id"
              :carType="item"
              :carTypeIndex="selectedIndex"
              @chooseCarType="(carModel) => selectPickupTruck(carModel, type.Title, type.CarTypeId, index)"/>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import RequestQuotationStep1Item from './RequestQuotationStep1Item';
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { getCarType } from '../../../service/requestQuotationService.js';
import { GetEndPoint } from '../../../service/genericService';

export default {
  name: 'RequestQuotationStep1',
  components: {
    RequestQuotationStep1Item: RequestQuotationStep1Item,
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carModel: {},
    tab: 0,
    stepModel: Object,
  },
  data() {
    return {
      selectedIndex: this.carModel.Id,
      carTypes: [],
    };
  },
  mounted() {
    this.$emit('update:loadingStatus', true);
    getCarType().then((data) => {
      this.$emit('update:loadingStatus', false);
      this.carTypes = data.data.Records;
    });
  },
  methods: {
    selectPickupTruck(model, type, id , tabIdx) {
      this.$emit('update:carmodel', {
        carType: type,
        carModel: {...model,carModelId : id},
        currentTab: tabIdx,
      });
      this.selectedIndex = model.Id;
    },
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
  },
  watch: {
    'carModel.Id'(modelId) {
      this.selectedIndex = modelId;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';

.choose-car-type {
  background: #f5f5f5;
  padding: 90px 0 25px;

  @include media-breakpoint-up(xs) {
    padding-bottom: 28px;
  }

  @include media-breakpoint-up(lg) {
    padding: 160px 0 80px;
  }

  .row {
    margin: 0;
    @include media-breakpoint-up(lg) {
      margin: 0 -15px;
    }
  }

  &__heading {
    padding-bottom: 55px;

    @include media-breakpoint-up(lg) {
      padding-bottom: 40px;
    }
  }

  &__tabs {
    &__item {
      &__icon {
        padding: 0 10px;
        width: 59px;
        height: 22px;
        margin: 0 auto 5px;

        @include media-breakpoint-up(lg) {
          margin-right: 15px;
          margin-bottom: 0;
          padding: 0;
        }
      }
    }

    &__content {
      padding-top: 30px;

      @include media-breakpoint-up(md) {
        padding-top: 55px;
      }

      @include media-breakpoint-up(lg) {
        border-top: 1px solid $gray-300;
        padding-top: 118px;
      }

      &__item {
        cursor: pointer;

        &:hover {
          .image-item {
            img {
              transform: scale(1.2);
            }
          }

          .title-item {
            color: $red-hover-color;
          }
        }

        &.selected {
          .image-item {
            img {
              transform: scale(1.2);

            }
          }

          .title-item {
            color: $red-hover-color;
          }
        }
      }

      .image-item {
        width: 100%;
        height: 130px;

        img {
          transition: transform 0.5s ease;
        }
      }

      .title-item {
        margin-top: 35px;
      }
    }
  }

  >>> .nav-tabs {
    border: none;
    flex-wrap: wrap;

    @include media-breakpoint-up(sm) {
      justify-content: center;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  >>> .nav-item {
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 0 20px;

    @include media-breakpoint-up(sm) {
      width: auto;
      margin-right: 30px;
    }

    &:last-child {
      margin-right: 0;
    }

    @include media-breakpoint-up(lg) {
      &:last-child {
        .nav-link {
          margin-right: 0;
        }
      }
    }
  }
  >>> .nav-link {
    display: block;
    border: none;
    border-radius: 0;
    color: $gray-200;
    padding: 0 3px 8px;
    text-align: center;

    @include media-breakpoint-up(lg) {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px 0 20px;
    }

    .icon-nomal {
      display: block;
    }

    .icon-active {
      display: none;
    }

    &.active {
      background: transparent;
      color: $gray-800;
      border-bottom: 3px $red-hover-color solid;

      .icon-active {
        display: block;
      }

      .icon-nomal {
        display: none;
      }
    }
  }
}

</style>
