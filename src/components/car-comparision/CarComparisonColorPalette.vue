<template>
  <div class="color-palette">
    <ul class="color-palette__list">
      <li class="color-palette__item" @click="colorActive(item.Id)" :class="item.Id === defaultColorState ? 'active' : ''" :key=(index) v-for="(item, index) in carColorList">
        <img :src="item.ColorImage" alt="color">
      </li>
    </ul>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
export default {
  name: 'CarComparisonColorPalette',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carIndex : {
      type : Number
    },
    carColorList : {
      type : Array,
    },
    defaultCarColor: {
      type : String,
    },
  },
  data (){
    return {
      defaultColorState : '',
      carColorListState : [],
    }
  },
  methods: {
    colorActive(colorId) {
      this.defaultColorState = colorId;
      this.findColorActive();
    },
    findColorActive(){
      let findColor  = this.carColorList.find(item => item.Id === this.defaultColorState);
      this.emitCarImage({ image : findColor.Image, imageSm : findColor.ImageSm, price : findColor.Price , colorThai : findColor.ColorName , colorEnglish : findColor.Title});
    },
    emitCarImage({image, imageSm, price, colorThai, colorEnglish}){
      this.$emit('get:carImage', {
        image,
        imageSm,
        carIndex: this.carIndex,
        price,
        colorThai,
        colorEnglish
      });
    }
  },
  watch :{
    defaultCarColor (val){
      this.defaultColorState = val;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.color-palette {
  margin: 0 0 5px;
  width: 100%;
  
  &__list {
    display: block;
    text-align: left;
  }

  &__item {
    display: inline-block;
    height: 28px;
    width: 28px;
    border-radius: 14px;
    padding: 3px;
    overflow: hidden;
    cursor: pointer;
    border: 0 solid $white;
    transition: border-color .4s ease;

    @include media-breakpoint-up(md) {
      height: 36px;
      width: 36px;
    }

    &:hover,
    &.active {
      padding: 0;
      border-radius: 7px;
      border: 2px solid #e40000;
    }

    img {
      width: 100%;
      border-radius: 4px;
      display: block;
    }
  }
}
</style>