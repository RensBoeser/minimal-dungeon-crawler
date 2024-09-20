export default oauthGitHubEventHandler({
  config: {
    scope: ["read:user", "user:email"],
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })
    return sendRedirect(event, "/")
  },
})
