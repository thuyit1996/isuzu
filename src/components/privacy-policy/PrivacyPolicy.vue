<template>
  <div class="privacy-policy">
    <div class="container">
      <div class="privacy-policy__heading ">
        <div class="privacy-policy__heading__title">
          <sc-text :field="fields.Title" tag = "h2" class=" isu-title"/>
        </div>
        <sc-rich-text tag="div" :field="fields.ContentPrivacyPolicy"></sc-rich-text>
        <!-- <h2 class="privacy-policy__heading__title">นโยบายคุ้มครองความเป็นส่วนตัว</h2>
        <p class="privacy-policy__heading__detail">บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด (เรียกว่า “บริษัทฯ”) ได้จัดทำนโยบายคุ้มครองความเป็นส่วนตัวฉบับนี้เพื่อกำหนดหลักการพื้นฐานในการคุ้มครองข้อมูลส่วนบุคคลของลูกค้า ผลิตภัณฑ์และบริการของบริษัทฯ รวมถึงลูกค้ามุ่งหวัง (“ท่าน” หรือ “ลูกค้า”) โดยนโยบายคุ้มครองความเป็นส่วนตัวฉบับนี้จะครอบคลุมการดำเนินงานของบริษัทฯ ที่เกี่ยวข้องกับข้อมูลส่วนบุคคลและข้อมูลต่างๆ ที่บริษัทฯ จัดเก็บรวบรวม ในการดำเนินธุรกิจ</p> -->
      </div>
      <!-- <ol class="privacy-policy__info">
        <li class="privacy-policy__info__list">
          <span class="privacy-policy__info__list__title">นิยามข้อมูลส่วนบุคคล</span>
          <p class="privacy-policy__info__list__content">“ข้อมูลส่วนบุคคล” หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม ทั้งนี้ เป็นไปตามกฎหมายที่ใช้บังคับ</p>
        </li>
        <div class="privacy-policy__bottom"></div>
        <li><span class="privacy-policy__info__list__title">นิยามข้อมูลส่วนบุคคล</span>
          <ol class="privacy-policy__inner">
            <li class="privacy-policy__inner__item">นิยามข้อมูลส่วนบุคคล
              <p class="privacy-policy__info__list__content">“ข้อมูลส่วนบุคคล” หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม ทั้งนี้ เป็นไปตามกฎหมายที่ใช้บังคับ</p>
              <ol class="privacy-policy__innermost">
                <li>ชื่อ นามสกุล</li>
                <li>ข้อมูลการติดต่อ เช่น เบอร์ติดต่อ ช่องทางการติดต่อทางสื่อสังคมออนไลน์ (เช่น LINE ID, Facebook ID)</li>
                <li>ชื่อ นามสกุล</li>
                <li>อาชีพ</li>
                <li>ชื่อ นามสกุล</li>
                <li>ชื่อ นามสกุล</li>
                <li>สำเนาทะเบียนบ้าน</li>
                <li>ระดับการศึกษา</li>
                <li>จำนวนสมาชิกในครอบครัว</li>
                <li>รายได้เฉลี่ยรายเดือนของครอบครัว</li>
                <li>ข้อมูลเกี่ยวกับรถยนต์ยี่ห้ออื่นที่ท่านยึดถือครอบครองอยู่</li>
                <li>ข้อมูลเกี่ยวกับรถยนต์ที่ท่านให้ความสนใจ สั่งจอง หรือสั่งซื้อ เช่น ประเภท รุ่นและสีของรถยนต์ ราคาของรถยนต์ ประเภทการใช้งานรถยนต์ ลักษณะการใช้งานรถยนต์</li>
                <li>ข้อมูลส่วนบุคคลอื่น ๆ ที่ท่านได้ให้ไว้แก่บริษัทฯ</li>
              </ol>
            </li>
            <li>วิธีการเก็บรวบรวมข้อมูลส่วนบุคคล
              <p class="privacy-policy__info__list__content">บริษัทฯ จะทำการเก็บรวบรวมข้อมูลส่วนบุคคลผ่านทางหลายช่องทาง บริษัทฯ จะได้รับข้อมูลของท่านมาจากผู้จำหน่ายอีซูซุที่ได้รับการแต่งตั้ง (“ผู้จำหน่าย”) เป็นช่องทางหลักนอกจากนั้น</p>
              <P class="privacy-policy__info__list__content">บริษัทฯ อาจจะเก็บข้อมูลส่วนบุคคลจากกิจกรรมอื่นๆ ที่ท่านจะให้ข้อมูลโดยตรงกับบริษัทฯ หรือ ผ่านทางเว็บไซต
                <a class="link-isuzu">www.isuzu-tis.com </a>,<a class="link-isuzu">service.isuzu-tis.com</a>หรือเว็บไซต์อื่นๆ ของบริษัทฯ (“เว็บไซต์”) ศูนย์บริการลูกค้า บริษัทในเครือของตรีเพชร หรือจากแหล่งอื่นที่ไม่ใช่จากท่านโดยตรง เช่น จากลูกค้าท่านอื่น ๆ ของบริษัทฯ สมาคมการค้าหรือองค์กร
              </p>
            </li>

            <li>ระยะเวลาในการเก็บข้อมูลส่วนบุคคล
              <p class="privacy-policy__info__list__content">บริษัทฯ จะทำการเก็บรวบรวมข้อมูลส่วนบุคคลผ่านทางหลายช่องทาง บริษัทฯ จะได้รับข้อมูลของท่านมาจากผู้จำหน่ายอีซูซุที่ได้รับการแต่งตั้ง (“ผู้จำหน่าย”) เป็นช่องทางหลักนอกจากนั้น บริษัทฯ อาจจะเก็บข้อมูลส่วนบุคคลจากกิจกรรมอื่นๆ ที่ท่านจะให้ข้อมูลโดยตรงกับบริษัทฯ หรือ ผ่านทางเว็บไซต
                <a class="link-isuzu">www.isuzu-tis.com </a>,<a class="link-isuzu">service.isuzu-tis.com</a>หรือเว็บไซต์อื่นๆ ของบริษัทฯ (“เว็บไซต์”) ศูนย์บริการลูกค้า บริษัทในเครือของตรีเพชร หรือจากแหล่งอื่นที่ไม่ใช่จากท่านโดยตรง เช่น จากลูกค้าท่านอื่น ๆ ของบริษัทฯ สมาคมการค้าหรือองค์กร
              </p>
            </li>
          </ol>
        </li>
        <div class="privacy-policy__bottom"></div>
        <li class="privacy-policy__info__list">
          <span class="privacy-policy__info__list__title">วัตถุประสงค์ในการเก็บรวบรวมข้อมูลส่วนบุคคล</span>
          <p class="privacy-policy__info__list__content">บริษัทฯ จะเก็บรวบรวม ใช้ และ/หรือเปิดเผยข้อมูลต่างๆ รวมถึงข้อมูลส่วนบุคคลของท่าน เนื่องด้วยเป็นการจำเป็นเพื่อประโยชน์โดยชอบด้วยกฎหมายของบริษัทฯ และ/หรือผู้จำหน่าย หรือโดยได้รับความยินยอมจากท่าน หรือเนื่องด้วยเหตุอันชอบด้วยกฎหมายอื่นๆ ทั้งนี้ เท่าที่จำเป็นเพื่อวัตถุประสงค์ ดังต่อไปนี้</p>
          <ol class="privacy-policy__inner">
            <li class="privacy-policy__inner__item">พื่อใช้รวมไปถึงเพื่อบริหารและจัดการข้อมูลของท่านในการจัดกิจกรรมทางการตลาดของบริษัทฯ และ/หรือบริษัทในเครือของบริษัทฯ หรือ บริษัท ตรีเพชรโฮลดิ้ง จำกัด (“บริษัทในกลุ่มตรีเพชร”) ตามข้อกำหนดและเงื่อนไขในการเข้าร่วมกิจกรรมในแต่ละครั้ง</li>
            <li class="privacy-policy__inner__item">วิธีการเก็บรวบรวมข้อมูลส่วนบุคคล</li>
            <li class="privacy-policy__inner__item">วิธีการเก็บรวบรวมข้อมูลส่วนบุคคล</li>
            <li class="privacy-policy__inner__item">เพื่อพัฒนาสินค้าและบริการ ตลอดจนกิจกรรมส่งเสริมการขายและกิจกรรมทางการตลาดของบริษัทในกลุ่มตรีเพชร</li>
            <li class="privacy-policy__inner__item">วิธีการเก็บรวบรวมข้อมูลส่วนบุคคล</li>
            <li class="privacy-policy__inner__item">วิธีการเก็บรวบรวมข้อมูลส่วนบุคคลวิธีการเก็บรวบรวมข้อมูลส่วนบุคคลวิธีการเก็บรวบรวมข้อมูลส่วนบุคคล</li>
            <li class="privacy-policy__inner__item">วิธีการเก็บรวบรวมข้อมูลส่วนบุคคล</li>
          </ol>
        </li>
        <div class="privacy-policy__bottom"></div>
        <li class="privacy-policy__info__list">
          <span class="privacy-policy__info__list__title">นิยามข้อมูลส่วนบุคคล</span>
          <p class="privacy-policy__info__list__content">“ข้อมูลส่วนบุคคล” หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม ทั้งนี้ เป็นไปตามกฎหมายที่ใช้บังคับ</p>
        </li>

        <div class="privacy-policy__info__table">
          <div class="privacy-policy__info__table__data">
            <p class="privacy-policy__info__table__title">ผู้ควบคุมข้อมูลส่วนบุคคล</p>
            <div class="privacy-policy__info__table__content">
              <p class="privacy-policy__info__table__detail">บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด</p>
            </div>
          </div>
          <div class="privacy-policy__info__table__location">
            <p class="privacy-policy__info__table__title">ผู้ควบคุมข้อมูลส่วนบุคคล</p>
            <div class="privacy-policy__info__table__content">
              <div class="privacy-policy__info__table__wrap">
                <span class="privacy-policy__info__table__type">อีเมล์ :</span>
                <span class="privacy-policy__info__table__details"> info@isuzu-tis.com</span>
              </div>
              <div class="privacy-policy__info__table__wrap">
                <span class="privacy-policy__info__table__type">หมายเลขโทรศัพท์ :</span>
                <span class="privacy-policy__info__table__details"> 021180777</span>
              </div>
              <div class="privacy-policy__info__table__wrap">
                <span class="privacy-policy__info__table__type">อีเมล์ :</span>
                <span class="privacy-policy__info__table__details"> สำนักงานลูกค้าสัมพันธ์ 1088 ถนนวิภาวดีรังสิต แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900</span>
              </div>
            </div>
          </div>
        </div>
        <p class="privacy-policy__info__list__content">บริษัทฯ ยินดีจะตอบข้อสงสัย รับฟังข้อเสนอแนะ และคำติชม อันจะเป็นประโยชน์ต่อการปรับปรุงการให้บริการของเว็บไซต์และการให้บริการของบริษัทฯ ต่อไป</p>
      </ol> -->
    </div>
  </div>
