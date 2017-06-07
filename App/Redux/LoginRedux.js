import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['userData'],
  loginFailure: ['error'],
  logoutRequest: null,
  logoutSuccess: null
  // loginFacebookRequest: ['userId', 'accessToken', 'socialProvider'],
  // loginGoogleRequest: ['userData']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  successMessage: null,
  username: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, action) => {
  const { userData } = action
  return state.merge({ fetching: false, error: null, message: 'Hallo, ' + userData.username, userData })
}

// we've had a problem logging in
export const failure = (state, { error }) => {
  return state.merge({ fetching: false, message: error })
}

export const logoutRequest = (state) => state.merge({ fetching: true })

// export const facebookRequest = (state) => state.merge({ fetching: true })

export const googleRequest = (state) => state.merge({ fetching: true })

// we've logged out
export const logoutSuccess = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess
  // [Types.LOGIN_FACEBOOK_REQUEST]: facebookRequest,
  // [Types.LOGIN_GOOGLE_REQUEST]: googleRequest
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.username !== null
