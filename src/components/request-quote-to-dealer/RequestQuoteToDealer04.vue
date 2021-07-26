<template>
  <div class="test-drive__infoForm">
    <div class="container test-drive__infoForm__wrap">
      <div class="test-drive__infoForm__number">04</div>
      <div class="test-drive__infoForm__title">
        <h2 class="isu-title">ระบุข้อมูลของท่าน</h2>
      </div>
      <form class="test-drive__form">
        <div class="test-drive__form__information">
            <div class="row">
              <div class="col-md-6 infoForm-col">
                <isu-input
                :typeInput="'text'"
                :textLable="'ชื่อ'"
                :required="true"
                :valInput="vName"
                :nameInput="'vName'"
                @inputChange="getDataInput"/>
                <isu-input
                :typeInput="'text'"
                :textLable="'นามสกุล'"
                :required="true"
                :valInput="vLastName"
                :nameInput="'vLastName'"
                @inputChange="getDataInput"/>
                <isu-input
                :typeInput="'text'"
                :textLable="'เบอร์โทรศัพท์'"
                :required="true"
                :valInput="vPhone"
                :nameInput="'vPhone'"
                @inputChange="getDataInput"/>
                <isu-input
                :typeInput="'text'"
                :textLable="'อีเมล (ถ้ามี)'"
                :required="true"
                :valInput="vEmail"
                :nameInput="'vEmail'"
                @inputChange="getDataInput"/>

                <isu-select
                :textLable="'ชื่อ'"
                :required="true"
                :valSelect="timeContactValue"
                :placeholder="'ได้ตลอดเวลา'"
                :listOptions="listTime"
                :nameSelect="'timeContactValue'"
                @onChangeSelect="getValSelect">
                </isu-select>
              </div>
              <div class="col-md-6 infoForm-col">
                <div class="terms">
                  <p>ข้าพเจ้ายินยอมให้ บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด (“ตรีเพชร”) จัดเก็บ รวบรวมข้อมูล ข้างต้น รวมทั้งข้อมูลส่วนบุคคลไว้เพื่อวัตถุประสงค์ทางการตลาด การวิจัยตลาดและการ ติดต่อเพื่อการขาย การรับประกันรถยนต์ การบริการหลังการขาย การศึกษาวิจัยในการ พัฒนาและการนำเสนอผลิตภัณฑ์หรือบริการของตรีเพชร หรือบริษัทในกลุ่มตรีเพชร  ซึ่งตรีเพชรอาจจะเปิดเผยข้อมูลนี้ให้กับบริษัทในกลุ่มตรีเพชร ผู้จำหน่ายรถยนต์อีซูซุ ที่ ได้รับการแต่งตั้ง รวมถึง ข้อมูลนี้อาจมีการถ่ายโอน จัดเก็บและประมวลผลโดยเจ้าหน้าที่ ในตรีเพชร บริษัทตัวแทน หรือ บริษัทคู่สัญญาของตรีเพชรเพื่อวัตถุประสงค์ดังกล่าว ข้างต้น</p>
                  <div class="terms-checkbox">
                    <isu-check-box
                    @checkboxClick="getValueCheckbox"
                    :typeCheckbox="'checkbox'"
                    :idCheckbox="'term'"
                    :nameCheckbox="'termValue'"
                    :checked="termValue"
                    :textVal="'ยอมรับข้อตกลงและเงื่อนไขการให้บริการ'"
                    :required="true">
                    </isu-check-box>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="test-drive__form__LINE">
          <button type="button" class="test-drive__form__LINE__btn">
            <img src="../../assets/line-img.png" alt="line">
            <span>Login with LINE</span>
          </button>
          <div class="test-drive__form__LINE__text">ใช้ข้อมูลของท่านจาก my-ISUZU</div>
        </div>
      </form>

    </div>
    <div class="test-drive__form__submit">
      <button type="button" class="i-btn i-btn__primary" @click="onSubmit">ยืนยัน</button>
    </div>
  </div>
</template>

<script>
import IsuCheckBox from '../shared/IsuCheckBox';
import IsuInput from '../shared/IsuInput';
import IsuSelect from '../shared/IsuSelect';

