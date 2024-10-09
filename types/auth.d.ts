declare module "#auth-utils" {
  interface User {
    generic: {
      provider: "discord" | "github" | "microsoft"
      id: string | number
      username?: string
      name: string
      avatarUrl?: string
    }
    microsoft?: {
      "@odata.context": string
      businessPhones: Array<unknown>
      displayName: string
      givenName: string
      jobTitle: unknown | null
      mail: unknown | null
      mobilePhone: unknown | null
      officeLocation: unknown | null
      preferredLanguage: string
      surname: string
      userPrincipalName: string
      id: string
    }
  }
}
export {}
