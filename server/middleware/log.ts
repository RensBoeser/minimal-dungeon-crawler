export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  console.log(event.context.userId, event.method, event.path)
})
