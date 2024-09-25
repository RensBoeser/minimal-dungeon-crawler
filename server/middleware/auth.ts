import { v6 } from "uuid"

export default defineEventHandler(async (event) => {
  if (event.path.includes("/api/_nuxt_icon") || event.path.includes("/api/_auth")) {
    // Don't run this middleware on the icon endpoints so we don't create a new session for each request
    return
  }

  const { user, provider } = await getUserSession(event)

  if (!user) {
    let localSession = getCookie(event, "localSession")

    if (!localSession) {
      localSession = v6() // Generate a new UUID
      setCookie(event, "localSession", localSession)
    }

    event.context.userId = `local:${localSession}`
  }

  if (provider === "github") {
    event.context.userId = `${provider}:${user.id}`
  }
})
