import axios from 'axios'
import { User } from '../types/User'

const API_URL = 'http://localhost:3000'

export const getUsers = async () => {
  const res = await axios.get<User[]>(`${API_URL}/`)
  return res.data
}

export const createUser = async (user: User) => {
  const res = await axios.post<User>(`${API_URL}/`, user)
  return res.data
}

export const updateUser = async (id: string, user: User) => {
  const res = await axios.put<User>(`${API_URL}/${id}`, user)
  return res.data
}

export const deleteUser = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`)
}
