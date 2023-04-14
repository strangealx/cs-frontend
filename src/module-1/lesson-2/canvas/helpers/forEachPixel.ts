export const forEachPixel = (imageData: ImageData, fn: (imageData: Uint8ClampedArray, index: number) => void) => {
  let counter = 0

  while (counter < imageData.data.length) {
    fn(imageData.data, counter)
    counter += 4
  }

  return imageData
}
