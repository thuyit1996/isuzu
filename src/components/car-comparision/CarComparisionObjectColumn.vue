<template>
<div class="row no-gutters border-none">
    <div class="col-lg-4 col-md-6 col-6 compare-model-group" v-for="(item, index) in compareModelList" :key="item.index">
        <div v-if="Object.keys(findObject(index)).length">
          <!-- <p class="car-comparision__card__body__content__sup-title fontsize-mobile-big">{{type}}</p>  -->
          <!-- <sc-text class="car-comparision__card__body__content__sup-title fontsize-mobile-big" tag="p" :field="field" />   -->
          <ul class="car-comparision__card__body__content__desc">
            <li  v-for="(itemChild,indexChild) in Object.keys(findObject(index))" :key="indexChild">
              {{ getFieldName(itemChild) }}
              <br />
              {{ '  ' +changeBooleanField(findObject(index)[itemChild]) }} 
            </li>
          </ul>
        </div>
   </div>
</div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'CarComparisionObjectColumn',
  components : {
    ScText: Text,
  },
  props: {
    carComparisonModel : {
      type: Object,
    },
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
    available:{
      type: Object,
    },
    unavaiable:{
      type: Object,
    },
    groupType:{
      type : String,
    }
  },
  methods: {
     findObject(index){
      let findIndex = this.compareModelList.find(item => item.index == index);
      let properties = findIndex?.properties?.length ? findIndex.properties.find(item => item.Name == this.groupType) : {};
      let object = {};
      if(properties?.Data?.length){
        object = properties.Data.find(item => item.Name == this.parent)?.Property?.[`${this.type}`] || {};
      }
      return object;
    },
    getFieldName(field){
      let fieldName = '';
      switch(field){
        case 'Material' : {
          fieldName = this.carComparisonModel?.Material?.value;
          break;
        }
        case 'TheFrontCanAdjusted' : {
          fieldName = this.carComparisonModel?.TheFrontCanAdjusted?.value;
          break;
        }
        case 'Seat2' : {
          fieldName = this.carComparisonModel?.Seat2?.value;
          break;
        }
        case 'HasDocumentStorageCompartment' : {
          fieldName = this.carComparisonModel?.DocumentStorageCompartment?.value;
          break;
        }
        case 'Seat3' : {
          fieldName = this.carComparisonModel?.Seat3?.value;
          break;
        }
        case 'AudioSystem' : {
          fieldName = this.carComparisonModel?.AudioSystem?.value;
          break;
        }
        case 'NumberOfSpeakers' : {
          fieldName = this.carComparisonModel?.NumberOfSpeakers?.value;
          break;
        }
        case 'HasUSBorAUXDevice' : {
          fieldName = this.carComparisonModel?.USBorAUXDevice?.value;
          break;
        }
        case 'TelephoneConnection' : {
          fieldName = this.carComparisonModel?.TelephoneConnection?.value;
          break;
        }
        case 'HasNavigationSystem' : {
          fieldName = this.carComparisonModel?.NavigationSystem?.value;
          break;
        }
        default: {
          break;
        }
      }
      return fieldName;
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
@import '../../assets/reuse-mixin';
.compare-model-group {
  @include media-breakpoint-down(sm) {
    &:nth-of-type(3) {
      display: none;
    }
  }
}

</style>