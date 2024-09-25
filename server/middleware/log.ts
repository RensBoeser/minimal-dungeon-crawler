export default defineEventHandler(async (event) => {
  console.log(event.context.userId, event.method, event.path)
})
