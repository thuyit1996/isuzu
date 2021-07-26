<template>
	<div class="row d-flex">
		<div class="col-lg-3 col-md-4 col-12">
			<sc-text class="car-comparision__card__body__content__title fontsize-mobile-big" tag="p" :field="field" />
		</div>
		<div  class="col-lg-3 col-md-4 col-6 compare-model-group" v-for="(item, index) in compareModelList" :key="item.index">
      <div v-html="findValueByKey(index)" v-if="checkItemRichText()" class="car-comparision__card__body__content__detail fontsize-mobile-big"></div>
      <div v-else>
        <sc-image v-if="findValueByKey(index) && findValueByKey(index).src" :media="findValueByKey(index)" :editable="false" class="car-comparision__card__body__content__image"/>
        <p v-else class="car-comparision__card__body__content__detail fontsize-mobile-big">{{findValueByKey(index)}}</p>
      </div>
		</div>
	</div>
</template>

<script>
import { Text, Image } from '@sitecore-jss/sitecore-jss-vue';
import { isItemRichText } from './collectionRichTextType';
export default {
  name: 'CarComparisionColumn',
  components: {
    ScText: Text,
    ScImage: Image,
  },
  props: {
    field: {
      type: Object,
    },
    compareModelList : {
      type : Array,
    },
    type : {
      type : String
    },
    parent : {
      type : String
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
     findValueByKey(index) {
       let findIndex = this.compareModelList.find(item => item.index == index);
       let properties = findIndex?.properties?.length ? findIndex.properties.find(item => item.Name == this.groupType) : {};
       let value = '';
       if(properties?.Data?.length){
         let groupProperties = properties.Data.find(item => item.Name == this.parent)?.Property || {};
         if(this.type.indexOf('.') !== -1) {
          let newArr = this.type.split('.');
          value = groupProperties[newArr[0]][newArr[1]];
         }
         else {
          value = groupProperties[this.type];
         } 
         value = this.changeBooleanField(value);
       }
      return value;
     },
     changeBooleanField(field){
       if (field === '') return '';
       if (field === true) return (this.available?.value || true);
       if (field === false) return (this.unavaiable?.value || false);
       return field;
     },
     checkItemRichText(){
       return isItemRichText(this.parent, this.type);
     }
  },
};
</script>

<style>

</style>