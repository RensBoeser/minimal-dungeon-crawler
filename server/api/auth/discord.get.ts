export default oauthDiscordEventHandler({
  config: {
    scope: [],
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        generic: {
          provider: "discord",
          id: user.id,
          avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
          username: user.username,
          name: user.global_name,
        },
      },
    })

    const { setUser, checkUserExistence } = useUserService(`discord:${user?.id}`)

    // If the user is new, migrate the local user to the GitHub user and delete the local user
    const userExists = await checkUserExistence()
    if (!userExists) {
      const localSession = getCookie(event, "localSession")
      if (localSession) {
        const { getUser: getLocalUser, setUser: setLocalUser } = useUserService(`local:${localSession}`)

        console.log("Migrating local user to new Discord user", `local:${localSession}`, `discord:${user?.id}`)
        const localUser = await getLocalUser()
        await setUser(localUser)
        await setLocalUser(starterUser)
      }
    }

    return sendRedirect(event, "/")
  },
})
