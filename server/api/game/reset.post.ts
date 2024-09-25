export default defineEventHandler(async (event) => {
  const { initializeUser } = useUserService(event.context.userId)
  await initializeUser()
})
