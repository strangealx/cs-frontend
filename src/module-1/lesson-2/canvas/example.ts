import { grayscale } from './grayscale'
import { inverse } from './inverse'

const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png'

;(async () => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const imageData = await grayscale(inverse(IMAGE))

  canvas.width = imageData.width || 0
  canvas.height = imageData.height || 0

  if (context && imageData) {
    context.putImageData(imageData, 0, 0)
    document.body.appendChild(canvas)
  }
})()

export { grayscale, inverse }
