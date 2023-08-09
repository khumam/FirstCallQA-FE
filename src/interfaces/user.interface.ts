interface StoreUserPayload {
  username: string
  first_name: string
  last_name: string
}

interface UpdateUserPayload {
  id: string
  first_name: string
  last_name: string
}

interface User {
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  updatedAt: string,
  createdAt: string
}

interface GetAllUserResponse {
  status: string,
  data: User[]
}

export type {
  StoreUserPayload,
  UpdateUserPayload,
  GetAllUserResponse,
  User
}