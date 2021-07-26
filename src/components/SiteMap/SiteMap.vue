<template>
  <div class="site-map">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="site-map__level-1">
            <a :href="firstParent.url" class="site-map__page-title">{{firstParent.name}}</a>
          </div>
        </div>
      </div>
      <div class="row childs-item">
        <div class="col-lg-3" v-for="(item, index) in firstChilds" :key="index">
          <div class="site-map__collapse site-map__level-2" :class="{'none-arrow-btn': item.Url.length > 0}" v-b-toggle="'accordion-' + index">
            <a :href="item.Url" class="site-map__page-title" v-if="item.Url.length">{{item.PageTitle}}</a>
            <h5 class="site-map__page-title" v-else>{{item.PageTitle}}</h5>
          </div>
          <b-collapse v-bind:id="'accordion-'+index" v-if="item.Children.length">
            <b-card>
              <ul v-bind:class="'recursive-menuItem-'+ index">

              </ul>
            </b-card>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSiteMap } from '../../service/sitemapService';
import * as $ from 'jquery';
export default {
  name : 'SiteMap',
  data (){
    return {
      siteMapData : {},
      firstParent : {},
      firstChilds : [],
      maxLevel : 0,
    }
  },
  mounted (){
    this.getDataSiteMap();
  },
  methods : {
    getDataSiteMap(){
      GetSiteMap().then(res =>{
        this.siteMapData = res.data.Contents;
        this.firstParent = {
          name : this.siteMapData.PageTitle,
          id : this.siteMapData.Id.Guid,
          url: this.siteMapData.Url
        }
        if(this.siteMapData?.Children?.length){
          this.firstChilds = this.siteMapData.Children;
        }
        if(this.firstChilds?.length){
          this.$nextTick(() => {
            this.firstChilds.forEach((item,index) => {
              if(item?.Children?.length){
                this.recursiveSiteMap($(`.recursive-menuItem-${index}`), item.Children);
              }
            })
          })
        }
      })
    },
        
    recursiveSiteMap(element, menuItem){
      menuItem.forEach(item => {
        let li=$(element).append(`
          <li class='site-map__level-3 submenu-title-${item.Level}'>
            <a href="${item?.Url}">${item?.PageTitle}</a>
          </li>
          `);
        this.maxLevel = item.Level;
        this.setMarginSubmenu();
        if (item?.Children?.length) {
          let subUl=$(
            '<ul class="submenu-'+item.Level+'"></ul>'
          );
          $(li).append(subUl);
          this.recursiveSiteMap($(subUl), item?.Children);
        }
      })
    },
    setMarginSubmenu (){
      this.$nextTick(() => {
        for(let i = 1 ; i <= this.maxLevel ; i++){
          $(`.site-map .submenu-${i}`).css('margin-left',`${i*5}px`);
          if(i > 3){
            $(`.site-map .submenu-title-${i}`).find('a').css('color','#717171');
          }
        }
      })
    }
  }
}
</script>

<style lang = "scss" scoped>
@import '../../assets/reuse-mixin';

.site-map{
  padding: 50px 0;

  .childs-item {
    @include media-breakpoint-up(lg) {
      padding-left: 10px;
    }
  }

  &__page-title {
    color: $gray-800;
    transition: color 0.25s ease-in-out;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      color: $red-hover-color;
    }
  }

  &__level-1 {
    padding: 15px 5px 10px;
    border-top: 1px solid #e8e8e8;

    @include media-breakpoint-up(lg) {
      padding: 25px 5px 20px;
    }
  }

  >>> &__level-3 {
    padding: 5px 0;

    a {
      color: $red-hover-color;
      transition: color 0.25s ease-in-out;

      &:hover {
        color: $gray-800;
      }
    }
  }

  &__collapse {
    border-top: 1px solid #e8e8e8;
    padding: 10px 5px;
    position: relative;

    @include media-breakpoint-up(lg) {
      padding: 10px 5px 10px;
      margin-bottom: 0;
    }

    &::after {
      content: "";
      position: absolute;
      top: calc(50% - 10px);
      right: 10px;
      background: url('../../assets/select-car-compare.svg');
      background-size: contain;
      background-repeat: no-repeat;
      width: 15px;
      height: 10px;
      transform: rotate(180deg);
      transition: all .25s ease-in-out;

      @include media-breakpoint-up(lg) {
        top: calc(50% - 8px);
      }
    }

    &.collapsed {
      @include media-breakpoint-up(lg) {
        margin-bottom: 20px;
      }

      &:after {
        transform: rotate(0);
        top: calc(50% - 5px);

        @include media-breakpoint-up(lg) {
          top: calc(50% - 6px);
        }
      }
    }

    &.none-arrow-btn {
      &::after {
        display: none;
      }
    }
  }

  .card {
    border: none;
  }

  .card-body {
    padding: 0 5px 20px 15px;

    @include media-breakpoint-up(lg) {
      padding: 0 5px 35px 20px;
    }
  }
}
</style>