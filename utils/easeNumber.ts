const easeInOutQuad = (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

export const easeNumber = (durationInMs: number, callback: (value: number) => void) => {
  const update = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / durationInMs, 1)
    const easedProgress = easeInOutQuad(progress)
    callback(easedProgress * 100)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  let startTime: number
  requestAnimationFrame((currentTime) => {
    startTime = currentTime
    update(currentTime)
  })
}
