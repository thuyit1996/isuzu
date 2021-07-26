
export function isMobile(type) {
  return type === 1;
}

export function isTablet(type) {
  return type === 2;
}

export function isDesktop(type) {
  return type === 3;
}

export function loadJS(url, onLoadSuccess, onLoadError, location){
  //url is URL of external file, onLoadSuccess is the code
  //to be called from the file, location is the location to
  //insert the <script> element

  var scriptTag = document.createElement('script');
  scriptTag.src = url;

  scriptTag.onload = onLoadSuccess;
  scriptTag.onerror = onLoadError;

  location.appendChild(scriptTag);
}
