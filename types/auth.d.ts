// type Test =
//   | {
//       provider: "github"
//       id: number
//       login: string
//       avatar_url: string
//       name: string
//     }
//   | {
//       provider: "discord"
//       id: string
//       username: string
//       avatar: string
//     }

declare module "#auth-utils" {
  interface User {
    // sso:
    //   | {
    //       provider: "github"
    //       id: number
    //       login: string
    //       avatar_url: string
    //       name: string
    //     }
    //   | {
    //       provider: "discord"
    //       id: string
    //       username: string
    //       avatar: string
    //       global_name: string
    //     }
    generic: {
      provider: "discord" | "github"
      id: string | number
      username: string
      name: string
      avatarUrl: string
    }
  }
}
export {}
