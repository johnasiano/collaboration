import { post } from "./request.service"
import { storageTokenKey, storageUserKey } from "utils/constants"

////////// For regular account ////////////
export const signinAccount = async (accountInfo) => {
  try {
    const result =  await post('/api/auth/signin', accountInfo);      
    return result;
  } catch (error) {
    throw error
  }
}

export const signupAccount = async (accountInfo) => {
  try {
    const result = await post('/api/auth/signup', accountInfo);
    return result;
  } catch (error) {
    throw error
  }
}

////////// For google account ////////////
export const signinAccountGoogle = async (accountInfo) => {
  try {
    const result =  await post('/api/auth/google/signin', accountInfo);      
    return result;
  } catch (error) {
    throw error
  }
}

export const signupAccountGoogle = async (accountInfo) => {
  try {
    const result = await post('/api/auth/google/signup', accountInfo);
    return result;
  } catch (error) {
    throw error
  }
}


// export const passwordChange = async (passwordInfo) => {
//   try {
//     const result = await post('/api/auth/passchange', passwordInfo);
//     return result;
//   } catch (error) {
//     throw error
//   }
// }

// export const forgotPassword = async (accountInfo) => {
//   try {
//     const result = await post('/api/auth/forgot', accountInfo);
//     return result;
//   } catch (error) {
//     throw error
//   }
// }
