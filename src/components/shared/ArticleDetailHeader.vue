<template>
  <div>
    <div class="article-detail-header">
      <div class="article-detail-header__time">
        <span>{{publishMonth | formatMonth}}</span>
        <span>{{publishYear}}</span>
      </div>
      <div class="article-detail-header__share">
        <ul>
          <li>
            <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + linkPage" target="_blank">
              <img class="img-default" src="../../assets/icon-facebook-black.png" alt="x">
              <img class="img-hover" src="../../assets/icon-facebook.png" alt="x">
            </a>
          </li>
          <li>
            <a :href="'https://social-plugins.line.me/lineit/share?url=' + linkPage" target="_blank">
              <img class="img-default" src="../../assets/icon-line-black.png" alt="x">
              <img class="img-hover" src="../../assets/icon-line.png" alt="x">
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="copyToClipboard">
              <img class="img-default" src="../../assets/icon-share-black.png" alt="x">
              <img class="img-hover" src="../../assets/icon-share.png" alt="x">
            </a>
          </li>
        </ul>
      </div>
      <input class="article-detail-header__input-url" type="text" name="url" id="url" :value="linkPage">
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

const monthThaiLandLanguageData = [
  // 'ม.ค.',
  // 'ก.พ.',
  // 'มี.ค.',
  // 'เม.ย.',
  // 'พ.ค.',
  // 'มิ.ย.',
  // 'ก.ค.',
  // 'ส.ค.',
  // 'ก.ย.',
  // 'ต.ค.',
  // 'พ.ย.',
  // 'ธ.ค.',
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
];

export default {
  name: 'ArticleDetailHeader',
  components: {},
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    publishMonth: {
      type: String,
    },
    publishYear: {
      type: String,
    }
  },
  data() {
    return {
      linkPage: '',
    }
  },
  mounted() {
    this.linkPage = window.location.href;
  },
  methods: {
    copyToClipboard() {
      let url = this.$el.querySelector('#url');
      url.select();
      document.execCommand('copy');
      alert('คัดลอกที่อยู่ของเว็บไซต์เรียบร้อยแล้ว');
    },
  },
  filters: {
    formatMonth: function(monthNumber) {
      // INFO: subtract one because month start from 0
      return monthThaiLandLanguageData[monthNumber - 1] ? monthThaiLandLanguageData[monthNumber - 1] : '';
    },
  },
}
</script>
<style lang="scss" scoped>
.article-detail-header {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;

  &__time {
    color: #737b88;
    font-size: 25px;

    span {
      margin-right: 6px;
    }
  }

  &__share {
    li {
      display: inline-block;

      &:not(:last-child) {
        margin-right: 12px;
      }

      & > a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        position: relative;


        &:hover {
          .img-default {
            opacity: 0;
          }

          .img-hover {
            opacity: 1;
          }
        }

        > img {
          border-radius: 3px;
          position: absolute;
          top: 0;
        }

        .img-default {
          opacity: 1;
          transition: all 0.5s;
        }

        .img-hover {
          opacity: 0;
          transition: all 0.5s;
        }
      }
    }
  }

  &__input-url {
    position: absolute;
    opacity: 0;
    left: -100%;
  }
}
</style>