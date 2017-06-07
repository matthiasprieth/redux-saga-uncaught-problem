import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import ButtonBox from '../Components/ButtonBox'
import { StackNavigator } from 'react-navigation'
import { Button, Slider } from 'react-native-elements'

// Screens
// import APITestingScreen from './APITestingScreen'
// import ComponentExamplesScreen from './ComponentExamplesScreen'
// import DeviceInfoScreen from './DeviceInfoScreen'
// import PluginExamplesScreen from './PluginExamplesScreen'
// import ThemeScreen from './ThemeScreen'
// import FaqScreen from './FaqScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import ListviewGridExample from './ListviewExample'

// Styles
import styles from './Styles/StartScreenStyles'

class StartScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      sliderValue: 0
    }
  }

  openLogin = () => {
    this.props.navigation.navigate( 'LoginScreen' )
  }

  openGridView = ( siteName ) => {
    this.props.navigation.navigate( 'ListviewGridExample' )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 10,
          zIndex: 10
        }}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.container}>
          <View style={styles.centered}>
          </View>
          <Text style={styles.sectionText}>
            Default screens for development, debugging, and alpha testing
            are available below.
          </Text>
          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={this.openLogin} style={styles.deviceButton} image={Images.deviceInfo} text='LoginScreen' />
            <ButtonBox onPress={this.openGridView} style={styles.usageButton} image={Images.faq} text='ListviewGridExample' />
          </View>

          <Button
            title="Elements Lib Button"
          />

          <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
            <Slider
              value={this.state.sliderValue}
              onValueChange={(sliderValue) => this.setState({sliderValue})} />
            <Text>Value: {this.state.sliderValue}</Text>
          </View>

        </ScrollView>

        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>Made with ❤️ by Infinite Red</Text>
        </View>
      </View>
    )
  }
}

export default StackNavigator({
  StartScreen: {screen: StartScreen},
  LoginScreen: {screen: LoginScreen},
  ListviewGridExample: {screen: ListviewGridExample},
  RegisterScreen: {screen: RegisterScreen}
  // APITestingScreen: {screen: APITestingScreen},
  // ComponentExamplesScreen: {screen: ComponentExamplesScreen},
  // DeviceInfoScreen: {screen: DeviceInfoScreen},
  // PluginExamplesScreen: {screen: PluginExamplesScreen},
  // ThemeScreen: {screen: ThemeScreen},
  // FaqScreen: {screen: FaqScreen}
}, {
  initialRouteName: 'StartScreen',
  headerMode: 'none',
  // headerMode: 'none',
  // Keeping this here for future when we can make
  navigationOptions: {
    header: {
      left: (
        <TouchableOpacity onPress={() => window.alert('pop')} ><Image source={Images.closeButton} style={{marginHorizontal: 10}} /></TouchableOpacity>
      ),
      style: {
        backgroundColor: '#3e243f'
      }
    }
  }
})
