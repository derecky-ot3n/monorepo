import axios from 'axios'

export const BaseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  headers: {
    "Content-Type": "application/json"
  }
})