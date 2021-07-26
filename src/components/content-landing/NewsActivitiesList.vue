<template>
  <div class="news-activities-list">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-4" v-for="(item, index) in data" :key="index">
          <news-activities-item :activitiesItem="item"></news-activities-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsActivitiesItem from './NewsActivitiesItem';
import Paging from '../campaign/Paging';

export default {
  name: 'NewsActivitiesList',
  components: {
    NewsActivitiesItem: NewsActivitiesItem,
    Paging: Paging,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    data: Array,
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.news-activities-list {
  padding-top: 20px;
  padding-bottom: -10px;
  @include media-breakpoint-up(md) {
    padding-top: 40px;
    padding-bottom: 35px;
  }
}
</style>