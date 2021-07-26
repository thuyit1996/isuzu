<template>
  <div class="special-privileges" v-show="specialPrivileges.SpecialPrivileges">
    <div class="special-privileges__header">
      <p class="special-privileges__header__title" v-html="specialPrivileges.SpecialPrivileges && specialPrivileges.SpecialPrivileges.Title"></p>
    </div>
    <div class="special-privileges__detail">
      <div class="row pb-3" v-for="(item, index) in listSpecialPrivileges" :key="index">
        <div class="col-md-2">
          <img :src="item.Image" alt="isi" class="special-privileges__detail__image" />
        </div>
        <div class="col-md-6 col-lg-5">
          <div class="special-privileges__detail__description" v-html="item.Description"></div>
        </div>
        <div class="col-md-4">
          <div class="special-privileges__detail__value" v-if="item.Price">
            <strong>{{item.Price}}</strong><strong>{{unit}}</strong>
            <div class="special-privileges__detail__hilight-circle" v-if="item.PrivilegeHilightText">{{item.PrivilegeHilightText}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { mapState } from 'vuex';

export default {
  name: 'SpecialPrivileges',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carTypeData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      listCarType: [],
      listSpecialPrivileges: [],
      specialPrivileges: {},
      unit: '',
    }
  },
  mounted() {
    this.$root.$on('currencyUnit', (data) => {
      this.unit = data.value;
    });
    this.$root.$on('listCarTypeData', (data) => {
      this.listCarType = data;
      this.getCarType(); 
    });
  },
  computed: {
    ...mapState('quotation', { carTypeData: 'carTypeData' }),
  },
  methods: {
    getCarType() {
      this.specialPrivileges = this.listCarType.find((item) => item.Id == this.carTypeData.id);
      if (this.specialPrivileges) {
        this.listSpecialPrivileges = this.specialPrivileges.SpecialPrivileges?.SpecialPrivilegesItem;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.special-privileges {
  padding: 25px;
  background-color: #fff;

  &__header {
    &__title {
      margin: 0 0 15px;
      font-size: 2.7rem;
      line-height: 0.9;
      color: inherit;
      white-space: normal;
      font-family: $font-family-Kittihada-Medium65;
    }
  }

  &__detail {
    font-size: 2.5rem;
    line-height: 0.9;
    color: #222;

    &__image {
      display: block;
      margin: 0 auto;
    }

    &__description {
      margin: 0;
      text-align: center;

      @include media-breakpoint-up(md) {
        margin-top: 12px;
      }

      @include media-breakpoint-up(lg) {
        text-align: left;
        margin-top: 22px;
      }

      >>> ul {
        max-width: 220px;
        margin: 0 auto;
        text-align: left;

        @include media-breakpoint-up(lg) {
          max-width: 250px;
        }

        li {
          list-style: disc;
        }
      }
    }

    &__value {
      display: flex;
      align-items: center;
      justify-content: center;

      @include media-breakpoint-up(md) {
        padding-left: 35px;
        justify-content: flex-start;
      }

      @include media-breakpoint-up(lg) {
        margin-top: 8px;
      }

      strong {
        margin-right: 10px;
      }
    }

    &__hilight-circle {
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      background-color: red;
      color: #fff;
      font-weight: 700;
      display: inline-block;
      margin: 5px;
    }
  }
}
</style>