</template>

<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'PrivacyPolicy',
  components: {
    ScText: Text,
    ScRichText: RichText,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';
.privacy-policy {

  &__heading {
    margin-top: 50px;

    &__title {
      text-align: center;
      margin-bottom: 30px;
    }

    &__detail {
      padding: 20px 0 30px;

      @include media-breakpoint-up(md) {
        padding: 20px 0 40px;
      }
    }
  }

  &__info {

    &__list {

      &__title{
        font-weight: bold;
      }

      &__content {
        margin-top: 10px;

      }
    }

    &__table {
      border: 1px solid #d8dde6;
      display: flex;
      margin-top: 25px;

      @include media-breakpoint-up(md) {
        margin: 25px 0;
      }

      $width-data-mobile : 150px;
      $width-data-md : 400px;

      &__data {
        width: $width-data-mobile;

        @include media-breakpoint-up(md) {
          width: $width-data-md ;
        }
      }

      &__location {
        width: calc(100% - #{$width-data-mobile});
        border-left: 1px solid #d8dde6;

        @include media-breakpoint-up(md) {
          width: calc(100% - #{$width-data-md});
        }
      }

      &__title {

        padding: 10px;
        border-bottom: 1px solid #d8dde6;

        @include media-breakpoint-up(md) {
          padding: 20px 30px;
        }

      }

      &__content {
        padding: 0 15px 5px 10px;

        @include media-breakpoint-up(md) {
          padding: 20px 0 35px 30px;
        }

      }

      &__wrap {
        margin-bottom: 5px;

        @include media-breakpoint-up(md) {
          margin-bottom: 15px;
        }
      }
    }
  }

  &__inner {
    &__item {
      margin-bottom: 10px;
    }
  }

  &__bottom {
    margin-bottom: 25px;

    @include media-breakpoint-up(md) {
      margin-bottom: 45px;
    }

  }

  ol {
    display: table;
    list-style-type: none;
    margin: 0;
    padding: 0;
    counter-reset: section;
  }

  ol>li {
    counter-increment: section;

  }

  ol>li:before {
    display: table-cell;
    content: counter(section) ".";
    padding-right: 5px;
    font-weight: bold;

    @include media-breakpoint-up(md) {
      padding-right: 15px;
    }
  }

  ol li {
    display: inherit;

  }

  ol ol {
    counter-reset: listitem 0;
  }

  ol ol>li {
    counter-increment: listitem;
  }

  ol ol>li:before {
    content: counter(section) "."counter(listitem) "";
    font-weight: inherit;
  }

  ol.privacy-policy__innermost>li:before {
      content: ""counter(listitem) ".";
      display: table-cell;
  }

  .link-isuzu {
    color: red;
  }

  .privacy-policy__inner {
    margin-top: 15px;

  }

  .privacy-policy__innermost {
    padding: 0 0 5px;

    @include media-breakpoint-up(md) {
       padding: 25px 0 35px;
    }
  }
}
</style>
