export interface User {
  email: string,
  password: string
}
export interface UserResponse {
  success: boolean,
  status: number,
  message: string,
  token: string,
  refresh: string
  authenticatedUser: {
    email: string,
    role: string,
    name: string
  }
}
