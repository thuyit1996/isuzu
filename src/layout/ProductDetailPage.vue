<template>
  <div>
    <!-- <equipment-intro></equipment-intro>
    <equipment-intro :modifyClass="'equipment-intro--new-mux'"></equipment-intro>
    <equipment-intro :modifyClass="'equipment-intro--exterior'"></equipment-intro>
    <equipment-intro :modifyClass="'equipment-intro--new-mux equipment-intro--exterior-new-mux'"></equipment-intro>
    <story-feature></story-feature>
    <car-intro></car-intro>
    <mux-safety></mux-safety>
    <mux-safety :modifyClass="modifySafetyClass"></mux-safety>
    <car-selection></car-selection>
    <car-selection :modifyClass="'compare-model--without-select-model'"></car-selection> -->
    <sc-placeholder name="product-detail-content" :rendering="rendering" />
  </div>
</template>

<script>
// import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
import EquipmentIntro from '../components/utility/EquipmentIntro';
import MuxSafety from '../components/utility/MuxSafety';
import StoryFeature from '../components/utility/StoryFeature';
import CarIntro from '../components/utility/CarIntro';
import CarSelection from '../components/utility/CarSelection';
export default {
  name: 'ProductDetailPage',
  components: {
    ScPlaceholder: IsuPlaceholder,
    EquipmentIntro: EquipmentIntro,
    MuxSafety: MuxSafety,
    StoryFeature: StoryFeature,
    CarIntro: CarIntro,
    CarSelection: CarSelection,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    rendering: {
      type: Object,
    },
  },
  data() {
    return {
      modifySafetyClass: 'mux-safety--new-mux mux-safety--slide-blue',
    }
  }
}
</script>