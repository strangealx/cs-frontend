import { forEachPixel, getImageData } from './helpers'
import { ImageSource } from './types'

const GRAYSCALE_RATIO = {
  red: 0.3,
  green: 0.59,
  blue: 0.11,
}

export const grayscale = async (image: ImageSource) => {
  const imageData = await getImageData(image)
  const { red, green, blue } = GRAYSCALE_RATIO

  return forEachPixel(imageData, (data, i) => {
    const result = data[i] * red + data[i + 1] * green + data[i + 2] * blue

    data[i] = result
    data[i + 1] = result
    data[i + 2] = result
  })
}