export default {
  name: 'RequestQuoteToDealer04',
  components: {
    IsuCheckBox: IsuCheckBox,
    IsuInput: IsuInput,
    IsuSelect: IsuSelect,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      vName: '',
      vLastName: '',
      vPhone: '',
      vEmail: '',
      listTime: [],
      timeContactValue: {},
      termValue: true,
      promotionsValue: false,
    };
  },
  mounted() {
    this.listTime = [
      {
        label: 'ได้ตลอดเวลา',
        id: 0,
      },
      {
        label: 'วันพรุ่งนี้',
        id: 1,
      },
      {
        label: '2 วัน',
        id: 2,
      },
      {
        label: '3 วัน',
        id: 3,
      },
      {
        label: '4 วัน',
        id: 4,
      },
    ]
  },
  methods: {
    onSubmit() {
    
    },
    getDataInput(valInput) {
      this[valInput.name] = valInput.data;
    },
    getValueCheckbox(checkbox) {
      this[checkbox.name] = checkbox.value;
    },
    getValSelect(select) {
      this[select.name] = select.value;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

h2 {
  margin-bottom: 0;
}

button {
  padding: 0;
  outline: none;
}

.i-btn {
  @include media-breakpoint-down(lg) {
    min-width: 155px;
  }
}

.i-btn__primary  {
  border: none;

  &:hover {
    color: $white;
    background-color: $red-hover-color;
    border: none;
  }
}

.test-drive {
  &__infoForm {
    padding: 10px 0 0 0;
    background-color: $gray-100;
    z-index: $NOMAL-ZINDEX;
    position: relative;

    @include media-breakpoint-up(lg) {
      padding: 0 0 120px 0;
    }

    &__wrap {
      @include media-breakpoint-up(lg) {
        padding: 0 95px;
      }
    }

    &__number {
      font-size: 5rem;
      line-height: 2.4rem; //INFO: Line-height follow as the design
      color: #cccccc;
      text-align: center;
      margin-bottom: 10px;

      @include media-breakpoint-up(lg) {
        font-size: 6rem;
        line-height: 4.8rem; //INFO: Line-height follow as the design
        margin-bottom: 10px;
      }
    }

    &__title {
      text-align: center;
      margin-bottom: 20px;

      @include media-breakpoint-up(lg) {
        margin-bottom: 60px;
      }
    }

    .infoForm-col {
      margin-bottom: 20px;
    }

    .terms {
      p {
        font-size: $font-size-small;
        margin-bottom: 35px;

        @include media-breakpoint-up(lg) {
          font-size: 1.9rem;
          margin-bottom: 12px;
        }
      }
    }

    .required {
      color: #ef3f36;
    }

    & >>> .vs__clear {
      display: none;
    }

    & >>> .vs__dropdown-toggle {
      border: 1px solid #b7b7b7;
      border-radius: 0;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;

    &__information {
      order: 2;

      .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 22px;

        label {
          margin-bottom: 12px;
        }
      }

      .form-control {
        padding: 8px 10px;
        color: $gray-700;
      }
    }

    &__LINE {
      border-top: 1px solid #d8dde6;
      border-bottom: 1px solid #d8dde6;
      padding: 24px 0 20px;
      display: flex;
      align-items: center;
      margin-bottom: 35px;
      flex-direction: column;
      justify-content: center;

      @include media-breakpoint-up(lg) {
        padding: 24px 0;
        margin-bottom: 55px;
      }

      &__btn {
        background-color: #00c33c;
        border: none;
        border-radius: 5px;
        display: flex;
        align-items: center;

        @include media-breakpoint-up(lg) {
          flex-direction: row;
        }

        &:hover {
          background-color: #04a736;
        }

        img {
          border-right: 2px solid #00b700;
          margin: 5px;
          width: 29px;
          padding-right: 5px;
          @include media-breakpoint-up(lg) {
            width: auto;
            margin: 7px;
            padding-right: 4px;
          }
        }

        span {
          height: 100%;
          padding: 0 20px;
          color: $white;
          font-size: 1.1rem;
          font-family: Helvetica;
          font-weight: bold;
          line-height: 1.8rem; //INFO: Line-height follow as the design

          @include media-breakpoint-up(lg) {
            font-size: $font-size-small;
            font-weight: normal;
            line-height: 2.4rem; //INFO: Line-height follow as the design
            padding: 0 34px;
          }
        }
      }

      &__text {
        margin-top: 14px;

        @include media-breakpoint-up(lg) {
          margin-top: 20px;
          margin-left: 0;
        }
      }
    }

    &__submit {
      text-align: center;
      order: 2;
      padding-top: 42px;
      background-color: $white;

      @include media-breakpoint-up(lg) {
        background-color: $gray-100;
        margin-top: 8px;
      }

      button {
        padding: 9px 0;

        @include media-breakpoint-up(lg) {
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
