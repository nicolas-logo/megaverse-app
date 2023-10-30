export const countDifferentCells = (array1, array2) => {
  if (array1.length !== array2.length || array1[0].length !== array2[0].length) {
    throw new Error('Arrays must have the same dimensions')
  }

  let differentCells = 0

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[i].length; j++) {
      if (array1[i][j] !== array2[i][j]) {
        differentCells++
      }
    }
  }

  return differentCells
}
