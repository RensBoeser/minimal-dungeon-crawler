export default defineOAuthMicrosoftEventHandler({
  config: {
    scope: [],
  },
  async onSuccess(event, { user }) {
    console.log(user)

    await setUserSession(event, {
      user: {
        generic: {
          provider: "microsoft",
          id: user.id,
          avatarUrl: undefined,
          username: undefined,
          name: user.displayName,
        },
      },
    })

    const { setUser, checkUserExistence } = useUserService(`github:${user?.id}`)

    // If the user is new, migrate the local user to the GitHub user and delete the local user
    const userExists = await checkUserExistence()
    if (!userExists) {
      const localSession = getCookie(event, "localSession")
      if (localSession) {
        const { getUser: getLocalUser, setUser: setLocalUser } = useUserService(`local:${localSession}`)

        console.log("Migrating local user to new GitHub user", `local:${localSession}`, `github:${user?.id}`)
        const localUser = await getLocalUser()
        await setUser(localUser)
        await setLocalUser(starterUser)
      }
    }

    return sendRedirect(event, "/")
  },
})
