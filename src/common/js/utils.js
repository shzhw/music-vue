/**
 * Created by ww on 2017/9/8.
 */
export function shuffle(arr) {
  let _arr = arr.slice(); // 防止污染参数
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function debounce(func, delay) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function insertArray(arr, val, compare, maxLen) {
  let index = arr.findIndex(compare);
  if (index === 0) return;
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

export function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
