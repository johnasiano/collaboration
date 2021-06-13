export const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : ''
export const storageTokenKey = "ACCESS_TOKEN"
export const storageUserKey = "CURRENT_USER"
export const storageCartKey = "CARTS"
export const storageNavKey = "NAV_CATEGORY"

const privatePath  = [
  '/account', '/order', '/shipping', '/credithist'
]

export const isPrivateRoute = (path) => {
  return privatePath.includes(path);
}
export const noFooters = [
  '/account/edit',
]

export const recapcha_sitekey = '6LdksdYZAAAAAD_yMMaJX4iFN3PV1EgLKIOYGvW_'
export const recapcha_secretkey = '6LdksdYZAAAAAB5iHNdA8Qo_uZgIAMX3jCceXY1n'

export function getImageBaseUrl() {
  let imageUrl = '';
  if (window.location.hostname === 'localhost') {
      imageUrl = 'http://localhost:5000/uploads'; // localhost mode
  }
  if (window.location.hostname === 'devadmin.ygolegacy.com') {
      imageUrl = 'https://dev.ygolegacy.com/uploads'; // dev mode
  }
  if (window.location.hostname === 'admin.ygolegacy.com') {
      imageUrl = 'https://www.ygolegacy.com/uploads'; // live mode
  }   

  return imageUrl; 
}

export const conditionMap = {
  'Near Mint': 'NM',
  'Slightly Played': 'SP',
  'Moderately Played': 'MP',
  'Heavily Played': 'HP'
}