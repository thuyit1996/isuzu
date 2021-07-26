<template>
  <div class="choose-car-color">
    <div class="container">
      <div class="choose-car-color__heading text-center ">
        <sc-text tag="h2" class="isu-title" :field="stepModel.Steps[2].fields.Title" />
      </div>
      <div class="choose-car-color__content">
        <div class="row">
          <request-quotation-step3-item
          v-for="(color, index) in carColorsPaging"
          :key="color.Id"
          :carColor="color"
          :isActive="activeIndex"
          v-on:click.native="itemSelect(color.Id)"
          @chooseCarColor="selectCarColor">
          </request-quotation-step3-item>
        </div>
      </div>
    </div>
    <Paging ref="paging" @changePage="changePage" :pagingIndex="pagingIndex" :total="total" :size="pagingSize"></Paging>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import RequestQuotationStep3Item from './RequestQuotationStep3Item';
import Paging from '../../campaign/Paging';
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: 'RequestQuotationStep3',
  components: {
    ScText: Text,
    RequestQuotationStep3Item: RequestQuotationStep3Item,
    Paging: Paging,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carColors: {
      type: Array,
      default: () => [],
    },
    color: {
      Id: '',
    },
    stepModel: Object,
  },
  data() {
    return {
      listStep3ItemInfo: null,
      activeIndex: this.color.Id,
      pagingSize: this.$getConst('CAR_COLOR_PAGING_SIZE'),
      total: this.carColors.length,
      carColorsPaging: [],
    };
  },
  mounted() {
    this.updatePagingData();
  },
  methods: {
    ...mapActions('quotation', ['updateColorPagingIndex']),
    changePage(index) {
      this.updateColorPagingIndex(index);
      this.updatePagingData();
    },
    updatePagingData() {
      this.carColorsPaging = this.carColors.slice(
        this.pagingSize * this.pagingIndex,
        this.pagingSize * this.pagingIndex + this.pagingSize
      );
    },
    itemSelect(id){
      this.activeIndex = id;
    },
    selectCarColor(carColorVal) {
      this.$emit('update:carcolor', carColorVal)
    }
  },
  computed: {
    ...mapState('quotation', { pagingIndex: 'carColorPagingIndex'}),
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';

.choose-car-color {
  background: #f5f5f5;
  padding: 80px 0 35px;

  @include media-breakpoint-up(lg) {
    padding: 160px 0 90px;
  }

  &__heading {
    margin-bottom: 50px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 60px;
    }
  }

  .row {
    margin: 0 -5px;
    @include media-breakpoint-up(lg) {
      margin: 0 -15px;
    }
  }

  .col-6,
  .col-md-3 {
    padding: 0 5px;
    @include media-breakpoint-up(lg) {
      padding: 0 15px;
    }
  }
}

</style>
