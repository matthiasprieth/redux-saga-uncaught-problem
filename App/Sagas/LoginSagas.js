import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

import { AsyncStorage } from 'react-native'

// attempts to login
export function * login (api, action) {
  const { username, password } = action
  const response = yield call(api.login, username, password)

  if(response.ok){
    //set headers
    const userData = response.data
    const token = userData.token
    
    yield AsyncStorage.setItem('@AppLocalStorage:token', token)
    yield call(api.setHeader, 'Authorization', `Bearer ${token}`)
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(userData))
  } else {
    // dispatch failure
    yield put(LoginActions.loginFailure('NORMAL LOGIN FAILED wrong user data etc.'))
  }
}

export function * logout (api, action) {
  yield call(api.setLogoutHeader)
  yield AsyncStorage.removeItem('@AppLocalStorage:token')
  yield put(LoginActions.logoutSuccess())
}



