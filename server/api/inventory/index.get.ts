export default defineEventHandler(async (event) => {
  const { getUser } = useUserService(event.context.userId)
  const user = await getUser()

  if (!user) {
    throw createError("User not found")
  }

  return user
})
