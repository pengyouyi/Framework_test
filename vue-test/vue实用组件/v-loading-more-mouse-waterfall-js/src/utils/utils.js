
// 瀑布流中用来获取最短的列
export function getMinCol(cols) {
  cols = Array.from(cols);
  let min = cols[0].clientHeight,
      index = 0;
  for (let i in cols) {
    if (min > cols[i].clientHeight) {
      min = cols[i].clientHeight;
      index = i;
    }
  }
  return index;
}
