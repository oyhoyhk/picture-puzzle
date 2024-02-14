export default function completionCheck(list, level) {
  if (list.length === 0) return false;
  const temp = list.map((el) => el.imageX * level + el.imageY);
  console.log(
    list
      .map(
        (el) =>
          `image : ${el.imageX * level + el.imageY}, pos : ${
            el.posX * level + el.posY
          }`
      )
      .join("\n")
  );
  for (let i = 0; i < temp.length; i++) {
    if (temp[i] !== i) return false;
  }
  return true;
}
