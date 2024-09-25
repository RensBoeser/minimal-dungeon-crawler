import { starterUser } from "~/server/utils/user"

export default defineEventHandler(async (event) => {
  const { setUser } = useUserService(event.context.userId)

  console.log("Resetting user")
  await setUser(starterUser)
})
