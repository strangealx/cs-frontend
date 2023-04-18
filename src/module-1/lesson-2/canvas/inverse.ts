import { forEachPixel, getImageData } from './helpers'
import { ImageSource } from './types'

export const inverse = async (image: ImageSource) => {
  const imageData = await getImageData(image)

  return forEachPixel(imageData, (data, i) => {
    const alpha = data[i + 3]

    data[i] = alpha ^ data[i]
    data[i + 1] = alpha ^ data[i + 1]
    data[i + 2] = alpha ^ data[i + 2]
  })
}
