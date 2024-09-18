import { starterUser, TEMP_USER_ID, useUserService } from "../utils/user"

export default defineNitroPlugin(async () => {
  const { getUser, setUser } = useUserService(TEMP_USER_ID)

  const currentUser = await getUser()
  if (currentUser) {
    return
  }

  console.log("Creating initial user")
  await setUser(starterUser)
})
