<template>
  <div class="row d-flex">
    <div class="col-md-4 col-lg-3">
      <sc-text class="car-comparision__card__body__content__title fontsize-mobile-big" tag="p" :field="field" />
    </div>
    <div class="col-lg-3 col-md-4 col-6 compare-model-group" v-for="(item, index) in compareModelList" :key="item.index">
      <div v-for="(itemChild, index) in findValueByKey(index)" :key="index">
        <!-- <p  class="car-comparision__card__body__content__detail fontsize-mobile-big">
        - {{itemChild.Name}}
        <br />
        {{itemChild.Ratio}}
        </p> -->
        <p class="car-comparision__card__body__content__detail fontsize-mobile-big">
          <span class="style-list">- {{itemChild.Name}}</span>
          <span>{{itemChild.Ratio}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'CarComparisionArrayColumn',
  components: {
    ScText: Text,
  },
  props: {
    field: {
      type: Object,
    },
    parent: {
      type: String,
    },
    type: {
      type: String,
    },
    compareModelList : {
      type : Array
    },
    groupType:{
      type : String,
    }
  },
  methods: {
    findValueByKey(index){
      let findIndex = this.compareModelList.find(item => item.index == index);
      let properties = findIndex?.properties?.length ? findIndex.properties.find(item => item.Name == this.groupType) : {};
      let value = '';
      if(properties?.Data?.length){
        value = properties.Data.find(item => item.Name == this.parent)?.Property?.[`${this.type}`];
        value = this.changeBooleanField(value);
      }
      return value;
    },
    changeBooleanField(field){
      if (field === '') return '';
      if (field === true) return (this.available?.value || true);
      if (field === false) return (this.unavaiable?.value || false);
      return field;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.car-comparision__card__body__content__detail {
  span {
    display: block;
    margin-left: 8px;

    @include media-breakpoint-up(md) {
      margin-left: 12px;
    }
  }

  .style-list {
    margin-left: 0;
  }
}
</style>
