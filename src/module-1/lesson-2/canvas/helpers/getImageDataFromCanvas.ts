export const getImageDataFromCanvas = (canvas: HTMLCanvasElement) => {
  const { width, height } = canvas
  const context = canvas.getContext('2d')

  if (!context) {
    return Promise.reject("Unexpected error: can't get context from canvas")
  }

  return Promise.resolve(context.getImageData(0, 0, width, height))
}
