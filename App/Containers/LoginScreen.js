import React, { PropTypes } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyles'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { Button } from 'react-native-elements'

// import {FBLogin, FBLoginManager} from 'react-native-facebook-login'
// import FBLoginView from '../Components/FbLoginView'

// import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'

class LoginScreen extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func,
    attemptSocialLogin: PropTypes.func,
    message: React.PropTypes.string,
  }

  isAttempting = false
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}

  constructor (props) {
    super(props)
    this.state = {
      username: 'test',
      password: 'test',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
      userData: {}
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      NavigationActions.pop()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentDidMount () {

  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  openRegister = () => {
    this.props.navigation.navigate('RegisterScreen')
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password)
  }

  handlePressLogout = () => {
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogout()
  }

  // handleFacebookLogin = ( e ) => {
  //   if(e.type === 'success'){
  //     const { credentials } = e
  //     this.isAttempting = true
  //     // attempt a login - a saga is listening to pick it up from here.
  //     this.props.attemptFacebookLogin(credentials.userId, credentials.token)  
  //   }else{
  //     console.tron.log('facebook error')
  //   }  
  // }

  // handleGoogleLogin = () => {
  //   GoogleSignin.signIn()
  //     .then((user) => {
  //       // console.tron.log(user)
  //       // this.setState({user: user})
  //       this.props.attemptGoogleLogin(user)
  //     })
  //     .catch((err) => {
  //       console.tron.log('WRONG SIGNIN')
  //       console.tron.log(err)
  //     })
  //     .done()  
  // }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render () {
    const { username, password } = this.state
    const { fetching, message } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
          <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
          <View style={Styles.form}>
            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{message}</Text>
              <Text style={Styles.rowLabel}></Text>
              <TextInput
                ref='username'
                style={textInputStyle}
                value={username}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeUsername}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.password.focus()}
                placeholder='Username' />
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>Password</Text>
              <TextInput
                ref='password'
                style={textInputStyle}
                value={password}
                editable={editable}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={this.handleChangePassword}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressLogin}
                placeholder='Password' />
            </View>

            <View style={[Styles.loginRow]}>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
                <View style={Styles.loginButton}>
                  <Text style={Styles.loginText}>Sign In</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={NavigationActions.pop}>
                <View style={Styles.loginButton}>
                  <Text style={Styles.loginText}>Cancel</Text>
                </View>  
              </TouchableOpacity>
            </View>

            <View style={[Styles.loginRow]}>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.openRegister}>
                <View style={[ {backgroundColor: '#2342'}, ...Styles.loginButton ]}>
                  <Text style={Styles.loginText}>Registrieren</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[Styles.loginRow]}>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogout}>
                <View style={{ backgroundColor: '#2342' }}>
                  <Text style={Styles.loginText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    message: state.login.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    attemptLogout: () => dispatch(LoginActions.logoutRequest())
    // attemptFacebookLogin: (userId, accessToken) => dispatch(LoginActions.loginFacebookRequest(userId, accessToken)),
    // attemptGoogleLogin: (userData) => dispatch(LoginActions.loginGoogleRequest(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)