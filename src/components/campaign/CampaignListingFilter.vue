<template>
  <div class="campaign-listing-filter">
    <div class="container">
      <b-tabs class="campaign-listing-filter__tabs">
        <b-tab
          @click="tabClick(item.Id, index)"
          class="campaign-listing-filter__tabs__item"
          :key="item.Id"
          v-for="(item, index) in data.Detail"
        >
          <template slot="title">
            <span class="campaign-listing-filter__tabs__item__title">{{item.Name}}</span>
            <div class="campaign-listing-filter__tabs__item__number">
              <span>{{item.Count}}</span>
            </div>
          </template>
        </b-tab>
        <!-- <b-tab class="campaign-listing-filter__tabs__item">
          <template slot="title">
            <span class="campaign-listing-filter__tabs__item__title">รถปิกอัพ</span>
            <div class="campaign-listing-filter__tabs__item__number">
              <span>33</span>
            </div>
          </template>
        </b-tab>
        <b-tab class="campaign-listing-filter__tabs__item">
          <template slot="title">
            <span class="campaign-listing-filter__tabs__item__title">รถอเนกประสงค์</span>
            <div class="campaign-listing-filter__tabs__item__number">
              <span>3</span>
            </div>
          </template>
        </b-tab>
        <b-tab class="campaign-listing-filter__tabs__item">
          <template slot="title">
            <span class="campaign-listing-filter__tabs__item__title">รถบรรทุก</span>
            <div class="campaign-listing-filter__tabs__item__number">
              <span>4</span>
            </div>
          </template>
        </b-tab> -->
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'CampaignListingFilter',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    tabClick(tabTitle, tabIndex) {
      this.$emit('tabSelected', {
        title: tabTitle,
        index: tabIndex,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.campaign-listing-filter {
  background: #f5f5f5;

  &__tabs {
    &__item {
      cursor: pointer;

      &__title {
        display: inline-block;
        margin-right: 5px;
        color: #495057;
        white-space: nowrap;

        @include media-breakpoint-up(lg) {
          margin-right: 10px;
        }
      }

      &__number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        color: $white;
        background: $gray-400;
        border-radius: 4px;

        @include media-breakpoint-up(lg) {
          width: 33px;
          height: 30px;
          border-radius: 7px;
        }

        span {
          @include media-breakpoint-down(md) {
            font-size: $font-size-small;
          }
        }
      }
    }
  }

  >>> .nav-tabs {
    border: none;
    padding-top: 10px;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -ms-overflow-style: none;

    @include media-breakpoint-up(lg) {
      padding-top: 15px;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  >>> .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 7px 13px;
    border: none;
    border-radius: 0;
    position: relative;
    transition: 0.2s all;

    @include media-breakpoint-up(md) {
      padding: 13px 15px 12px 16px;
    }

    &::before {
      content: "";
      border-top: 1px solid transparent;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: 0.2s all;

      @include media-breakpoint-up(md) {
        border-top-width: 2px;
      }
    }

    @include hover-desktop() {
      &:hover {
        background: $white;

        &::before {
          border-color:$red-hover-color;
        }
      }
    }

    &.active {
      background: $white;

      &::before {
        border-color:$red-hover-color;
      }

      .campaign-listing-filter__tabs__item__title {
        font-weight: bold;
      }
    }
  }
}
</style>