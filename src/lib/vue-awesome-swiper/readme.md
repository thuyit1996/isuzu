We don't use /dist/ssr.js from vue-awesome-swiper in /node_modules because it has problem with serverside rendering ( window is undefined )
So I clone the library to local folder with little change:

From line 18:
if (typeof window !== "undefined") {
  var Swiper = window.Swiper || _swiper2.default;
} else {
  var Swiper = _swiper2.default;
}