export function lockScroll() {
  document.querySelector('body').classList.add('stop-scrolling');
}

export function unLockScroll() {
  document.querySelector('body').classList.remove('stop-scrolling');
}
