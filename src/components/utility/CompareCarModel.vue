<template>
  <div class="compare-model animated"  v-animate-onscroll="'fadeInUp-big'">
    <!-- <div class="compare-model__heading">
       <sc-rich-text tag="h2" class="isu-title" :field="fields.Title" />
       <sc-rich-text tag="p" class="compare-model__heading__desc" :field="fields.Description" />
    </div> -->
    <div class="compare-model__wrap container no-container-md" :class="!interiorImageLeft && !interiorImageRight ? 'no-front-rear-image' : ''">
      <div class="switch-model" :class="!checkSwitchModelValid() ? 'no-switch-model' : ''">
        <div class="switch-model__item" v-for="(item, gradeId) in gradeTypeList" :key="gradeId">
          <sc-text tag="span" :field="item.fields.Name" :class="gradeId === carModelTitleId ? 'active-switch' : ''" @click=" switchCarModel(gradeId, item.id)"/>
        </div>
      </div>
      <picture>
        <!-- <source media="(min-width: 1024px)" srcset="../../assets/bg-compare-car-desktop-new.jpg">
        <img class="compare-model__bgr" src="../../assets/bg-compare-car-mobile-new.jpg" alt="x"> -->
        <sc-image :media="fields.BackgroundImage" class="d-none d-lg-block compare-model__bgr"/>
        <sc-image v-if="!isEditing" :media="fields.MediumBackgroundImage" class="d-none d-md-block d-lg-none compare-model__bgr"/>
        <sc-image v-if="!isEditing" :media="fields.SmallBackgroundImage" class="d-lg-none d-md-none compare-model__bgr"/>
      </picture>
      <div class="compare-model-bgr-car">
        <div class="compare-model__heading">
          <sc-rich-text tag="h2" class="compare-model__heading__title" :field="fields.Title" />
          <sc-rich-text tag="p" class="compare-model__heading__desc" :field="fields.Description" />
        </div>
        <div class="in-out-image" v-show="interiorImageLeft || interiorImageRight || isLoadingLeftImage || isLoadingRightImage">
          <span @click="selectExterial(true)" class="in-out-image__item in-out-image__item--left" :class="isExterior ? 'active' : ''">
            <sc-text :field="fields.ExteriorDesignTitle" />
          </span>
          <span @click="selectExterial(false)" class="in-out-image__item in-out-image__item--right" :class="!isExterior ? 'active' : ''">
            <sc-text :field="fields.InteriorDesignTitle" />
          </span>
        </div>
        <div ref="movedCar" class="container no-pd-container-mb">
          <div class="compare-model__car" @mousemove="handleMoveCarFace1"  :class="isExterior ? 'active-interior' : ''">
            <div class="compare-model__car__face1" :class="!isLoadingRightImage ? 'not-loading' : ''">
              <img draggable="false" class="compare-model__car__face1__img" alt="compare-model-car" @load="imageRightOnLoad" :src="imageEndPoint(rightCarBg)" >
            </div>
            <div class="compare-model__car__face2"  :class="!isLoadingLeftImage ? 'not-loading' : ''">
              <img draggable="false"  class="compare-model__car__face2__img" alt="compare-model-car" @load="imageLeftOnLoad" :src="imageEndPoint(leftCarBg)">
            </div>
            <div class="compare-model__car__rezise">
              <div class="compare-model__car__rezise__line">
                <div class="compare-model__car__rezise__btn" v-bind:style="{'background-color' : btnResizeColor}"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="front-rear-image" v-if="isExterior && rearImageLeft && rearImageRight">
            <span @click="selectFront(true)" class="front-rear-image__item front-rear-image__item--left" :class="isFront ? 'active' : ''">
              <sc-text :field="fields.FrontViewTitle" />
            </span>
            <span @click="selectFront(false)"  class="front-rear-image__item front-rear-image__item--right"
            :class="!isFront ? 'active' : ''">
              <sc-text :field="fields.RearViewTitle" />
            </span>
        </div>
      </div>
    </div>
    <div class="container container-extra compare-model__panel" :class="!isExterior ? 'compare-model-interior' : ''">
      <div class="row">
        <div class="col-lg-6 compare-panel compare-panel--left">
          <div class="compare-model-box">
            <div class="select-color" v-if="isExterior">
              <div class="compare-model__panel__color">
                <div class="panel-list">
                  <div class="panel-list__item" :class="[((leftCarColorIndex === index ? 'active' : '') + ' item-'+index), item.className]" :key="item.Id" v-for="(item, index) in carGradeLeft.Colors">
                    <span class="panel-list__item__tooltip">{{item.ColorName || item.Title}}</span>
                    <div class="panel-list__item__color" :class="item.className" @click="changeColorLeftWrapper(item, carGradeLeft, index)"></div>
                  </div>
                </div>
              </div>
              <div class="compare-model__panel__title compare-model__panel__title--left">
                <div class="panel-title-wrap">
                  <span class="panel-icon-color" :style="{color: activeColorLeft}">
                  </span>
                  <span class="panel-title">{{carGradeLeft.Colors[leftCarColorIndex] && carGradeLeft.Colors[leftCarColorIndex].ColorName}}</span>
                </div>
              </div>
            </div>
            <div class="select-list">
              <div class="select-list__title">เลือกรุ่นซ้าย</div>
              <!-- <isu-select
              :textLable="''"
              :valSelect="car1Value"
              :placeholder="'Select car'"
              :listOptions="listCars"
              :nameSelect="'car1Value'"
              @onChangeSelect="getCarSelected1">
              </isu-select> -->
              <isu-select-option-mux 
                v-if="detectMobile === true || detectTablet === true"
                :valSelect="car1Value" 
                :placeholder="'Select car'" 
                :nameSelect="'car1Value'" 
                :listOptions="listCars"
                @onChangeSelect="getCarSelected1"
              >
              </isu-select-option-mux>
              <isu-select-custom
                v-else
                :valSelect="car1Value"
                :placeholder="'Select car'"
                :listOptions="listCars"
                :nameSelect="'car1Value'"
                @onChangeSelect="getCarSelected1"
              ></isu-select-custom>
            </div>
          </div>
        </div>
        <div class="col-lg-6 compare-panel compare-panel--right">
          <div class="compare-model-box">
            <div class="select-color" v-if="isExterior">
              <div class="compare-model__panel__color">
                <div class="panel-list">
                  <div class="panel-list__item " :class="[((rightCarColorIndex === index ? 'active' : '') + ' item-'+index), item.className]" :key="item.Id" v-for="(item, index) in carGradeRight.Colors">
                    <!-- <img src="../../assets/list-panel-1.png" alt=""> -->
                    <span class="panel-list__item__tooltip">{{item.ColorName}}</span>
                    <div class="panel-list__item__color" @click="changeColorRightWrapper(item, carGradeRight, index)"></div>
                  </div>
                  <!-- <div class="panel-list__item">
                    <img src="../../assets/list-panel-2.png" alt="">
                  </div>
                  <div class="panel-list__item">
                    <img src="../../assets/list-panel-3.png" alt="">
                  </div>
                  <div class="panel-list__item">
                    <img src="../../assets/list-panel-4.png" alt="">
                  </div> -->
                </div>
              </div>
              <div class="compare-model__panel__title">
                <div class="panel-title-wrap">
                  <span class="panel-icon-color" :style="{color: activeColorRight}">
                  </span>
                  <span class="panel-title">{{carGradeRight.Colors[rightCarColorIndex] && carGradeRight.Colors[rightCarColorIndex].ColorName}}</span>
                </div>
              </div>
            </div>
            <div class="select-list">
              <div class="select-list__title">เลือกรุ่นขวา</div>
              <!-- <isu-select
              :valSelect="car2Value"
              :placeholder="'Select car'"
              :listOptions="listCars"
              :nameSelect="'car2Value'"
              @onChangeSelect="getCarSelected2">
              </isu-select> -->
              <isu-select-option-mux 
                v-if="detectMobile === true || detectTablet === true"
                :valSelect="car2Value" 
                :placeholder="'Select car'" 
                :nameSelect="'car2Value'" 
                :listOptions="listCars"
                @onChangeSelect="getCarSelected2"
              >
              </isu-select-option-mux>
              <isu-select-custom
                v-else
                :valSelect="car2Value"
                :placeholder="'Select car'"
                :listOptions="listCars"
                :nameSelect="'car2Value'"
                @onChangeSelect="getCarSelected2"
              ></isu-select-custom>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

