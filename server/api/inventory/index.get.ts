import { getUser, TEMP_USER_ID } from "~/server/utils/user"

export default defineEventHandler(async () => {
  const user = await getUser(TEMP_USER_ID)

  if (!user) {
    throw createError("User not found")
  }

  return user
})
