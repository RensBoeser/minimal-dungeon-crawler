import { TEMP_USER_ID, useUserService } from "~/server/utils/user"

export default defineEventHandler(async () => {
  const { getUser } = useUserService(TEMP_USER_ID)
  const user = await getUser()

  if (!user) {
    throw createError("User not found")
  }

  return user
})
