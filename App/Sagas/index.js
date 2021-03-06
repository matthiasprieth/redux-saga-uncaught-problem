import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { logout } from './LoginSagas'
import { getUserAvatar } from './GithubSagas'
import { openScreen } from './OpenScreenSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    // some sagas receive extra parameters in addition to an action
    // API related sagas
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api)
    // takeLatest(LoginTypes.LOGIN_FACEBOOK_REQUEST, loginFacebook, api),
    // takeLatest(LoginTypes.LOGIN_GOOGLE_REQUEST, loginGoogle, api)
    // takeLatest(RegisterTypes.REGISTER_REQUEST, register, api)        
  ]
}
