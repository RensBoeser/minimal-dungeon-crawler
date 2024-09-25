import type { UserSessionComposable as _UserSessionComposable } from "#auth-utils"

declare module "#auth-utils" {
  type UserSession =
    | {
        user: User
        provider: "github"
      }
    | {
        user: undefined
        provider: undefined
      }

  interface User {
    id: number
    login: string
    avatar_url: string
    name: string
  }
}
export {}
