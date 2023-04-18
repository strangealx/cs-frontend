import { getImageDataFromCanvas } from './getImageDataFromCanvas'

export const getImageDataFromUrl = (image: string) =>
  new Promise<ImageData>((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const img = new Image()

    if (!context) {
      reject("Unexpected error: can't get context from canvas")
      return
    }

    img.src = image
    img.crossOrigin = 'Anonymous'

    img.onload = () => {
      const { width, height } = img

      canvas.width = width
      canvas.height = height
      context.drawImage(img, 0, 0)

      resolve(getImageDataFromCanvas(canvas))
    }

    img.onerror = () => {
      reject("Can't load image from url")
    }
  })
