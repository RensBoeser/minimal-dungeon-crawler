export default oauthGitHubEventHandler({
  config: {
    scope: [],
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })
    return sendRedirect(event, "/")
  },
})
