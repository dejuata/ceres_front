export interface User {
  email: string,
  password: string
}

enum Role {
  Admin = 1,
  Manager = 2,
  FieldManager = 3,
  Operator = 4
}

export interface UserResponse {
  success: boolean,
  status: number,
  message: string,
  access: string,
  refresh: string
  authenticatedUser: {
    email: string,
    role: Role
  }
}
