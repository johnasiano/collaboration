import { get } from "./request.service"

export const getCategory = () => {
    return get('/api/category/get')
  }
