import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'

const styles = StyleSheet.create({
  flatview: {
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    width: 250,
  },
  title: {
    fontSize: 18
  },
  count: {
    color: 'teal',
    fontWeight: 'bold',
  }
})

const DeckDetails = ({questions, navigation, title}) => (
  <TouchableOpacity style={styles.flatview} onPress={()=> navigation.navigate('Deck', {title: title})}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>Cards: {questions.length}</Text>
    </View>
  </TouchableOpacity>
)

export default withNavigation(DeckDetails)
