<template>
  <div class="container breadcrumb container-extra">
    <span class="breadcrumb__item" :key=(index) v-for="(item, index) in fields.Items">
      <a v-if="item.Url"  :href="item.Url" >
        {{item.Title}}
      </a>
      <span v-else>
        {{item.Title}}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  components: {
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
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.breadcrumb {
  margin-top: $distance-breadcrumb;

  @include media-breakpoint-up(lg) {
    margin-top: $distance-breadcrumb-lg;
  }

  &__item {
    font-size: 1.9rem;
    color: $gray-800;

    a {
      font-size: 1.9rem;
      color: $gray-800;
    }

    a:hover,
    a:focus,
    a:active {
      color: $red-hover-color;
      text-decoration: none;
      font-weight: bold;
    }

    &:after {
      content: '';
      display: inline-block;
      width: 14px;
      height: 13px;
      background: url('../../assets/icon-breadcrumb.png') center no-repeat;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      transform: translateY(3px);
      margin: 0 5px;
    }

    &:last-of-type:after {
      display: none;
    }

    &:last-of-type {
      a {
        color: $gray-500;

        &:hover {
          color: $red-hover-color;
        }
      }
    }
  }
}
</style>