export default function completionCheck(list, level) {
  const temp = list.map((el) => el.x * level + el.y);
  for (let i = 0; i < temp.length; i++) {
    if (temp[i] !== i) return false;
  }
  return true;
}
