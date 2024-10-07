export default defineOAuthGitHubEventHandler({
  config: {
    scope: [],
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        generic: {
          provider: "github",
          id: user.id,
          avatarUrl: user.avatar_url,
          username: user.login,
          name: user.name,
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
