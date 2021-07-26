const Constants = {
  SELECT_MODEL_STEP: 0,
  SELECT_GRADE_STEP: 1,
  SELECT_COLOR_STEP: 2,
  SELECT_INSURANCE_STEP: 3,
  FINAL_STEP: 4,

  CAR_GRADE_PAGING_SIZE: 100, // TODO: workaround to disable paging
  CAR_COLOR_PAGING_SIZE: 100, // TODO: workaround to disable paging

  FIND_DEALER_PAGING_SIZE: 10,

  CAMPAIGN_LISTING_PAGING_SIZE: 10,

  CONTENT_LISTING_PAGING_SIZE: 9,

  SUBMIT_FORM_FAILED: 'กรุณากรอกข้อมูลให้ครบถ้วน',
  SUBMIT_FORM_SUCCESSFUL: 'ขอบคุณสำหรับการลงทะเบียนรับข่าวสารกับอีซูซุ',
  SUBMIT_FORM_CONTACT_US_SUCCESSFUL: 'ระบบได้รับข้อมูลของท่านแล้ว ขอบคุณที่ติดต่อตรีเพชรอีซูซุ',

  SIGNUP_FORM_ID: 'campaign-form',
  SEARCH_ALL_TAB_TITLE: 'ทั้งหมด',

  ZOOM_MAIN_MAP: 5,
  ZOOM_MAP_POPUP_DEALER: 16,
  MARKER_WINDOW_WIDTH: 240,

  ZOOM_MAP_CONTACT_US: 16,
  ZOOM_MAP_MIN_CONTACT_US: 6,
  ZOOM_MAP_MAX_CONTACT_US: 19,

  INSTALLMENT_PERIOD_DATA : [
    { id: 12, label: '12' },
    { id: 24, label: '24' },
    { id: 36, label: '36' },
    { id: 48, label: '48' },
    { id: 60, label: '60' },
    { id: 72, label: '72' },
    { id: 84, label: '84' },
  ],

  DELETE_QUOTE_TITLE : 'ลบใบประเมินราคา',

  MOBILE_INNERWIDTH : 768,
  TABLET_INNERWIDTH : 992,

  FILL_ALL_INFORMATION : 'กรุณากรอกข้อมูลให้ครบถ้วน',
  ACCEPT_ALL_INFORMATION : 'กรุณาคลิกยอมรับเงื่อนไขก่อนลงทะเบียน',
  
  ACCESSORIES_LISTING_PAGING_SIZE_DESKTOP: 12,
  ACCESSORIES_LISTING_PAGING_SIZE_MOBILE: 6,
};

Constants.install = function (Vue) {
  Vue.prototype.$getConst = (key) => {
    return Constants[key];
  }
};
export default Constants;