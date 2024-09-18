import { starterUser } from "~/server/utils/user"

export default defineEventHandler(async () => {
  const { setUser } = useUserService(TEMP_USER_ID)

  console.log("Resetting user")
  await setUser(starterUser)
})
