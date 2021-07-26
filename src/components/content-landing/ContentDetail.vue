<template>
  <div class="news-detail">
    <div class="news-detail__head"></div>
    <div class="news-detail__body">
      <div class="container">
        <div class="news-detail__body__wraper">
          <!-- <div class="news-detail__body__date">
            <img src="../../assets/campaign-date.png" alt="x" />
            <span>{{publishMonth | formatMonth}}</span>
            <p>{{publishYear}}</p>
          </div> -->
          <article-detail-header :publishMonth="publishMonth" :publishYear="publishYear"></article-detail-header>
          <div class="news-detail-container">
            <sc-text tag="h3" class="news-detail__body__title" :field="pageData.PageTitle" />
          </div>
          <!-- <div>
            <div class="news-detail-container">
              <div class="news-detail__body__main-img">
                <img src="../../assets/news-detail-head.jpg" alt="x">
              </div>
              <p class="news-detail__body__contents">
                <strong>นางปนัดดา เจณณวาสิน กรรมการรองผู้จัดการ บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด ร่วมเปิดการแข่งขันมวยไทยระดับโลก “THAI FIGHT 2019” รอบรองชนะเลิศ ใน “THAI FIGHT แม่สอด”</strong> นำ “เพชรสมุย ลูกเจ้าพ่อโรงต้ม” แชมป์อีซูซุคัพซูเปอร์ไฟต์ 2019 ชนะน็อกนักชกชาวโมร็อกโก รอบรองชนะเลิศ ก้าวเข้าสู่รอบชิงชนะเลิศอย่างเต็มภาคภูมิ เพื่อชิงถ้วยพระราชทานพระบาทสมเด็จ- พระเจ้าอยู่หัวฯ ปลายปีนี้ โดยมี นายสุวัจน์ ลิปตพัลลภ ประธานที่ปรึกษาคณะกรรมการอำนวยการจัดการแข่งขัน THAI FIGHT เป็นประธานเปิดการแข่งขันฯ ณ สนามกีฬาสมเด็จพระนเรศวร-มหาราช เทศบาลนครแม่สอด จังหวัดตาก
              </p>
            </div>
            <div class="news-detail__body__img">
              <div class="news-detail-row">
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
              </div>
            </div>
            <div class="news-detail-container">
              <p class="news-detail__body__contents">
                การแข่งขัน “THAI FIGHT 2019” รอบรองชนะเลิศ จัดเต็มความสนุกสุดมันภายใต้บรรยากาศแสงเสียงสปอร์ตเอ็นเตอร์เทนเมนท์ตามแบบฉบับไทยไฟท์ นำขบวนขุนพลนักชกไทยทั้ง เพชรสมุย ลูกเจ้าพ่อโรงต้ม, แสนชัย พี.เค.แสนชัยมวยไทยยิม, กิตติ ส.จ.แดนระยอง, เต็งหนึ่ง ศิษย์เจ๊สายรุ้ง เป็นต้น ร่วมประชันกับเหล่านักมวยที่มีชื่อเสียงจากหลากหลายประเทศทั่วโลก อาทิ อิหร่าน, กัมพูชา, แอลจีเรีย, อาร์เจนติน่า, เม็กซิโก, อัฟกานิสถาน, โมร็อกโก และสหรัฐอเมริกา ประชันกันในรูปแบบกีฬามวยไทยทั้งในรุ่นสวมนวมและคาดเชือกเต็มรูปแบบ ซึ่งคู่เอกรอบรองชนะเลิศนี้ ได้แก่ “เพชรสมุย ลูกเจ้าพ่อโรงต้ม” แชมป์อีซูซุคัพซูเปอร์ไฟต์ 2019 ที่ยังคงทำผลงานได้อย่างยอดเยี่ยมสามารถรักษาแชมป์ไว้ได้ด้วยการปล่อยหมัด ฟาดนวมจนชนะน็อก “ฮีชาม บูลารี่” นักชกจากประเทศโมร็อกโก ในรุ่นเวลเทอร์เวท พิกัด 67 กิโลกรัม แบบสวมนวม พร้อมก้าวสู่เวทีเกียรติยศรอบชิงชนะเลิศอย่างเต็มภาคภูมิปลายปีนี้
              </p>
            </div>
            <div class="news-detail__body__img">
              <div class="news-detail-row">
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
                <div class="news-detail-col">
                  <img src="../../assets/news-detail-img.jpg" alt="x">
                </div>
              </div>
            </div>
            <div class="news-detail-container">
              <div class="news-detail__body__contents">
                <p><strong>ผลการแข่งขัน THAI FIGHT 2019 รอบรองชนะเลิศ มีดังนี้</strong></p>
                <ol class="news-detail-ol">
                  <li>กาเบรียล มาซเซตติ (เปรู) ชนะน็อก เมือน โสเพีย (กัมพูชา)</li>
                  <li>สมิงเดช ลูกเจ้าพ่อโรงต้ม (ไทย) ชนะน็อก โมฮัมเหม็ด เชบูบ (แอลจีเรีย)</li>
                  <li>เพชรสมุย ลูกเจ้าพ่อโรงต้ม (ไทย) ชนะน็อก ฮิชาม บูลารี่ (โมร็อกโก)</li>
                  <li>แสนชัย พี.เค.แสนชัยมวยไทยยิม (ไทย) ชนะน็อก อเลจานโด้ อมิคัคซี่ (อาร์เจนติน่า)</li>
                  <li>กิตติ ส.จ.แดนระยอง (ไทย) ชนะน็อก ฮาเหม็ด โซไลมานี (อิหร่าน)</li>
                  <li>พยัคฆ์สมุย ลูกเจ้าพ่อโรงต้ม (ไทย) ชนะคะแนน อิซาค รูเอลัส (เม็กซิโก)</li>
                  <li>ตะ ปีง โญ (เมียนมาร์) ชนะน็อก ก้อง ซามโบ (กัมพูชา)</li>
                  <li>ป.ต.ท. ว.รุจิรวงศ์ (ไทย) ชนะน็อก แกลดสโตน อัลเลน (สหรัฐอเมริกา)</li>
                  <li>เต็งหนึ่ง ศิษย์เจ๊สายรุ้ง (ไทย) ชนะคะแนน ซาห์ราม เดลาวาร์ (อัฟกานิสถาน)</li>
                </ol>
                <p>เตรียมพบกับ “THAI FIGHT 2019” รอบชิงชนะเลิศ ซึ่งจะจัดขึ้นในวันเสาร์ที่ 21 ธันวาคม ศกนี้ ณ ลานกิจกรรม เดอะ มิธ ป่าตอง จังหวัดภูเก็ต  โดย ผู้ครองตำแหน่งแชมป์ “THAI FIGHT 2019” ในรุ่นสวมนวม พิกัด 70 และ 67 กิโลกรัม และแบบคาดเชือก พิกัด 70 กิโลกรัม จะได้ครองถ้วยพระราช ทานในพระบาทสมเด็จพระเจ้าอยู่หัวฯ พร้อมด้วยรางวัลรถปิกอัพ “ออลนิว อีซูซุ ดีแมคซ์” พร้อมเงินสดทั้ง 3 รุ่น รวม 2,500,000 บาทไปครองอีกด้วย</p>
                <p>
                  สำนักงานประชาสัมพันธ์
                  <br>
                  บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด
                  <br>
                  โทร.02-966-2127-9
                </p>
              </div>
            </div>
          </div> -->
          <sc-rich-text tag="div" :field="pageData.Description"></sc-rich-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RichText, Text } from '@sitecore-jss/sitecore-jss-vue';
