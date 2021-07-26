export function getCookieData(name){
  let pairs = document.cookie.split("; "),
    count = pairs.length, parts;
  while (count--) {
    parts = pairs[count].split("=");
    if (parts[0] === name)
      return parts[1];
  }
  return false;
}