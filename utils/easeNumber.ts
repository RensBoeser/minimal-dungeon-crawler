export const easeNumber = (durationInMs: number, callback: (value: number) => void) => {
  const startTime = performance.now()

  function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / durationInMs, 1) // Ensure progress is between 0 and 1
    const easedProgress = easeInOutQuad(progress) // Apply easing
    const value = easedProgress * 100

    callback(value)

    if (progress < 1) {
      requestAnimationFrame(update) // Continue animation until it's done
    }
  }

  requestAnimationFrame(update)
}
