<template>
  <div class="paging" v-if="pagingLength>1">
    <div v-if="isShortcutPaging"  v-bind:class="'paging__btn-arrow paging__btn-arrow--double paging__btn-arrow--first' + ' ' +(this.currentIndex === 0 ? 'disabled' : '')" @click="firstPage">

    </div>
    <div @click="prevPage" v-bind:class="'paging__btn-arrow paging__btn-arrow--prev' + ' ' +(this.currentIndex === 0 ? 'disabled' : '')">
      <img src="../../assets/arrow-prev-paging.png" alt="arrow-prev-paging" class="image-nomal">
      <img src="../../assets/arrow-prev-paging-hover.png" alt="arrow-prev-paging" class="image-hover">
    </div>
    <div class="paging__number">
      <div class="paging__number__item" v-if="isShortcutPaging && isEmptyLeft"> ... </div>
      <div @click="pagingClick(item)" :key=(index) v-for="(item, index) in activePagingData" class="paging__number__item" :class="currentIndex===item ? 'paging-active' : ''" >
        <span>{{item + 1}}</span>
      </div>
      <div class="paging__number__item" v-if="isShortcutPaging && isEmptyRight"> ... </div>
      <!-- <div class="paging__number__item" >
        <span>...</span>
      </div> -->
    </div>
    <div  v-bind:class="'paging__btn-arrow paging__btn-arrow--next' + ' ' + (this.currentIndex === this.pagingLength - 1 ? 'disabled' : '')" @click="nextPage">
      <img src="../../assets/arrow-next-paging.png" alt="arrow-next-paging" class="image-nomal">
      <img src="../../assets/arrow-next-paging-hover.png" alt="arrow-next-paging" class="image-hover">
    </div>
    <div v-if="isShortcutPaging"  v-bind:class="'paging__btn-arrow paging__btn-arrow--double paging__btn-arrow--last' + ' ' + (this.currentIndex === this.pagingLength - 1 ? 'disabled' : '')" @click="lastPage">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Paging',
  components: {
  },
  props: {
    pagingIndex: 0,
    total: 0,
    size: {
      type: Number,
      default: () => 10,
    },
  },
  data() {
    return {
      pagingSize: this.size,
      currentIndex: this.pagingIndex,
      pagingData: [],
      activePagingData: [],
      startPoint: 0,
      endPoint: 0,
      isLowest: true,
      isHighest: false,
      isShortcutPaging: false,
      isEmptyLeft: false,
      isEmptyRight: true,
    };
  },
  mounted () {
    this.updatePaging();
  },
  watch: {
    pagingIndex: function(newIndex) {
      this.currentIndex = newIndex;
    },
    size: function(newSize) {
      this.pagingSize = newSize;
    },
  },
  computed: {
    pagingLength: function() {
      let length = 0;
      if (this.total % this.pagingSize === 0) {
        length = Math.floor(this.total / this.pagingSize);
      } else {
        length = Math.floor(this.total / this.pagingSize) + 1;
      }
      return length;
    },
  },
  methods: {
    updatePaging() {
      // this.isLowest = true;
      // this.isHighest = false;
      this.pagingData = [];
      for (let pagingIdx = 0; pagingIdx < this.pagingLength; pagingIdx++) {
        this.pagingData.push(pagingIdx);
      }
      if (this.pagingLength <= 5) {
        this.startPoint = 0;
        this.isShortcutPaging = false;
        this.endPoint = this.startPoint + this.pagingLength;
      } else {
        this.isShortcutPaging = true;
        if ( this.pagingIndex > 3) {
          if (this.pagingIndex > this.pagingLength - 1 - 3) {
            this.endPoint = this.pagingLength;
            this.startPoint = this.endPoint - 5;
            this.isEmptyRight = false;
          } else {
            this.startPoint = this.pagingIndex - 2;
            this.endPoint = this.startPoint + 5;
            this.isEmptyRight = true;
          }
          this.isEmptyLeft = true;
        } else {
          this.isEmptyLeft = false;
          this.startPoint = 0;
          this.endPoint = this.startPoint + 5;
        }
      }
      this.updateActivePaging();
    },
    updateActivePaging() {
      this.activePagingData = [];
      this.pagingData.forEach(paging => {
        if (paging >= this.startPoint && paging < this.endPoint)  {
          this.activePagingData.push(paging);
        }
      });
    },
    nextPage() {
      if (!this.isHighest) {
        this.currentIndex += 1;
        this.isLowest = false;
        this.$emit("changePage", this.currentIndex);

        if (this.currentIndex === this.pagingLength - 1) {
          this.isHighest = true;
        }
      }
    },
    prevPage() {
      if (!this.isLowest) {
        this.currentIndex -= 1;
        this.isHighest = false;
        this.$emit("changePage", this.currentIndex);

        if (this.currentIndex === 0) {
          this.isLowest = true;
        }
      }
    },
    firstPage() {
      this.currentIndex = 0;
      this.isLowest = true;
      this.isHighest = false;
      this.$emit("changePage", this.currentIndex);
    },
    lastPage() {
      this.currentIndex = this.pagingLength - 1;
      this.isLowest = false;
      this.isHighest = true;
      this.$emit("changePage", this.currentIndex);
    },
    pagingClick(item) {
      this.currentIndex = item;
      if (this.currentIndex === 0) {
        this.isLowest = true;
        this.isHighest = false;
      } else if (this.currentIndex === this.pagingLength - 1) {
        this.isHighest = true;
        this.isLowest = false;
      }
      this.$emit("changePage", this.currentIndex);
    },
  },
}
</script>

