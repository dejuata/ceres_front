export interface User {
  email: string,
  password: string
}
export interface UserResponse {
  email: string,
  role: string,
  name: string
  tokens: {
    refresh: string,
    access: string
  },
  refresh: string,
  access: string,
}