</template>
<script>
import $ from 'jquery';
import { Text, RichText, Image } from '@sitecore-jss/sitecore-jss-vue';
import IsuSelect from '../shared/IsuSelect';
import IsuSelectCustom from '../shared/IsuSelectCustom';
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';
import { GetEndPoint } from '../../service/genericService';
import { isDesktop } from '../../util/dom.js';
import { changeActiveColor} from '../../util/styleGradient';
import { findClassByColor, getCarGrade } from './compareCarModelService';
import { isMobile, isTablet } from '../../util/dom';
const DEFAULT_COLOR_INDEX = 0;

// // TODO: hard coding due to customer request, remove this when we have better solution
// const SPART_MODEL_ID = '9292a059-7afc-41d4-90b6-7057ba5f38f2';
// const PICKUP_2DOOR_MODEL_ID = 'e0edb79b-0ca0-47c0-9290-2e1a7e1e6e1b';
// const PICKUP_4DOOR_MODEL_ID = '9f7cd7b8-171f-424a-be37-2650ed9f8bfe';
// const SPARK_REMOVE_PATTERN = 'Spark Cab Chassis';
// const PICKUP_2DOOR_REMOVE_PATTERN = 'Spacecab';
// const PICKUP_4DOOR_REMOVE_PATTERN = 'Cab4 1.9 Ddi';
const DEFAULT_SWITCH_TAB_INDEX = 0;
const DEFAULT_LOCATION_RESIZEBTN_PERCENTAGE = 50;
export default {
  name: 'CompareModelCar',
  components: {
    ScText: Text,
    ScRichText: RichText,
    IsuSelect: IsuSelect,
    IsuSelectCustom: IsuSelectCustom,
    IsuSelectOptionMux: IsuSelectOptionMux,
    ScImage: Image,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      rect: null,
      rectLeft: null,
      rectLength: null,
      isDrawing: false,
      cover: null,
      listCars: [],
      car1Value: {},
      car2Value: {},
      listCarGrade: [],
      carGradeLeft: {
        Colors: [],
      },
      carGradeRight: {
        Colors: [],
      },
      leftCarBg: '',
      leftCarColorIndex: 0,
      rightCarBg: '',
      rightCarColorIndex: 0,
      isExterior: true,
      isFront: true,
      activeColorLeft: '',
      activeColorRight: '',
      carFace1: null,
      reziseBtn: null,
      deviceType: 3,
      rearImageLeft : '',
      rearImageRight : '',
      interiorImageLeft : '',
      interiorImageRight : '',
      btnResizeColor : '',
      fallbackBtnResizeColor: '#cd0000',
      carModelTitleId: 0,
      gradeTypeList: [],
      carModelId: '',
      isLoadingLeftImage: false,
      isLoadingRightImage: false,
      previousRightColorId: null,
      previousLeftColorId: null,
      detectMobile: undefined,
      detectTablet: undefined,
      isEditing: false,
    };
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.detectTablet = isTablet(this.deviceType);
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    this.isDrawing = false;
    this.cover = $('.compare-model__car__face2');
    this.carFace1 = $('.compare-model__car__face1');
    this.reziseBtn = $('.compare-model__car__rezise');
    this.init();
    this.getRect();
    window.addEventListener('resize', this.getRect);
    this.getData();
    this.$root.$on('setDefaultLineGradeSelection', (data) => {
      this.setDefaultGradeLineCenter();
    });
  },
  methods: {
    imageLeftOnLoad() {
      this.isLoadingLeftImage = false;
    },
    imageRightOnLoad() {
      this.isLoadingRightImage = false;
    },
    getData() {
      this.pageData = this.$jss.routeData().fields;
      this.btnResizeColor = this.$jss.routeData()?.fields?.LineColor?.fields?.ColorCode?.value || this.fallbackBtnResizeColor;
      this.carModelId = this.pageData?.CarModel?.id || '';

      if (this.fields?.GradeType?.length) {
        this.gradeTypeList = this.fields?.GradeType;
      } else {
        this.gradeTypeList = [];
      }
      const gradeTypeId = this.fields?.GradeType?.[DEFAULT_SWITCH_TAB_INDEX]?.id || '';
      // INFO: we need to do this when the car grade change
      this.selectExterial(true);
      this.selectFront(true);
      this.resetCompareData()
      this.isLoadingLeftImage = true;
      this.isLoadingRightImage = true;
      getCarGrade(this.carModelId, gradeTypeId , DEFAULT_SWITCH_TAB_INDEX)
        .then(this.getCarGradeHandler)
        .catch(() => {
          this.isLoadingLeftImage = false;
          this.isLoadingRightImage = false;
        });
    },

    switchCarModel(carModelTitleId, typeId) {
      this.carModelTitleId = carModelTitleId;
      this.resetCompareData();
      this.selectExterial(true);
      this.selectFront(true);
      this.isLoadingLeftImage = true;
      this.isLoadingRightImage = true;
      getCarGrade(this.carModelId, typeId, carModelTitleId)
      .then(this.getCarGradeHandler)
      .catch(() => {
        this.isLoadingLeftImage = false;
        this.isLoadingRightImage = false;
      });
    },

    checkSwitchModelValid() {
      return this.fields?.GradeType?.length > 0;
    },

    resetCompareData() {
      this.listCarGrade = [];
      this.listCars = [];
      this.car1Value = {};
      this.car2Value = {};
      this.carGradeLeft = {
        Colors: [],
      };
      this.carGradeRight = {
        Colors: [],
      };
      this.leftCarBg = '';
      this.rightCarBg = '';
    },

    getCarGradeHandler(data) {
      // INFO: set it when image is fully loaded
      // this.isLoadingImage = false;
      if (data?.data?.Records?.length) {

        data.data.Records.forEach((element) => {
          this.listCarGrade.push(element);
        });

        let defaultCarGradeLeftId = data.data.CarGradeDefaultLeft;
        let defaultCarGradeRightId = data.data.CarGradeDefaultRight;

        let defaultCarGradeLeft = this.listCarGrade?.[0] || {
          Id: '',
          Title: '',
        }

        let defaultCarGradeRight = this.listCarGrade?.[1] || {
          Id: '',
          Title: '',
        }

        // INFO: set default grade color left
        // this.carGradeLeft = this.listCarGrade?.[0] || {};
        this.carGradeLeft =
          this.listCarGrade.find((item) => item.Id === defaultCarGradeLeftId) || defaultCarGradeLeft;
        this.getClassByColorLeft();
        this.car1Value = {
          id: this.carGradeLeft.Id,
          label: this.carGradeLeft.Title,
        };

        // INFO: set default grade color right
        // this.carGradeRight = this.listCarGrade?.[1] || {};
        this.carGradeRight =
          this.listCarGrade.find((item) => item.Id === defaultCarGradeRightId) || defaultCarGradeRight;
        this.getClassByColorRight();
        this.car2Value = {
          id: this.carGradeRight.Id,
          label: this.carGradeRight.Title,
        };

        // INFO: change color LEFT based on default color Index which is 0
        // this.changeColorLeft(
        //   this.carGradeLeft?.Colors?.[this.leftCarColorIndex] || '',
        //   this.carGradeLeft,
        //   this.leftCarColorIndex
        // );

        let colorLeftId = this.carGradeLeft.CarColorDefaultLeft;
        let colorLeft = this.carGradeLeft.Colors.find(color => color.Id === colorLeftId);
        if (!colorLeft) {
          this.activeColorLeft = this.carGradeLeft?.Colors?.[0].ColorCode;
        }
        this.leftCarColorIndex = this.carGradeLeft.Colors.findIndex(
          (color) => color.Id === colorLeftId
        );
        if (this.leftCarColorIndex < 0) {
          this.leftCarColorIndex = DEFAULT_COLOR_INDEX;
          this.leftCarBg = this.carGradeLeft?.Colors?.[0].Image;
        }
        if (colorLeft && this.leftCarColorIndex >= 0) {
          this.previousLeftColorId = colorLeft.Id;
          this.changeColorLeft(colorLeft, this.carGradeLeft, this.leftCarColorIndex);
        }

        // INFO: find color right id to avoid collision
        // let colorRightId = this.findDefaultRightColor(
        //   this.carGradeLeft?.Colors?.[this.leftCarColorIndex]?.ColorCode || ''
        // );
        let findColorRight = this.carGradeRight.Colors.find(item => item.ColorCode === this.activeColorRight);
        if(!findColorRight){
          this.activeColorRight = this.carGradeRight?.Colors?.[0].ColorCode;
        }

        let colorRightId = this.carGradeRight.CarColorDefaultRight;
        let colorRight = this.carGradeRight.Colors.find(color => color.Id === colorRightId);
        this.rightCarColorIndex = this.carGradeRight.Colors.findIndex(
          (color) => color.Id === colorRightId
        );
        if (this.rightCarColorIndex < 0) {
          this.rightCarColorIndex = DEFAULT_COLOR_INDEX;
          this.rightCarBg = this.carGradeRight?.Colors?.[0].Image;
        }
        if (colorRight && this.rightCarColorIndex >= 0) {
          this.previousRightColorId = colorRight.Id;
          this.changeColorRight(colorRight, this.carGradeRight, this.rightCarColorIndex);
        }
        // INFO : If cannot select right color which is differernt to left color
        // if (!colorRightId) {
        //   this.rightCarColorIndex = 0;
        // } else {
        //   // INFO: If we can find different color
        //   if (this.carGradeRight?.Colors?.length) {
        //     this.carGradeRight.Colors.forEach((item, index) => {
        //       if (item.Id == colorRightId) {
        //         this.rightCarColorIndex = index;
        //       }
        //     });
        //   }
        // }

        // INFO: Change color right

        // this.changeColorRight(
        //   this.carGradeRight?.Colors?.[this.rightCarColorIndex] || '',
        //   this.carGradeRight,
        //   this.rightCarColorIndex
        // );

        // INFO: get listCars for dropdown list left and right
        if (this.listCarGrade?.length) {
          this.listCars = this.listCarGrade.map((item) => {
            return {
              label: item.Title,
              id: item.Id,
            };
          });

          // // INFO: make sure that at default scenario, the includes() always return false to display all value
          // let removePattern = '___';
          // switch (this.carModelId) {
          //   case SPART_MODEL_ID :
          //     removePattern = SPARK_REMOVE_PATTERN;
          //     break;
          //   case PICKUP_2DOOR_MODEL_ID :
          //     removePattern = PICKUP_2DOOR_REMOVE_PATTERN;
          //     break;
          //   case PICKUP_4DOOR_MODEL_ID :
          //     removePattern = PICKUP_4DOOR_REMOVE_PATTERN;
          //     break;
          //   default:
          //     break;
          // }

          // this.listCars = this.listCars.filter((carItem) => {
          //   return !carItem.label.includes(removePattern);
          // });
        }
      }
    },
    getClassByColorLeft(){
      this.carGradeLeft.Colors = this.carGradeLeft.Colors.map(item => {
        return {
          ...item,
          className: findClassByColor(item.ColorCode),
        }
      })
    },
    getClassByColorRight(){
      this.carGradeRight.Colors = this.carGradeRight.Colors.map(item => {
        return {
          ...item,
          className: findClassByColor(item.ColorCode),
        }
      })
    },
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
    init() {
      $('.compare-model__car').on('mousedown', (event) => {
        this.isDrawing = true;
      });

      $('.compare-model__car').on('mouseup', (event) => {
        this.isDrawing = false;
      });
      this.$refs.movedCar.ontouchmove = this.handleMoveCarFace1Mobile;
      $('.compare-model__car').on('click', this.handleClickCarFace1)
    },

    getLimitPercent(){
      let mainCompareCar = this.$el.querySelector('.compare-model__car');
      let mainWidth = mainCompareCar.offsetWidth + 50;
      let limitPecentLeft = (30/mainWidth) * 100;
      return limitPecentLeft;
    },

    limitPercentLeft(percentage){
      if(percentage < this.getLimitPercent()) return this.getLimitPercent();
      if(percentage > (100 - this.getLimitPercent())) return 100 - this.getLimitPercent();
      return percentage;
    },

    handleClickCarFace1(e) {
      let x = e.clientX - this.rectLeft;
      if (x < 0) x = 0;
      if (x > this.rectLength) x = this.rectLength;
      let percentage = Math.floor((x / this.rectLength) * 100);
      let limitPercentLeft = this.limitPercentLeft(percentage);
      if(percentage < limitPercentLeft || percentage > limitPercentLeft){
        percentage = limitPercentLeft;
      }
      this.cover.css('width', `${percentage}%`);
      this.reziseBtn.css('left', `${limitPercentLeft}%`);
      // this.cover.css('clipPath', `inset(0 ${100 - percentage}% 0 0)`);
      // this.cover.css('webkitClipPath', `inset(0 ${100 - percentage}% 0 0)`);
      // this.cover.css('mozClipPath ', `inset(0 ${100 - percentage}% 0 0)`);
      // this.cover.css('msClipPath ', `inset(0 ${100 - percentage}% 0 0)`);
      this.carFace1.css('clipPath', `inset(0 0 0 ${percentage}%)`);
      this.carFace1.css('webkitClipPath', `inset(0 0 0 ${percentage}%)`);
      this.carFace1.css('mozClipPath', `inset(0 0 0 ${percentage}%)`);
      this.carFace1.css('msClipPath', `inset(0 0 0 ${percentage}%)`);
    },
    handleMoveCarFace1(e) {
      if (this.isDrawing) {
        let x = e.clientX - this.rectLeft;
        if (x < 0) x = 0;
        if (x > this.rectLength) x = this.rectLength;

        let percentage = Math.floor((x / this.rectLength) * 100);
        let limitPercentLeft = this.limitPercentLeft(percentage);
        if(percentage < limitPercentLeft || percentage > limitPercentLeft){
          percentage = limitPercentLeft;
        }
        this.cover.css('width', `${percentage}%`);
        this.reziseBtn.css('left', `${limitPercentLeft}%`);
        // this.cover.css('clipPath', `inset(0 ${100 - percentage}% 0 0)`);
        this.carFace1.css('clipPath', `inset(0 0 0 ${percentage}%)`);
      }
    },
    handleMoveCarFace1Mobile(e) {
      let x = e.touches?.[0]?.clientX - this.rectLeft;
      if (x < 0) x = 0;
      if (x > this.rectLength) x = this.rectLength;

      let percentage = Math.floor((x / this.rectLength) * 100);
      let limitPercentLeft = this.limitPercentLeft(percentage) ;
      if(percentage < limitPercentLeft || percentage > limitPercentLeft){
          percentage = limitPercentLeft;
      }
      this.cover.css('width', `${percentage}%`);
      this.reziseBtn.css('left', `${limitPercentLeft}%`);
      // this.cover.css('clipPath', `inset(0 ${100 - percentage}% 0 0)`);
      // this.cover.css('webkitClipPath', `inset(0 ${100 - percentage}% 0 0)`);
      // this.cover.css('mozClipPath ', `inset(0 ${100 - percentage}% 0 0)`);
      // this.cover.css('msClipPath ', `inset(0 ${100 - percentage}% 0 0)`);
      this.carFace1.css('clipPath', `inset(0 0 0 ${percentage}%)`);
      this.carFace1.css('webkitClipPath', `inset(0 0 0 ${percentage}%)`);
      this.carFace1.css('mozClipPath', `inset(0 0 0 ${percentage}%)`);
      this.carFace1.css('msClipPath', `inset(0 0 0 ${percentage}%)`);
    },
    getCarSelected1(carSelected1) {
      this.carGradeLeft = {
        ...this.listCarGrade.find((item) => item.Id === carSelected1.value?.id),
      };
      this.getClassByColorLeft();
      // INFO : select first color after changed car grade
      if(this.carGradeLeft?.Colors?.length){
        let defaultCarColorLeftId = this.carGradeLeft.CarColorDefaultLeft;
        this.leftCarColorIndex = this.carGradeLeft.Colors.findIndex(
          (color) => color.Id === defaultCarColorLeftId
        );

        if (this.leftCarColorIndex < 0) {
          this.leftCarColorIndex = DEFAULT_COLOR_INDEX;
        }
        if (this.carGradeLeft?.Colors?.[this.leftCarColorIndex]) {
          this.previousLeftColorId = this.carGradeLeft?.Colors?.[this.leftCarColorIndex].Id;
        }
        this.changeColorLeft(
          this.carGradeLeft?.Colors?.[this.leftCarColorIndex] || '',
          this.carGradeLeft,
          this.leftCarColorIndex
        )
      }
    },
    getCarSelected2(carSelected2) {
      this.carGradeRight = {
        ...this.listCarGrade.find((item) => item.Id === carSelected2.value?.id),
      };
      this.getClassByColorRight();
      // INFO : select first color after changed car grade
      if(this.carGradeRight?.Colors?.length){
        let defaultCarColorRightId = this.carGradeRight.CarColorDefaultRight;
        this.rightCarColorIndex = this.carGradeRight.Colors.findIndex(
          (color) => color.Id === defaultCarColorRightId
        );

        if (this.rightCarColorIndex < 0) {
          this.rightCarColorIndex = DEFAULT_COLOR_INDEX;
        }
        if (this.carGradeRight?.Colors?.[this.rightCarColorIndex]) {
          this.previousRightColorId = this.carGradeRight?.Colors?.[this.rightCarColorIndex].Id;
        }
        this.changeColorRight(
          this.carGradeRight?.Colors?.[this.rightCarColorIndex] || '',
          this.carGradeRight,
          this.rightCarColorIndex
        )
      }
    },
    changeColorLeftWrapper(color, carGrade, leftIndex) {
      if (color.Id === this.previousLeftColorId) return;
      this.previousLeftColorId = color.Id;
      this.changeColorLeft(color, carGrade, leftIndex);
    },
    changeColorLeft(color, carGrade, leftIndex) {
      let colorImage;
      this.leftCarColorIndex = leftIndex;
      this.rearImageLeft = color.RearImage;
      this.interiorImageLeft = carGrade.InteriorImage;
      this.isLoadingLeftImage = true;
      if (isDesktop(this.deviceType)) {
        colorImage = this.isFront ? color.Image : color.RearImage;
        this.leftCarBg = this.isExterior ? colorImage : carGrade.InteriorImage;
      } else {
        colorImage = this.isFront ? color.ImageSm : color.RearImage;
        this.leftCarBg = this.isExterior ? colorImage : carGrade.InteriorImage;
      }
      this.activeColorLeft = changeActiveColor(color.ColorCode);
    },
    changeColorRightWrapper(color, carGrade, rightIndex) {
      if (color.Id === this.previousRightColorId) return;
      this.previousRightColorId = color.Id;
      this.changeColorRight(color, carGrade, rightIndex);
    },
    changeColorRight(color, carGrade, rightIndex) {
      let colorImage;
      this.rightCarColorIndex = rightIndex;
      this.rearImageRight = color.RearImage;
      this.interiorImageRight = carGrade.InteriorImage;
      this.isLoadingRightImage = true;
      if (isDesktop(this.deviceType)) {
        colorImage = this.isFront ? color.Image : color.RearImage;
        this.rightCarBg = this.isExterior ? colorImage : carGrade.InteriorImage;
      } else {
        colorImage = this.isFront ? color.ImageSm : color.RearImage;
        this.rightCarBg = this.isExterior ? colorImage : carGrade.InteriorImage;
      }
      this.activeColorRight = changeActiveColor(color.ColorCode);
    },
    selectExterial(isExterior) {
      if (this.isExterior == isExterior) return;
      this.setDefaultGradeLineCenter();
      //INFO : Add class to style interior component
      if(!isExterior){
        this.$el.querySelector('.compare-model__wrap').classList.add('compare-model--interior');
        this.$el.querySelector('.compare-model__car').classList.remove('active');
      }else{
        this.$el.querySelector('.compare-model__wrap').classList.remove('compare-model--interior');
        this.$el.querySelector('.compare-model__car').classList.add('active');
      }
      this.isExterior = isExterior;
      // this.isLoadingImage = true;
      this.changeColorLeft(
        this.carGradeLeft?.Colors?.[this.leftCarColorIndex] || '',
        this.carGradeLeft,
        this.leftCarColorIndex
      );
      this.changeColorRight(
        this.carGradeRight?.Colors?.[this.rightCarColorIndex] || '',
        this.carGradeRight,
        this.rightCarColorIndex
      );
    },
    selectFront(isFront) {
      if (this.isFront == isFront) return;
      this.setDefaultGradeLineCenter();
      this.isFront = isFront;
      this.changeColorLeft(
        this.carGradeLeft?.Colors?.[this.leftCarColorIndex] || '',
        this.carGradeLeft,
        this.leftCarColorIndex
      );
      this.changeColorRight(
        this.carGradeRight?.Colors?.[this.rightCarColorIndex] || '',
        this.carGradeRight,
        this.rightCarColorIndex
      );
    },
    findDefaultRightColor(leftColor) {
      let colorId;
      // INFO: filter the list of differrent color
      let findDiffColor = this.carGradeRight?.Colors?.filter(
        (item) => item.ColorCode != leftColor
      ).map((item) => item.Id);
      // INFO: if we have different color, get value 0 by default
      if (findDiffColor?.length) {
        colorId = findDiffColor?.[0];
      }
      return colorId;
    },
    // getColor(color){
    //   return getCarColor(color);
    // },
    getRect() {
      if ($('.compare-model__car__face1').length) {
        setTimeout(() => {
          this.rect = $('.compare-model__car__face1')[0].getBoundingClientRect();
          this.rectLeft = this.rect.left;
          this.rectLength = this.rect.width;
        }, 200)
      }
    },
    // changeBorderColorActive(color, position){
    //   let side = position === 'left' ? '.compare-panel--left' : '.compare-panel--right';
    //   if($(`${side} .style-border`).length){
    //     $(`${side} .style-border`).remove();
    //   }
    //   this.$nextTick(() => {
    //     $(`${side} .panel-list__item.active`).append(`<style class="style-border">
    //       ${side} .panel-list__item.active::before,
    //       ${side} .panel-list__item.active::after,
    //       ${side} .panel-list__item.active .panel-list__item__color::before,
    //       ${side} .panel-list__item.active .panel-list__item__color::after
    //       { background-color : ${color} !important;}</style>`);
    //   })
    // },
    // hoverCarColor(color, index, position){
    //   let side = position === 'left' ? '.compare-panel--left' : '.compare-panel--right';
    //   if($(`${side} .style-border-hover`).length){
    //     $(`${side} .style-border-hover`).remove();
    //   }
    //   this.$nextTick(() => {
    //     $(`${side} .panel-list__item.item-${index}`).append(`<style class = "style-border-hover">
    //       ${side} .panel-list__item.item-${index}:hover::before,
    //       ${side} .panel-list__item.item-${index}:hover::after,
    //       ${side} .panel-list__item.item-${index} .panel-list__item__color:hover::before,
    //       ${side} .panel-list__item.item-${index} .panel-list__item__color:hover::after
    //         { background-color : ${color} !important;}</style>`
    //     );
    //   })
    // },
    setDefaultGradeLineCenter() {
      this.cover.css('width', `${DEFAULT_LOCATION_RESIZEBTN_PERCENTAGE}%`);
      this.reziseBtn.css('left', `${DEFAULT_LOCATION_RESIZEBTN_PERCENTAGE}%`);
      this.carFace1.css('clipPath', `inset(0 0 0 ${DEFAULT_LOCATION_RESIZEBTN_PERCENTAGE}%)`);
      this.carFace1.css('webkitClipPath', `inset(0 0 0 ${DEFAULT_LOCATION_RESIZEBTN_PERCENTAGE}%)`);
      this.carFace1.css('mozClipPath', `inset(0 0 0 ${DEFAULT_LOCATION_RESIZEBTN_PERCENTAGE}%)`);
      this.carFace1.css('msClipPath', `inset(0 0 0 ${DEFAULT_LOCATION_RESIZEBTN_PERCENTAGE}%)`);
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.getRect);
  },
  watch: {
    fields: function(newFields) {
      this.getData();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.switch-model {
  display: flex;
  position: relative;
  padding: 20px 0;

  @include media-breakpoint-up(md) {
    // margin: 0 15px;
    padding: calc(.97087vw + 16.35922px) 0; // INFO: based on customer site
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: -webkit-gradient(linear,left bottom,left top,from(#ededed),to(#fff));
    background: linear-gradient(0deg,#ededed,#fff);

    @include media-breakpoint-up(lg) {
      display: none;
    }
  }

  &__item {
    position: relative;
    width: 50%;
    color: #cfcece;
    // INFO: based on customer site
    font-size: calc(1.87793vw + 1.895775rem);
    line-height: 1;
    font-family: Eurothai-Xbold-Extit;
    text-transform: uppercase;
    transition: color 0.5s ease;
    cursor: pointer;

    @include media-breakpoint-up(xl) {
      // INFO: based on customer site
      font-size: 4.6rem;
    }

    &:first-child {
      text-align: right;
      padding-right: 25px;

      @include media-breakpoint-up(md) {
        padding-right: 30px;
      }

      @include media-breakpoint-up(lg) {
        padding-right: 35px;
      }

      @include media-breakpoint-up(xl) {
        padding-right: 50px;
      }

      &::after {
        position: absolute;
        content: '';
        right: -1px;
        top: 50%;
        bottom: auto;
        transform: translateY(-50%);
        width: 1px;
        height: 100%;
        background-color: #222;

        @include media-breakpoint-up(lg) {
          width: 2px;
        }
      }
    }

    &:last-child {
      text-align: left;
      padding-left: 25px;

      @include media-breakpoint-up(md) {
        padding-left: 30px;
      }

      @include media-breakpoint-up(lg) {
        padding-left: 35px;
      }

      @include media-breakpoint-up(xl) {
        padding-left: 50px;
      }
    }

    span {
      &:hover {
        color: #ed1c24;
      }

      &.active-switch {
        color: #ed1c24;
      }
    }
  }

  &.no-switch-model {
    padding: 0;

    @include media-breakpoint-up(lg) {
      padding: 50px 0 0 0;
    }
  }
}

.in-out-image,
.front-rear-image {
  padding-top: 30px;

  @include media-breakpoint-up(md) {
    padding-top: 50px;
  }

  &__item {
    width: 135px;
    display: inline-block;
    border: solid 1px #000;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 2.1rem;

    @include media-breakpoint-up(xs) {
      width: 150px;
    }

    &--left {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &--right {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      &.disabled {
        pointer-events: none;
        opacity: .5;
      }
    }
  }

  .active {
    // font-weight: bold;
    color: $white;
    background: #000
  }
}

.front-rear-image {
  margin-top: 25px;

  @include media-breakpoint-up(md) {
    margin-top: 20px;
  }
}

.compare-model {
  text-align: center;
  position: relative;
  margin-bottom: -25px;
  z-index: $COMPARE_CAR_MODAL_ZINDEX;
  font-family: $font-family-eurothai;

  @include media-breakpoint-up(lg) {
    margin-bottom: 0;
  }

  @include media-breakpoint-up(xl) {
    margin-bottom: -30px;
  }

  &__heading {
    padding: 33px 0 0;
    margin-bottom: -25px;

    @include media-breakpoint-up(md) {
      margin-bottom: -40px;
    }

    @include media-breakpoint-up(lg) {
      padding: 50px 0 0;
    }

    &__title {
      font-size: 4rem; //INFO: Follow customer's website
      font-weight: bold;

      @include media-breakpoint-up(md) {
        font-size: calc(1.0356vw + 36.1165px); //INFO: Follow customer's website
      }

      @include media-breakpoint-up(xl) {
        font-size: 5.6rem;
      }

      >>> p {
        margin: 0;
      }
    }

    &__desc {
      max-width: 810px;
      margin: 10px auto 0;

      @include media-breakpoint-up(lg) {
        margin: 10px auto;
      }
    }
  }

  &--interior {
    .compare-model {
      &__car {

        &__face1,
        &__face2 {
          @include media-breakpoint-up(xs) {
            background-size: cover;
          }
        }
        // TODO: keep that comment until the solution is done
        // &__rezise {
        //   &__line {
        //     height: calc(86% - 5px);
        //     margin-top: 37px;

        //     @include media-breakpoint-up(xs) {
        //       height: calc(110% - 18px);
        //       margin-top: 0;
        //     }

        //     @include media-breakpoint-up(md) {
        //       height: calc(101% - 4px);
        //     }

        //     @include media-breakpoint-up(lg) {
        //       height: 100%;
        //     }
        //   }
        // }
      }
    }
  }

  .compare-model-interior {
    @include media-breakpoint-up(lg) {
      .select-list {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  &__wrap {
    position: relative;
    // INFO: padding-top based on customer site
    // padding: calc(.97087vw + 16.35922px) 0 0 0;
    padding: 0;

    @include media-breakpoint-up(md) {
      // padding: calc(.97087vw + 16.35922px) 0 0 0;
    }

    picture {
      position: absolute;
      left: 0;
      display: block;
      width: 100%;

      @include media-breakpoint-up(lg) {
        padding: 0 15px;
      }
      img {
        width: 100%;
        height: auto;

        @include media-breakpoint-up(md) {
          max-height: 430px;
        }
      }
    }
  }

  &__bgr {
    width: 100%;

    &::selection {
      background: none;
    }
  }

  &__car {
    width: 100%;
    position: relative;

    &.active-interior {
      @include media-breakpoint-up(lg) {
        margin: 0 auto;
        max-width: 860px;
        padding: 0;
      }
    }

    @mixin min-height-image() {
      // INFO: this is hard coded by the ratio of the front image of each model
      @include media-breakpoint-down(xs) {
        height: 100vw * 875/1505;
      }

      @include media-breakpoint-up(sm) {
        min-height: 314px;
      }

      @include media-breakpoint-up(md) {
        min-height: 401px;
      }
      @include media-breakpoint-up(lg) {
        min-height: 500px;
      }
    }

    @include min-height-image();
    &__face1 {
      clip-path: inset(0 0 0 50%);
      user-select: none;
      overflow: hidden;
      opacity: 0;

      &.not-loading {
        transition: opacity 0.3s ease-in-out;
        opacity: 1;
      }



      &__img {
        width: 100%;
        max-width: unset;
        user-select: none;
        pointer-events: none;

        @include min-height-image();
      }
    }

    &__face2 {
      width: 50%;
      height: 100%;
      position: absolute;
      top: 0;
      // INFO: make it 1px but NOT 0 to remove the white line when change color
      left: 1px;
      overflow: hidden;
      backface-visibility: hidden;
      user-select: none;
      opacity: 0;
      &.not-loading {
        transition: opacity 0.3s ease-in-out;
        opacity: 1;
      }

      &__img {
        height: 100%;
        width: auto;
        max-width: unset;
        user-select: none;
        pointer-events: none;
        @include min-height-image();
      }
    }

    &__rezise {
      position: absolute;
      left: 50%;
      height: 100%;
      top: 0;

      &__line {
        position: relative;
        width: 1px;
        background-color: #000;
        height: 100%;
        margin-top: 4px;
        transition: height .5s ease-in-out;

        @include media-breakpoint-up(md) {
          height: 100%;
          margin-top: 0;
        }
      }

      &__btn {
        position: absolute;
        left: 50%;
        bottom: -20px;
        transform: translateX(-50%);
        width: 48px;
        height: 48px;
        background-color: #cd0000;
        border-radius: 50em;
        cursor: e-resize;
        background-image: url('../../assets/double-chevron.svg');
        background-size: 20px;
        background-position: center;
        background-repeat: no-repeat;

        @include media-breakpoint-up(md) {
          bottom: -25px;
        }

        @include media-breakpoint-up(lg) {
          bottom: -30px;
          right: -5px;
          width: 60px;
          height: 60px;
          background-size: 26px;
        }
      }
    }
  }

  &__picture {
    position: relative;
  }

  &__panel {
    margin-top: 45px;

    @include media-breakpoint-up(lg) {
      margin-top: 80px;
    }

    &__color {
      position: relative;
      padding: 0 70px;

      @include media-breakpoint-up(sm) {
        padding: 0 20px;
      }

      @include media-breakpoint-up(lg) {
        padding: 0;
      }
    }

    &__title {
      padding: 20px 10px 20px;

      @include media-breakpoint-up(sm) {
        padding: 20px 0 20px;
        font-size: 1.7rem;
      }

      @include media-breakpoint-up(lg) {
        font-size: $font-size-base;
        text-align: left;
        padding: 25px 0 15px 0;
      }

      &--left {
        text-align: center;

        @include media-breakpoint-up(lg) {
          text-align: right;
        }
      }
    }

    .compare-panel {
      position: relative;

      &--left {
        z-index: 1;

        .panel-list {
          @include media-breakpoint-up(lg) {
            justify-content: flex-end;
          }
        }
      }

      &--right {
        z-index: 1;

        .panel-list {
          @include media-breakpoint-up(lg) {
            justify-content: flex-start;
          }
        }
      }
    }
  }

  $select-list-z-index: 1;
  $select-color-z-index: 0;

  .select-list {
    padding-bottom: 0;
    position: relative;
    z-index: $select-list-z-index;
    border-top: 1px solid #ccc;

    @include media-breakpoint-up(lg) {
      padding-bottom: 15px;
    }

    @include media-breakpoint-up(xl) {
      width: 70%;
    }

    &__title {
      text-align: left;
      padding: 15px 0 0 15px;
      font-size: 16px;

      @include media-breakpoint-up(lg) {
        display: none;
      }
    }
  }

  .select-color {
    order: 2;
    position: relative;
    z-index: $select-color-z-index;

    @include media-breakpoint-up(lg) {
      order: 0;
    }

    @include media-breakpoint-up(xl) {
      width: 70%;
    }
  }

  .compare-model-bgr-car {
    position: relative;
    z-index: 1;

    > .no-pd-container-mb {
      padding-top: 30px;

      @include media-breakpoint-up(lg) {
        padding-top: 50px;
      }
    }
  }

  .compare-model-box {
    padding-bottom: 15px;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;

    @include media-breakpoint-up(lg) {
      align-items: center;
    }
  }

  .panel-title-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    transform: skewX(-24deg);
  }

  .panel-icon-color {
    background-color: currentColor;
    color: #7c0413;
    height: 20px;
    width: 10px;

    @include media-breakpoint-up(lg) {
      height: 100%;
    }
  }

  .panel-title {
    padding: 1px 15px 0;
    transform: skewX(24deg);
    font-family: $font-family-eurothai-demi;
    font-size: 2rem;
  }

  .panel-list {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    // INFO: this is when we don't have data to compare, we need to guarantee layout wont break
    min-height: 37px;

    &__item {
      position: relative;
      display: inline-block;
      position: relative;
      padding: 3px;
      transform: skewX(-24deg);

      @include media-breakpoint-up(xs) {
        padding: 4px;
      }

      @include media-breakpoint-up(md) {
        padding: 5px;
      }

      &:hover {
        @include hover-desktop {
          .panel-list__item__tooltip {
            opacity: 1;
          }
        }
      }

      &:after,
      &:before {
        content: "";
        width: 1px;
        height: 0;
        background: transparent;
        position: absolute;
        left: 0;
        top: 0;
        transition: 0.5s;
        display: block;
      }

      &:before {
        right: 0;
        left: auto;
      }

      &.active {

        &:after,
        &:before {
          height: 100%;
          background: $black;
        }

        .panel-list__item__color {
          &:after,
          &:before {
            width: 100%;
            background: $black;
          }
        }
      }

      @include hover-desktop() {
        &:hover {
          &:after,
          &:before {
            height: 100%;
            background: $black;
          }

          .panel-list__item__color {
            &:after,
            &:before {
              width: 100%;
              background: $black;
            }
          }
        }
      }

      // COLOR ITEM
      // /////////////////////
      // white color
      &.everest-pearl-white {
        .panel-list__item__color {
          @include color-item(#f0f0ed, #f5f5f5, #d6d6d6);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #d6d6d6;
          }
        }
      }

      // Light gray color
      &.siberian-white {
        .panel-list__item__color {
          @include color-item(#f7f7f7, #f2f2f2, #dddddd);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #dddddd;
          }
        }
      }

      // Silver
      &.arctic-silver {
        .panel-list__item__color {
          @include color-item(#bababa, #e2e1e1, #a8a8a8);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #a8a8a8;
          }
        }
      }

      // Gray
      &.zermatt-money {
        .panel-list__item__color {
          @include color-item(#393d40, #717579, #303030);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #717579;
          }
        }
      }

      // Black
      &.bavarian-black-mica {
        .panel-list__item__color {
          @include color-item(#000, #2c2c2c, #080808);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #2c2c2c;
          }
        }
      }

      // Red
      &.etna-red {
        .panel-list__item__color {
          @include color-item(#990005, #c30e36, #880016);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #c30e36;
          }
        }
      }

      // Blue
      &.polynesian-blue {
        .panel-list__item__color {
          @include color-item(#002b64, #206ec4, #001c50);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #206ec4;
          }
        }
      }

      // Orange
      &.valencia-topas-metallic {
        .panel-list__item__color {
          @include color-item(#a93d18, #df5223, #862208);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #df5223;
          }
        }
      }

      // Tooltip
      &__tooltip {
        position: absolute;
        bottom: calc(100% + 10px);
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        font-size: 1.7rem; // INFO : follow fontsize on current site
        line-height: 2.5rem; // INFO : follow line height on current site
        color: #fff;
        pointer-events: none;
        white-space: nowrap;
        background-color: #383838;
        border-radius: 3px;
        padding: 1px 10px;
        margin-left: 7px;
        transition: transform .3s ease-out;
        display: none;

        @include hover-desktop() {
          opacity: 0;
          display: block;
        }

        @include media-breakpoint-up(lg) {
          bottom: calc(100% + 13px);
        }

        &:after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          right: auto;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #383838;
        }
      }

      &__color {
        // background: url('../../assets/mask-color.png');
        // background-size: contain;
        width: 40px;
        height: 24px;
        cursor: pointer;

        @include media-breakpoint-up(xs) {
          width: 45px;
          height: 27px;
        }

        @include media-breakpoint-up(md) {
          width: 54px;
          height: 33px;
        }

        @include media-breakpoint-up(xl) {
          width: 66px;
          height: 40px;
        }

        &:after,
        &:before {
          content: "";
          height: 1px;
          width: 0;
          background: transparent;
          position: absolute;
          top: 0;
          right: 0;
          transition: 0.5s;
          display: block;
        }

        &:before {
          top: auto;
          bottom: 0;
        }
      }
    }
  }

  .no-pd-container-mb {
    padding-right: 0;
    padding-left: 0;

    @include media-breakpoint-up(md) {
      padding-right: 15px;
      padding-left: 15px;
    }
  }

  // Customize Isu Select
  >>> .vs__dropdown-toggle {
    border: none;
    // border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    padding: 0 10px 12px 5px;

    @include media-breakpoint-up(lg) {
      padding: 10px 10px 12px 5px;
    }
  }

  >>> .vs__dropdown-menu {
    display: block;
    padding: 16px 30px 0 18px;
    left: 0;
    z-index: 2;
    background: $white;
    border: 1px solid #e3e3e3;
    width: 100%;
    box-shadow: none;
  }

  >>> .vs__dropdown-option {
    border-bottom: 1px solid #e3e3e3;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }
  }

  >>> .vs__dropdown-option--highlight {
    background-color: $gray-400;
    color: $white;
    margin: 0 -30px;
    padding-left: 30px;
  }

  >>> .vs__open-indicator {
    background: url('../../assets/select-car-compare-mobile.svg');
    background-size: 14px;
    background-repeat: no-repeat;
    height: 10px;
    width: 17px;

    @include media-breakpoint-up(lg) {
      background: url('../../assets/select-car-compare.svg');
      background-size: 17px;
      background-repeat: no-repeat;
      width: 17px;
      height: 10px;
    }
  }

  & >>> .vs__actions,
  >>> .isu-select__actions {
    padding-top: 0;
  }

  >>> .vs__actions,
  >>> .isu-select__actions {
    padding-right: 12px;
  }

  >>> .vs__search {
    padding: 0 3px;
  }

  >>> .v-select {
    @include media-breakpoint-up(xl) {
      width: auto;
    }
  }

  .isu-select {
    font-size: 2.3rem;
    font-family: $font-family-eurothai;
    width: 100%;
  }

  //INFO: style select-box IsuSelectOptionMux apply for CompareCarModel only
  .isu-select-option-mux {
    font-size: 2.3rem;
    font-family: $font-family-eurothai;
    margin-bottom: 20px;

    >>> select {
      border: none;
      padding: 0 35px 0 17px;
      border-bottom: 1px solid #ccc;
      background: url('../../assets/select-car-compare-mobile.svg');
      background-repeat: no-repeat;
      background-position-x: calc(100% - 15px);
      background-position-y: 50%;
    }
  }
}
</style>