<style lang="scss">
@import '../../assets/reuse-mixin.scss';

.paging {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0 50px;
  padding: 0 2px;
  font-size: $font-size-paging;

  @include media-breakpoint-up(xs) {
    padding: 0;
  }

  @include media-breakpoint-up(lg) {
    // width: 422px;
    margin: 35px auto 0;
  }

  &__btn-arrow {
    width: 24px;
    height: 24px;
    border: 1px solid #999999;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @include media-breakpoint-up(xs) {
      width: 27px;
      height: 27px;
    }

    @include media-breakpoint-up(lg) {
      width: 30px;
      height: 30px;
    }

    &:hover {
      border: 1px solid $red-hover-color;

      .image-nomal {
        display: none;
      }

      .image-hover {
        display: block;
      }
    }

    &--double {
      margin: 0 5px;

      @include media-breakpoint-up(md) {
        margin: 0 10px;
      }
    }

    &--last {
      background: url('../../assets/arrow-next-paging-double.png') center no-repeat;
      background-size: 15px;

      &:hover {
        background: url('../../assets/arrow-next-paging-double-hover.png') center no-repeat;
        background-size: 13px;
      }
    }
    &--first {
      background: url('../../assets/arrow-prev-paging-double.png') center no-repeat;
      background-size: 14px;

      &:hover {
        background: url('../../assets/arrow-prev-paging-double-hover.png') center no-repeat;
        background-size: 13px;
      }
    }

    img {
      width: 6px;

      @include media-breakpoint-up(lg) {
        width: 8px;
      }
    }

    .image-nomal {
      display: block;
    }

    .image-hover {
      display: none;
    }
  }

  &__number {
    // width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-between;

    @include media-breakpoint-up(xs) {
      margin: 0 5px;
    }

    @include media-breakpoint-up(md) {
      margin: 0 15px;
    }

    &__item {
      // width: 100%;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 3px;
      cursor: pointer;
      height: 22px;
      width: 22px;
      border-radius: 50%;
      cursor: pointer;
      transition: 0.25s all;

      @include media-breakpoint-up(xs) {
        margin: 0 3px;
        height: 23px;
        width: 23px;
      }

      @include media-breakpoint-up(md) {
        padding: 0 10px;
      }

      @include media-breakpoint-up(lg) {
        height: 25px;
        width: 25px;
        margin: 0 6px;

        &:hover {
          background: $red-hover-color;
          color: $white;
        }
      }

      &.paging-active {
        background: $red-hover-color;
        color: $white;
      }
    }
  }

  // .paging-active {
  //   background: #db0006;
  //   border-radius: 50%;
  //   color: $white;
  //   height: 22px;
  //   width: 22px;
  //   cursor: pointer;

  //   @include media-breakpoint-up(lg) {
  //     height: 25px;
  //     width: 25px;
  //     margin-top: 1px;
  //   }
  // }

  .disabled {
    cursor: auto;
    opacity: 0.2;
    pointer-events: none;
  }
}
</style>
