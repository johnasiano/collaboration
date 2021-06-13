import * as request from "./request.service"

export const getSearchSingleList = (search) => {
  return request.get(`/api/admin/sidepanel/search/single?search=${search}`)
}

export const setSingleItems = (items) => {
  return request.post('/api/admin/storeoption', {data: items})
}

export const getSearchSealedList = (search) => {
  return request.get(`/api/admin/sidepanel/search/sealed?search=${search}`)
}

export const setSealedItems = (items) => {
  return request.post('/api/admin/storeoption', {data: items})
}