import { mapActions } from 'vuex';
import { transformDate } from '../../util/customDate';
import ArticleDetailHeader from '../shared/ArticleDetailHeader';
// const monthThaiLandLanguageData = [
//   'ม.ค.',
//   'ก.พ.',
//   'มี.ค.',
//   'เม.ย.',
//   'พ.ค.',
//   'มิ.ย.',
//   'ก.ค.',
//   'ส.ค.',
//   'ก.ย.',
//   'ต.ค.',
//   'พ.ย.',
//   'ธ.ค.',
// ];

export default {
  name: 'ContentDetail',
  components: {
    ScText: Text,
    ScRichText: RichText,
    ArticleDetailHeader: ArticleDetailHeader,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      pageData: {},
      publishYear: '',
      publishMonth: '',
    };
  },
  mounted() {
    // INFO : scroll to Top after change client route
    window.scrollTo(0, 0);

    this.pageData = this.$jss.routeData().fields;
    this.customDataToStore();
    this.formatDate(this.pageData.PublishDate.value);
  },
  methods: {
    ...mapActions('recentcontent', ['addContent']),
    formatDate(date) {
      let { month, year } = transformDate(date);
      this.publishMonth = month;
      this.publishYear = year;
    },
    customDataToStore(){
      let content = {
        Id: this.$jss?.routeData()?.itemId || '',
        ItemUrl: window.location.pathname,
        Title: this.pageData?.PageTitle?.value?.length ? this.pageData.PageTitle.value : '',
        Image: this.pageData.Image?.value?.src?.length ? this.pageData.Image.value.src : '../../assets/default-recent-campaign.jpg',
        ImageSm : this.pageData.MobileImage?.value?.src?.length ? this.pageData.MobileImage.value.src : '../../assets/default-recent-campaign.jpg',
        ShortDescription: this.pageData?.ShortDescription?.value?.length ? this.pageData.ShortDescription.value : ''
      }
      this.addContent(content);
    }
  },
  // filters: {
  //   formatMonth: function(monthNumber) {
  //     // INFO: subtract one because month start from 0
  //     return monthThaiLandLanguageData[monthNumber - 1] ? monthThaiLandLanguageData[monthNumber - 1] : '';
  //   },
  // },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.news-detail {
  @include ul-style();

  font-size: $font-size-content-small;
  @include media-breakpoint-up(md) {
    font-size: $font-size-base;
  }
  &__head {
    height: 30px;
    background-image: url('../../assets/news-banner.png');

    @include media-breakpoint-up(lg) {
      height: 40px;
    }
  }

  &__body {
    &__wraper {
      position: relative;
      padding: 0 0 30px 0;
    }

    &__date {
      background-position: center;
      background-repeat: no-repeat;
      right: 0;
      top: 0;
      position: absolute;
      text-align: center;
      height: 73px;
      width: 53px;

      @include media-breakpoint-up(lg) {
        height: 90px;
        width: 65px;
      }

      img {
        position: relative;
      }

      span {
        font-size: 3rem;
        position: absolute;
        top: 5px;
        left: 0;
        color: $white;
        display: block;
        width: 100%;
        text-align: center;

        @include media-breakpoint-up(lg) {
          font-size: 3.6rem;
        }
      }

      p {
        font-size: $font-size-mobile;
        color: $white;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;

        @include media-breakpoint-up(lg) {
          font-size: 2.4rem;
        }
      }

      &::after {
        position: absolute;
        background-image: url('../../assets/campaign-line.png');
        content: '';
        background-position: center;
        background-repeat: no-repeat;
        height: 2px;
        width: 40px;
        left: 5px;
        top: 35px;

        @include media-breakpoint-up(lg) {
          font-size: 2.4rem;
          left: 14px;
          width: 50px;
          left: 7px;
          top: 45px;
        }
      }
    }

    &__title {
      color: #cd0002;
      font-size: 3rem;
      line-height: 3rem;
      margin: 20px 0 25px 0;
      font-weight: $font-weight-bold;
      text-align: left;

      @include media-breakpoint-up(lg) {
        font-size: 3.6rem;
        line-height: 3.6rem;
        margin: 30px 0 35px 0;
        
      }
    }

    &__main-img {
      margin-bottom: 20px;
      text-align: center;
      @include media-breakpoint-up(lg) {
        margin-bottom: 55px;
      }
    }

    &__contents,
    &__contents p {
      margin-bottom: 24px;
      @include media-breakpoint-up(lg) {
        margin-bottom: 35px;
      }
    }

    &__img {
      padding: 16px 0 25px 0;
      @include media-breakpoint-up(lg) {
        padding: 40px 0;
      }
    }
  }

  >>> .news-detail-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-right: -4px;
    margin-left: -4px;
    @include media-breakpoint-up(md) {
      margin-right: -15px;
      margin-left: -15px;
    }
  }
  >>> .news-detail-col {
    width: calc(100% / 3);
    padding: 4px;
    @include media-breakpoint-up(lg) {
      padding: 15px;
    }
  }
  >>> .news-detail-ol {
    padding-left: 14px;
    margin-bottom: 30px;
    @include media-breakpoint-up(lg) {
      padding-left: 18px;
      margin-bottom: 40px;
    }

    li {
      margin: 4px 0;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>