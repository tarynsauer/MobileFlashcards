import React from 'react'
import { Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { withNavigation } from 'react-navigation'

const styles = StyleSheet.create({
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  title: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  count: {
    color: 'red'
  }
})

class DeckDetails extends React.Component {
  render() {
    const { questions, navigation, title } = this.props

    return (<TouchableHighlight style={styles.flatview} onPress={() => navigation.navigate('Deck', {title: title})}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>Cards: {questions.length}</Text>
      </View>
    </TouchableHighlight>
    )
  }
}

export default withNavigation(DeckDetails)
