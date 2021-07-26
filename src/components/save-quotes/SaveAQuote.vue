<template>
  <div class="save-quotes">
    <div class="container">
      <div class="save-quotes__heading">
        <sc-text class="save-quotes__heading__title isu-title" tag="h2" :field="fields.Title" />
        <sc-text tag="p" class="save-quotes__heading__desc" :field="fields.Description" />
      </div>
      <div class="save-quotes__position">
        <div class="save-quotes__content"  v-swiper:mySwiper="swiperSaveQuotesOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(saveQuoteInfo, index) in saveQuoteList" :key="index">
              <save-quotes-item
                :listSaveQuote="saveQuoteInfo"
                @delete:quote="onDeleteQuote"
                @printQuote="printQuote"
                :saveAQuoteField="fields"
              ></save-quotes-item>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import SaveQuotesItem from './SaveQuotesItem';
import { mapState, mapActions } from 'vuex';
import { isMobile } from '../../util/dom';
import { customMoney } from '../pipes/moneyPipe';
import { GetEndPoint } from '../../service/genericService';

export default {
  name: 'SaveAQuote',
  components: {
    ScText: Text,
    SaveQuotesItem: SaveQuotesItem,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      detectMobile: false,
      swiperSaveQuotesOption: {
        navigation: {
          nextEl: '.save-quotes .swiper-button-next',
          prevEl: '.save-quotes .swiper-button-prev',
        },
        slidesPerView: 3,
        spaceBetween: 30,

        breakpoints: {
          768: {
            spaceBetween: 15,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 7,
          },
        },
      },
      printQuoteData: {},
      deviceType: 3,
      pdfWidth: 1240,
      pdfHeight: 1754,
      marginLeftPdf: 60,
      docLibrary: {},
      pdfImageUrl: '',
    };
  },
  computed: {
    ...mapState('savequote', { saveQuoteList: 'saveQuoteList' }),
    carImage: function() {
      let carRotate =
        this.printQuoteData.carColor.rotateImage &&
        this.printQuoteData.carColor.rotateImage.length &&
        this.printQuoteData.carColor.rotateImage[0];
      let carNormal = this.printQuoteData.carGrade.Image
        ? this.printQuoteData.carGrade.Image
        : this.printQuoteData.carModel.Image;

      let carColor = this.printQuoteData.carColor.Image
        ? this.printQuoteData.carColor.Image
        : carNormal;

      return carRotate ? carRotate : carColor;
    },
  },
  mounted() {
    import(/* webpackChunkName: "jspdf" */ /* webpackPreload: true */ 'jspdf').then(
      ({ default: jspdf }) => {
      this.jspdf = jspdf;
      window.jsPDF = jspdf;
      import(/* webpackChunkName: "pdfFont" */ './KittithadaMedium65-normal');
    })
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.slidesPerView = isMobile(this.deviceType) ? 2 : 3;
    this.spaceBetween = isMobile(this.deviceType) ? 7 : 30;
  },
  methods: {
    ...mapActions('savequote', ['deleteQuote']),
    onDeleteQuote(quote) {
      this.deleteQuote(quote);
    },
    printQuote({ quote, carImage }) {
      this.printQuoteData = quote;
      this.pdfImageUrl = this.imageEndPoint(carImage);
      this.$nextTick(() => {
        this.savePdf(this.printQuoteData);
      }, 1000);
    },

    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },

    totalPrice(quote, isHasInsurance = true){
      let totalPrice = 0;
      if(quote.carGrade?.Price){
        totalPrice += Number(quote.carGrade?.Price);
      }
      if(quote.carColor?.price){
        totalPrice += Number(quote.carColor?.price);
      }
      if(quote.carInsurance?.price && isHasInsurance){
        totalPrice += Number(quote.carInsurance?.price);
      }
      return totalPrice;
    },

    customMoneyForPdf(value){
      return customMoney(value);
    },

    redLineLeftMargin(carTypeWidth){
      let containerWidth = this.pdfWidth  - this.marginLeftPdf * 2;
      let withoutTextWidth = (containerWidth / 2 - carTypeWidth / 2);
      let lineMarginText = 23;
      return withoutTextWidth - lineMarginText;
    },

    redLineRightMargin(carTypeWidth){
      let containerWidth = this.pdfWidth  - this.marginLeftPdf * 2;
      let withoutTextWidth = (containerWidth / 2 + carTypeWidth / 2);
      let lineMarginText = 46;
      return withoutTextWidth + lineMarginText + lineMarginText;
    },

    textMarginRight (textWidth){
      return this.pdfWidth  - 60 - textWidth;
    },

    textHalfPdf(textWidth){
      return this.pdfWidth / 2 - textWidth - 10;
    },
    breakTextLine(text = "", breakLine){
      let splitText = text.split(" ");
      let firstLine = [];
      let secondLine = [];
      let count = 0;
      splitText.forEach((item,index) => {
        count = count + item.length + 1;
        if(count <= breakLine){
          firstLine.push(item);
        }else{
          secondLine.push(item);
        }
      })
      let firstLineString = '';
      let secondLineString = '';
      firstLine.forEach((item,index) => firstLineString += index == 0 ? '' + item : ' ' + item);
      secondLine.forEach((item,index) => secondLineString += index == 0 ? '' + item : ' ' + item);
      return{
        firstLineString,
        secondLineString
      }
    },
    truncateString(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + "...";
      }
      else {
        return str;
      }
    },

    savePdf(quote) {
      const { carType, carGrade , carModel , carColor , carInsurance } = quote;
      let doc = new this.jspdf('p', 'pt', [this.pdfWidth, this.pdfHeight]);
      let logo =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAAZCAYAAADja8bOAAAEx0lEQVRoge2ba4hWRRjHf2qrtXTZLM3SUktLAluIyqKLhUViaSl0AelLVEQfKgq6UFAQYjeC6EK3/VZRaanQh4K8lAalGWE3KrpAZVmxUJuUbO4bT/wXXo7nzMyZc3s39g/z4T1nZp5n5jzz3OZ5x7RaLYCxpKOlFoKsOYrCxUMZfBedr4l1h/JQ+j7YiyuBvRltCDjHMbG92+gYX0YzHk5Nof2WZ+5Tcm7Sq4659gBTUsa8U/G6fwUeAA5x8P25Y44/PWPT8L5jvl0mMJM8Exyb8fxWYBNwboWnbBhTU57NcvQfA0zLSeM4x7uuDIE5JieNvDgcuA3YBkzPGHukY85u4NCcNI9wvJsU+6EXAw/rw4yieswG1gH7Nb3XsQLzYMl8jMKPXmB50/sUIzDHA3Mq4MWFn2qmF4ofa6a3tGZ6+yBGxbls/TD6gMeLs/cfdgNflTRX2VgYuB8hmAisAQ529D266QXHCMxfAX0sqvgisO9IxgDwUUn89yoycuGfpvcqxiTtUIjlwg1AP/AacJVOzyj2xcnAfcAnErwezx5tb3oPYzRMv3IWl3v67S+bu1Qn420J0FpgZyS/Ix3jgDO1J8tyhuUtmfpGERum3aKFp+VH0mB0Fqg9oeTQWgnQl/8XacjABOB8CcmSgLxXFh4aqRoGRQfzgReAeRHj56mtBD6Ts2ftw8hUdqfhIOAi4FJgkX7H4m+ZrZWdsMYiiaCvgTOU6b1CKjbm9JyodhfwfZvwbA7wlToJk5XQXCaNMr4Ab3Zo3gVeAVYBP3fKOoum9Fu6S7peKeoFCqdj8yYWNt6oOb8Dri7IXx04SprWtO5z0igxwmJ7uUXrt2uNs4HHOklYKDnVbNpgg9pN8nHMMb4kMn8wTU7eScDNJfJZJk7QfVraPVMIhjR+tVL/HR8MVHU3MSSTslknxvyVy9TyCo8J3wfA8xXxGovxctzzCsuwkKyS0/9L5yzJj6pvmZGqfU+329NVqmBX9t/kmOOeCLpdOfuPy9l/eY4rEksrvAlco9tgM91P1SQsefeh2/WyDoFpR0va4g6l1K1mZYXVWXjGzZJjnAfzc/SdEnE/tjigz4Y2IVkoE/tbTjpFcV6O8b2+wKVugUnC8gp3AxcG9E3Wg/jS6NcpYvHhMODlAPOcDPdnevqvkybpU7KzKZg2PyuA9gw5707E+jA9KnGYXNImuIqhhjGQ+L3L89G6lJH+2GH+upUaODCAftJ8+O7JTKO8XtL9T0sfc3XKuwFPVV2PfMmtjui1R/vgi+4GYgXmYuDayLExGNSHb4dli08PmGuuWhHsTAlvt2mTszBBybuyMCNDYLYGVheeVgIf22NNUt2VXxZR/J549nSNib2+FJOU9qxKZFU3PlkjD8827cOEwEzB7Sn9rPj53hrof5pRYbhDZapNYz3wTA08vAG8NDbglKQ5l3XVZXyrNPsPGe9XKOIarIi+mb0LVH2fhjuBRyqinYTrO1k5yaMVarw1yqEN2f+S5uikpsXr/YpikmGvOVn3l+j0tmNQztkWOY17AsZM1U3wXIWFrv/p7PbMtVc+yyaFxb5ozGAZX6Nv5atWpV92cbzx/aISfS5Y8GDhvvFzQFvHEKc+iT90X2j5I/PXAPgXNgk69Nim0JcAAAAASUVORK5CYII=';
      let hotLine = `data:image/png;base64,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`
      let car =
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QA4RXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAAExAAIAAAAKAAAAJgAAAABHcmVlbnNob3QA/9sAQwACAQECAQECAgICAgICAgMFAwMDAwMGBAQDBQcGBwcHBgcHCAkLCQgICggHBwoNCgoLDAwMDAcJDg8NDA4LDAwM/9sAQwECAgIDAwMGAwMGDAgHCAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFwAiAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/ezxL4p0/wAH6VJe6neQ2dtGD80jfeIBO1R1ZsA4VQSccA1+dP7af/BeLWfhhN5fwn+Ffi7xNBEVX7drPhbUoY7osRuZYcRSxRxrklpACxBAQABm+Pv+C+P7QfjJP27vFnhO38P+FtWs7FdOtrNdQ8RSWt4bY2MV0Hto4ZfMjDTyXCyHYpYQR5aRSFT5U8FftLeKtK8KWv27wh4Vh0mxlAK6T4s8u6vBJKrN9qlEschSMQqoik3Eh5uV3bT87j84lSTnBxST5bNu7d7b3SXffbc++yThOOJnGlUhUlJw57xSso8vNtaUn/Kvd1lor3TPuDwT/wAHEH7TTW66h4p+D/h7w7op3t9qvvDeqwq7SuY4I0bz8yMJHjJSNGZolbGX6fcf/BNb/gqRf/tS+H9ci+KWm+H/AAHq2npBd6fdf6Rptnq9vLvVtkd6FlSSNkUsr4bbPHlVYMB+BPxg/bd+IGt+CdN1rwdDoGleEbG+mfVpLC3WW8uprmRmbc0IxHDBtijEWxFXzEIVfNhB4Xw38Zfi14nVV0Ndcsb3xlZX2n6VcXeiP9n1iSGBpnt7YTp+/chVhJjVmiN0hypdTXDSzDNpTjJUVaVrauyXnvZ9euh7eK4f4XpUqlOeLknTupWjC7ktWo3cXJL4dld32R/X7BPHdQJLE6yRyKGR1O5WB5BB7g0Vy/wJ+HT/AAg+CHg3wlJNFcSeF9DstIaWIbUlNvbpEWUdgdmRRX18btan5RNJSaWqPiX/AILB/wDBvZ8O/wDgrT450bxnc+KdY+HvjjSbH+zJtRsLOO8t9VtlYvEtxA5XLxszhZFZW2uVbcFQL4L8S/8Ag2w8Ua78JbDwZos37K8OmabYwWEd43whgs9WuFhRUWSW/R3u3lYKC8jSlnYsWLEmiimScz+zF/wbG/Fr4YzeH9O8SfGPwNa6D4XuPtOmzaBodw2rWf7xpRFDcXDkwQCaSaYxRbFaSVmbJNfoJ4b/AOCSnwxuPGXgjxV49vvHXxW8YfDu7+3+HtT8U+KdQu49IuDs3PBbecIFDeXHuVkYHYoOQBRRQB9QUUUUAf/Z';
      let square =
        'data:image/jpeg;base64,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';
      let testImage = new Image();
      // testImage.src = 'https://i.imgur.com/megPDzM.png';
      testImage.src = this.pdfImageUrl;
      doc.setFont('KittithadaMedium65');
      doc.setFontSize(62);
      doc.setDrawColor(0);
      doc.setFillColor(88, 88, 90);
      doc.rect(0, 0, this.pdfWidth, 120, 'FD');

      doc.setTextColor(255, 255, 255);
      doc.addImage(logo, 'PNG', this.marginLeftPdf, 55, 140, 25);
      let thailandText = 'ใบเสนอราคา';
      doc.setTextColor(255, 255, 255);
      doc.text(thailandText, 968, 73);

      doc.setDrawColor(100);
      doc.setFillColor(255, 255, 255);
      doc.setLineDash([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2]);
      doc.rect(this.marginLeftPdf, 320, 440, 240, 'FD');
      doc.setTextColor(0);
      doc.setFontSize(50);
      doc.setFontType('400');
      doc.setFont('KittithadaMedium65');
      if(this.breakTextLine(carType, 22)?.secondLineString?.length) {
        doc.text(this.breakTextLine(carType, 22)?.firstLineString, 100, 393);
        doc.text(this.breakTextLine(carType, 22)?.secondLineString, 100, 437);
      } else {
        doc.text(this.breakTextLine(carType, 22)?.firstLineString, 100, 411);
      }

      doc.setTextColor(0);

      doc.setFontSize(33);
      doc.setFontType('normal');
      doc.setTextColor(0);

      if(this.breakTextLine(carType, 22)?.secondLineString){
        if(this.breakTextLine(carGrade.Title,30)?.secondLineString){
          doc.text(this.breakTextLine(carGrade.Title, 30).firstLineString, 100, 480);
          doc.text(this.breakTextLine(carGrade.Title, 30).secondLineString, 100, 510);
          doc.text(this.truncateString(carColor.name, 30), 100, 550);
        }else{
          doc.text(carGrade.Title, 100, 480);
          doc.text(this.truncateString(carColor.name, 30), 100, 515);
        }
      }else{
        if(this.breakTextLine(carGrade.Title,30)?.secondLineString){
          doc.text(this.breakTextLine(carGrade.Title, 30).firstLineString, 100, 460);
          doc.text(this.breakTextLine(carGrade.Title, 30).secondLineString, 100, 490);
          doc.text(this.truncateString(carColor.name, 30), 100, 530);
        }else{
          doc.text(carGrade.Title, 100, 460);
          doc.text(this.truncateString(carColor.name, 30), 100, 500);
        }
      }

      try {
        let imageWidth = 0;
        let imageHeight = 0;
        let ratio = 0;
        testImage.onload = function(){
          imageWidth = this.width;
          imageHeight = this.height;
          ratio = imageWidth / 640;
          doc.addImage(testImage, 'PNG', 540, 200, 640, Math.round(imageHeight/ratio));
        }
      } catch (err) {
        console.error('error when loading image ', err);
      }

      doc.setLineWidth(1);
      doc.setLineDash([]);
      doc.line(this.marginLeftPdf, 700, 1180, 700);
      doc.setFont('KittithadaMedium65');
      doc.setFontSize(50);
      doc.text('ประเมินราคา', doc.internal.pageSize.getWidth()/2, 800, { align: "center" });
      const carTypeWidth = Math.ceil(doc.getTextWidth('ประเมินราคา'));
      doc.setFont('Arial');
      doc.setLineWidth(2);
      doc.setDrawColor(255, 0, 0);
      // INFO : set position left, right red line
      doc.line(this.redLineLeftMargin(carTypeWidth), 790, this.redLineLeftMargin(carTypeWidth) + 50, 790);
      doc.line(this.redLineRightMargin(carTypeWidth), 790, this.redLineRightMargin(carTypeWidth) + 50, 790);

      doc.setFont('KittithadaMedium65');
      doc.setFontSize(31);
      doc.text(carType, this.marginLeftPdf + 8, 885);

      doc.setFontSize(25);
      doc.text('Estimated Result (Approximate)', this.textMarginRight(doc.getTextWidth('Estimated Result (Approximate)')), 885);

      doc.setFontSize(20);
      doc.text('•', 78, 936);
      doc.text('•', 78, 977);
      doc.setFontSize(30);
      doc.text(carGrade.Title, 94, 937);
      doc.text(carColor.name, 94, 979);

      doc.setLineWidth(1);
      doc.setDrawColor(0);
      doc.line(this.marginLeftPdf, 1017, 1180, 1017);

      doc.setFontSize(22);
      doc.setFont('Arial');
      doc.text('Total payment', 67, 1070);

      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.circle(83, 1101, 15, 'FD');
      doc.circle(142, 1101, 15, 'FD');
      doc.text('A', 75, 1108);
      doc.text('B', 135, 1109);
      doc.text('+', 107, 1109);

      doc.setFontSize(28);
      doc.text(this.customMoneyForPdf(this.totalPrice(quote).toString()), this.textMarginRight(doc.getTextWidth(this.customMoneyForPdf(this.totalPrice(quote).toString()))), 1089);
      doc.line(this.marginLeftPdf, 1141, 1180, 1141);

      doc.setFillColor(255, 255, 255);
      doc.circle(79, 1174, 11, 'FD');
      doc.circle(648, 1174, 11, 'FD');

      doc.setFontSize(18);

      doc.setFontType('bold');
      doc.text('A', 73, 1180);
      doc.text('B', 642, 1180);

      doc.setFont('KittithadaMedium65');
      doc.text('Total car price (Bath)', 100, 1181);
      doc.text(this.customMoneyForPdf(this.totalPrice(quote,false).toString()), this.textHalfPdf(doc.getTextWidth(this.customMoneyForPdf(this.totalPrice(quote,false).toString()))), 1181);
      doc.text('Total insurance package', 667, 1181);
      doc.text(this.customMoneyForPdf(carInsurance?.price), this.textMarginRight(doc.getTextWidth(this.customMoneyForPdf(carInsurance?.price))), 1181);

      doc.line(this.marginLeftPdf, 1211, this.marginLeftPdf + 543, 1211);
      doc.line(638, 1211, 638 + 543, 1211);

      doc.setFontSize(19);
      doc.setFontType('normal');
      doc.text('Car price', this.marginLeftPdf + 7, 1260);
      doc.text(this.customMoneyForPdf(carGrade?.Price), this.textHalfPdf(doc.getTextWidth(this.customMoneyForPdf(carGrade?.Price))), 1260);
      doc.text('Insurance package 1', 645, 1260);
      doc.text(this.customMoneyForPdf(carInsurance?.price), this.textMarginRight(doc.getTextWidth(this.customMoneyForPdf(carInsurance?.price))),1260);

      doc.text(carColor.name, this.marginLeftPdf + 7, 1310);
      doc.text(this.customMoneyForPdf(carColor?.price),  this.textHalfPdf(doc.getTextWidth(this.customMoneyForPdf(carColor?.price))) , 1310);

      doc.line(this.marginLeftPdf, 1360, 1180, 1360);

      doc.setFont('KittithadaMedium65');
      doc.setFontSize(20);
      doc.text('หมายเหตุ', this.marginLeftPdf + 6, 1414);
      const date = new Date()
      let dateString = date.getDate().toString() + '/' + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1).toString() + '/' + date.getFullYear();

      doc.text(`1. ราคาในการประเมินเบื้องต้นนี้เป็นราคา ณ วันที่ (${dateString})`, this.marginLeftPdf + 6, 1451);
      doc.text('2. บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงราคา ข้อกำหนด และเงื่อนไข โดยไม่ต้องแจ้งให้ทราบล่วงหน้า', this.marginLeftPdf + 6, 1484);
      doc.text('3. เอกสารนี้ไม่ใช่ใบเสนอราคา หากลูกค้าสนใจซื้อรถ ขอให้ลูกค้าติดต่อที่ผู้จำหน่ายอีซูซุทั่วประเทศ', this.marginLeftPdf + 6, 1517);
      // doc.text('- มิวสิคกรุ๊ปเนิร์สเซอรี่ฮอตดอกแมกกาซีน กราวนด์ ซามูไรพรีเมียร์อุตสาหการวโรกาส เทรนด์ม้านั่งออโต้ สงบสุข', this.marginLeftPdf + 6, 1550);

      // INFO : draw footer

      doc.setDrawColor(0);
      doc.setFillColor(88, 88, 90);
      doc.rect(0, this.pdfHeight - 130, this.pdfWidth, 130, 'FD');

      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);

      doc.setFont('KittithadaMedium65');

      doc.text('สงวนลิขสิทธิ์ © 2019 บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด', this.marginLeftPdf + 6, this.pdfHeight - 55);

      doc.addImage(hotLine, 'PNG', this.pdfWidth - 350, this.pdfHeight - 90, 290, 54);
      setTimeout(() => {
        let dateString = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString();
        let fileName = dateString + carGrade.Title + '-'+ carColor.name;
        // INFO : replace space, dot  by whitespace
        fileName = fileName.replace(/\./g, '');
        fileName = fileName.replace(/\s/g, '');
        doc.save(fileName);
      },200);
    },
  },
  filters: {
    formatMoney: function(value) {
      return customMoney(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.save-quotes {
  background: #f5f5f5;
  padding: 135px 0 35px;
  color: $gray-800;
  overflow: hidden;

  @include media-breakpoint-up(lg) {
    padding: 125px 0 120px;
  }

  &__heading {
    text-align: center;
    margin-bottom: 45px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 55px;
    }

    @include media-breakpoint-up(xl) {
      margin-bottom: 70px;
    }

    &__desc {
      font-size: 2.4rem;
      padding-top: 25px;

      @include media-breakpoint-up(lg) {
        font-size: 3rem;
      }
    }
  }

  &__position {
    position: relative;
  }

  &__content {
    .col-6 {
      &:nth-child(3) {
        display: none;

        @include media-breakpoint-up(sm) {
          display: block;
        }
      }
    }
  }

  >>> .text-bold {
    font-weight: bold;
  }

  // Customize arrow button of Slider:
  @include swiper();

  .swiper-button-next,
  .swiper-button-prev{
    z-index : $NOMAL-ZINDEX;
    margin-top: 0;
    top: 60px;
    outline: none;

    @include media-breakpoint-up(md) {
      top: 85px;
    }

    @include media-breakpoint-up(lg) {
      top: 110px;
    }
  }

  .swiper-button-prev {
    width: 28px;
    height: 28px;
    background-size: contain;
    left: -13px;

    @include media-breakpoint-up(md) {
      left: -24px;
      width: 40px;
      height: 40px;
    }

    @include media-breakpoint-up(lg) {
      left: -23px;
      width: 45px;
      height: 45px;
    }

    @include media-breakpoint-up(xl) {
      left: -25px;
    }
  }

  .swiper-button-next {
    width: 28px;
    height: 28px;
    background-size: contain;
    right: -13px;

    @include media-breakpoint-up(md) {
      right: -23px;
      width: 40px;
      height: 40px;
    }

    @include media-breakpoint-up(lg) {
      right: -24px;
      width: 45px;
      height: 45px;
    }

    @include media-breakpoint-up(xl) {
      right: -25px;
    }
  }
}
</style>
