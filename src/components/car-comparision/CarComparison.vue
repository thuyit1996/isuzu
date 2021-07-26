<template>
  <div>
    <car-comparision-type-car :carComparisonModel="fields"></car-comparision-type-car>
    <car-comparision-collapse :carComparisonModel="fields"></car-comparision-collapse>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import CarComparisionTypeCar from './CarComparisionTypeCar';
import CarComparisionCollapse from './CarComparisionCollapse';
export default {
  name: 'CarComparison',
  components: {
    ScText: Text,
    CarComparisionCollapse: CarComparisionCollapse,
    CarComparisionTypeCar: CarComparisionTypeCar,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
