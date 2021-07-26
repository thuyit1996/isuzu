<template>
  <div class="choose-car">
    <div class="container">
      <div class="choose-car__title">
        <sc-text tag="h2" class="isu-title" :field="stepModel.Steps[1].fields.Title" />
      </div>
      <request-quotation-step-2-item
      v-for="(carInfo, index) in carGradeListPaging"
      :key="carInfo.Id"
      :carGrade="carInfo"
      :isActive="activeIndex"
      :carModelIndex="selectedIndex"
      v-on:click.native="itemSelect(carInfo.Id)"
      @chooseCarModel="selectCarModel">
      </request-quotation-step-2-item>
      <div class="choose-car__remark">
        <p class="choose-car__remark__content">
          หมายเหตุ รุ่นที่ปรากฎในภาพอาจแตกต่างจากรูปจริง
        </p>
      </div>
    </div>
    <Paging ref="paging" @changePage="changePage" :pagingIndex="pagingIndex" :total="total" :size="pagingSize"></Paging>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import RequestQuotationStep2Item from './RequestQuotationStep2Item';
import { getCarGrade } from '../../../service/requestQuotationService';
import { mapActions, mapState, mapGetters } from "vuex";
import Paging from '../../campaign/Paging';

export default {
  name: 'RequestQuotationStep2',
  components: {
    ScText: Text,
    RequestQuotationStep2Item: RequestQuotationStep2Item,
    Paging: Paging,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carGrade: {},
    stepModel: Object,
  },
  data() {
    return {
      carGradeList: [],
      activeIndex: '',
      selectedIndex: this.carGrade.Id,
      pagingSize: this.$getConst('CAR_GRADE_PAGING_SIZE'),
      total: 0,
      carGradeListPaging: [],
    };
  },
  mounted() {
    let carModelId = this.$parent.carModel.Id;
    this.$emit('update:loadingStatus', true);
    // INFO: get all cargrade, and do the client paging
    getCarGrade(carModelId).then(carGrade => {
      this.$emit('update:loadingStatus', false);
      this.carGradeList = carGrade.data.Records;
      this.total = this.carGradeList.length;
      this.updatePagingData();
      this.$nextTick(() => {
        this.$refs.paging.updatePaging();
      });
    });
  },

  methods: {
    ...mapActions('quotation', ['updateGradePagingIndex']),
    itemSelect(id){
      this.activeIndex = id;
    },
    selectCarModel(carModelVal) {
      this.$emit('update:cargrade', carModelVal);
      this.selectedIndex = carModelVal.Id;
    },
    changePage(index) {
      this.updateGradePagingIndex(index);
      this.updatePagingData();
    },
    updatePagingData() {
      this.carGradeListPaging = this.carGradeList.slice(
        this.pagingSize * this.pagingIndex,
        this.pagingSize * this.pagingIndex + this.pagingSize
      );
    },
  },
  computed: {
    ...mapState('quotation', { pagingIndex: 'carGradePagingIndex'}),
  },
}
</script>
<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';
.choose-car {
  padding: 80px 0 30px;
  background-color: #f5f5f5;

  @include media-breakpoint-up(lg) {
    padding: 160px 0 55px;
  }

  &__title {
    text-align: center;
    padding-bottom: 40px;

    @include media-breakpoint-up(lg) {
      padding-bottom: 85px;
    }
  }

  &__remark {
    padding: 15px 0 0 5px;

    @include media-breakpoint-up(lg) {
      padding: 25px 0 0 10px;
    }
  }
}
</style>
