<template>
  <div class="main-container">
    <visitor-identification />
    <div class="header">
      <placeholder name="jss-header" :rendering="route" />
    </div>
    <div>
      <placeholder name="jss-main" :rendering="route" />
    </div>
    <div class="footer">
      <placeholder name="jss-footer" :rendering="route" />
    </div>
  </div>
</template>

<script>
// import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from './components/shared/IsuPlaceholder';
import VisitorIdentification from './VisitorIdentification';

export default {
  name: 'Layout',
  props: {
    route: {
      type: Object,
      default: () => ({}),
    },
  },
  metaInfo() {
    return {
      title: this.route?.fields?.BrowserTitle?.value || this.route?.fields?.PageTitle?.value || 'Page',
      htmlAttrs: {
        lang: "th",
      },
      meta: [
        {
          property: 'og:type',
          content: this.route?.fields?.OGType?.value || '',
        },
        {
          'data-hid': 'og:title',
          property: 'og:title',
          content: this.route?.fields?.OGTitle?.value || '',
        },
        {
          'data-hid': 'og:description',
          property: 'og:description',
          content: this.route?.fields?.OGDescription?.value || '',
        },
        {
          'data-hid': 'og:url',
          property: 'og:url',
          content: this.route?.fields?.SeoFollowLinks?.value || '',
        },
        {
          property: 'og:site_name',
          content: this.route?.fields?.OGSiteName?.value || '',
        },
        {
          property: 'og:locale',
          content: this.route?.fields?.OGLocale?.value || '',
        },
        {
          'data-hid': 'og:image',
          property: 'og:image',
          content: this.route?.fields?.OGImage?.value || '',
        },
        {
          'data-hid': 'twitter:title',
          property: 'twitter:title',
          content: this.route?.fields?.TwitterTitle?.value || '',
        },
        {
          'data-hid': 'twitter:description',
          property: 'twitter:description',
          content: this.route?.fields?.TwitterDescription?.value || '',
        },
        {
          property: 'twitter:card',
          content: this.route?.fields?.TwitterCard?.value || '',
        },
      ],
    };
  },
  components: {
    Placeholder: IsuPlaceholder,
    VisitorIdentification,
  },
};
</script>

<style lang="scss">
@import './assets/app.scss';
// TODO: why I cannot move @font-face to app.scss
@font-face {
  font-family: KittithadaBold75;
  src: 
    url('./assets/fonts/psl245pro_0-webfont.woff') format('woff'),
    url('./assets/fonts/psl245pro_0-webfont.woff2') format('woff2'),
    url('./assets/fonts/psl245pro_0-webfont.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: KittihadaMedium65;
  src: url('./assets/fonts/KittithadaMedium65.eot') format('embedded-opentype'),
    url('./assets/fonts/KittithadaMedium65.woff') format('woff'),
    url('./assets/fonts/KittithadaMedium65.woff2') format('woff2'),
    url('./assets/fonts/KittithadaMedium65.ttf') format('truetype'),
    url('./assets/fonts/KittithadaMedium65.svg') format('svg');
  font-weight: 400;
  font-style: normal;

  font-display: swap;
}

@font-face {
  font-family: KittihadaRoman55;
  src: url('./assets/fonts/psl242pro-webfont.eot') format('embedded-opentype'),
    url('./assets/fonts/psl242pro-webfont.woff') format('woff'),
    url('./assets/fonts/psl242pro-webfont.woff2') format('woff2'),
    url('./assets/fonts/psl242pro-webfont.ttf') format('truetype'),
    url('./assets/fonts/psl242pro-webfont.svg') format('svg');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Eurothai;
  src: url('./assets/fonts/db_eurothai_x_v3.2-webfont.woff') format('woff'),
    url('./assets/fonts/db_eurothai_x_v3.2-webfont.woff2') format('woff2'),
    url('./assets/fonts/db_eurothai_x_v3.2-webfont.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Eurothai;
  src: url('./assets/fonts/db_eurothai_x_bd_v3.2-webfont.woff') format('woff'),
    url('./assets/fonts/db_eurothai_x_bd_v3.2-webfont.woff2') format('woff2'),
    url('./assets/fonts/db_eurothai_x_bd_v3.2-webfont.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Eurothai-Demi;
  src: url('./assets/fonts/db_eurothai_x_demi_v3.2-webfont.woff') format('woff'),
    url('./assets/fonts/db_eurothai_x_demi_v3.2-webfont.woff2') format('woff2'),
    url('./assets/fonts/db_eurothai_x_demi_v3.2-webfont.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Eurothai-Xbold-Extit;
  src: url('./assets/fonts/db_eurothai_x_bd_ext_it_v3.2-webfont.woff') format('woff'),
    url('./assets/fonts/db_eurothai_x_bd_ext_it_v3.2-webfont.woff2') format('woff2'),
    url('./assets/fonts/db_eurothai_x_bd_v3.2-webfont.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

// INFO: I don't know why there is overflow here, this is just workaround
// TODO: find complete solution for this
.main-container {
  overflow-x: hidden;
}
.header {
  position: relative;
  z-index: $HEADER_ZINDEX;

  & + div {
    position: relative;
    padding-top: $mobile-header-height;
  }
}
</style>
