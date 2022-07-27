export interface User {
  id: string
  name: string
  email: string
  created_at: string
}

export type GetUsersResponse = {
  totalCount: number
  users: User[]
}
