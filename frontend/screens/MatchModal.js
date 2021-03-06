import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Animated
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Random from '../constants/Random';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { sample } from 'lodash';
import { Ionicons } from '@expo/vector-icons';


export default class MatchModal extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Match',
      header: null,
      isModal: true,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      matchGuy: false,
      matchGirl: false,
      guyMessage: '',
      girlMessage: '',
      openMatchModal: false,
      openModalOpacity: new Animated.Value(0)
    }
  }

  matchModal = () => {
    if (this.state.openMatchModal) {
      return (
        <Animated.View
          style={[styles.matchModal, {opacity: this.state.openModalOpacity}]}>
          <Ionicons name="ios-man" size={150} style={styles.icons}></Ionicons>
          <Ionicons name="md-heart" size={150} style={styles.icons}></Ionicons>
          <Ionicons name="ios-woman" size={150} style={styles.icons}></Ionicons>
        </Animated.View>
      )
    } else { return null }
  }

  openCloseModal = () => {
    this.setState({ openMatchModal: true }, () => {
      Animated.sequence([
        Animated.timing(this.state.openModalOpacity, {
          toValue: 1,
          duration: 1500
        }),
        Animated.timing(this.state.openModalOpacity, {
          toValue: 0,
          duration: 3000
        })
      ]).start();
      setTimeout(this.goToSuggestMatch, 4500 )
    })
  }

  goToSuggestMatch = () => {
    this.props.navigation.navigate("FindMatch");
  }

  handleMatch = () => {
    const { guy, girl } = this.props.navigation.state.params;
    const guyMatch = {matchmaker_id: this.props.currentUser.id, recipient_id: guy.id,
      suggested_id: girl.id, message: this.state.guyMessage}

    const girlMatch = {matchmaker_id: this.props.currentUser.id, recipient_id: girl.id,
      suggested_id: guy.id, message: this.state.girlMessage}

    if (this.state.matchGuy && this.state.matchGirl) {
      this.props.createMatch(guyMatch)
      this.props.createMatch(girlMatch)
    } else if (this.state.matchGuy) {
      this.props.createMatch(guyMatch)
    } else if (this.state.matchGirl) {
      this.props.createMatch(girlMatch)
    }
    this.openCloseModal();
  }

  matchText = () => {
    const { guy, girl } = this.props.navigation.state.params;

    if (this.state.matchGuy && this.state.matchGirl) {
      return `Send match to ${guy.first_name} & ${girl.first_name}`
    } else if (this.state.matchGuy) {
      return `Send match to ${guy.first_name}`
    } else if (this.state.matchGirl) {
      return `Send match to ${girl.first_name}`
    } else {
      return 'Choose who to send match to'
    }
  }

  render() {
    const { guy, girl } = this.props.navigation.state.params;

    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}>

        <View style={styles.maleCard}>

          <View style={styles.cardLeft}>
            <Image source={{uri: guy.avatar}} style={styles.cardImage} />

            <View style={styles.info}>
              <Text style={styles.infoText}>{guy.first_name} {guy.last_name}, {guy.age}</Text>
            </View>

            <TouchableOpacity
              style={[styles.activateMatch, {backgroundColor:
              this.state.matchGuy ? Colors.slackGreen : Colors.slackYellow } ]}
              onPress={() => this.setState({ matchGuy: !this.state.matchGuy })}>
              <Text style={styles.activateMatchText}>{`Match ${guy.first_name}`}</Text>
            </TouchableOpacity>

          </View>

          <View>
            <TextInput
              style={styles.textInput}
              placeholder={`Send a message to ${guy.first_name}`}
              multiline={true}
              onChangeText={(text) => this.setState({guyMessage: text})}
              value={this.state.guyMessage}></TextInput>
          </View>


        </View>

        <View style={styles.femaleCard}>

          <View style={styles.cardLeft}>

            <Image source={{uri: girl.avatar}} style={styles.cardImage} />

            <View style={styles.info}>
              <Text style={styles.infoText}>{girl.first_name} {girl.last_name}, {girl.age}</Text>
            </View>

              <TouchableOpacity
                style={[styles.activateMatch, {backgroundColor:
                this.state.matchGirl ? Colors.slackGreen : Colors.slackYellow } ]}
                onPress={() => this.setState({ matchGirl: !this.state.matchGirl })}>
                <Text style={styles.activateMatchText}>{`Match ${girl.first_name}`}</Text>
              </TouchableOpacity>

          </View>

          <View>
            <TextInput
              style={styles.textInput}
              placeholder={`Send a message to ${girl.first_name}`}
              multiline={true}
              onChangeText={(text) => this.setState({girlMessage: text})}
              value={this.state.girlMessage}></TextInput>
          </View>


        </View>

        <TouchableOpacity
          disabled={!this.state.matchGuy && !this.state.matchGirl}
          onPress={this.handleMatch}
          style={[styles.matchButton,
            {backgroundColor:
            this.state.matchGirl || this.state.matchGuy ? Colors.slackGreen : Colors.slackYellow }]} >
          <Text style={styles.matchText}>{this.matchText()}</Text>
        </TouchableOpacity>

        {this.matchModal()}

      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.slackPurple,
    padding: 2,
    borderColor: Colors.slackBlue,
  },
  maleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.slackBlue,
    padding: 5,
    margin: 2,
    flex: .5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.slackBlue,
    shadowColor: Colors.slackRed,
    shadowOffset: {width: 5, height: 10},
  },
  femaleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.slackRed,
    padding: 5,
    flex: .5,
    margin: 2,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.slackRed,
    shadowColor: Colors.slackBlue,
    shadowOffset: {width: 5, height: 10},
  },
  cardLeft: {
    justifyContent: 'space-between',
    shadowColor: 'grey',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  cardImage: {
    height: 150,
    width: 150,
    borderRadius: 20,
    shadowColor: Colors.slackRed,
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 10,
    shadowRadius: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  activateMatch: {
    width: 125,
    height: 25,
    borderRadius: 5,
    alignItems: 'center',
  },
  activateMatchText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    height: 280,
    width: 185,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  matchText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
  matchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
  },
  matchModal: {
    position: 'absolute',
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Layout.window.width,
    height: Layout.window.height,
  },
  icons: {
    color: Colors.slackGreen,
  },
})
