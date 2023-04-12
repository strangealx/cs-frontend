import { ImageSource } from '../types'
import { getImageDataFromCanvas } from './getImageDataFromCanvas'
import { getImageDataFromUrl } from './getImageDataFromUrl'

export const getImageData = (image: ImageSource) => {
  if (typeof image === 'string') {
    return getImageDataFromUrl(image)
  }

  if (image instanceof ImageData) {
    return Promise.resolve(image)
  }

  if (image instanceof HTMLCanvasElement) {
    return getImageDataFromCanvas(image)
  }

  return image
}
