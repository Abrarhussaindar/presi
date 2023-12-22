import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";


const SingleEvent = ({ eventName, eventDesc, eventClubName, eventDate, eventVenue, navigation, eventId }) => {
  const EP = require("../assets/presi.png")
  const handleShowMore = (eventId) => {
    navigation.navigate('Single Event', { eventId });
  }
  return (
    <View style={[styles.tableRow, { marginBottom: 10 }]}>

      <View style={{ flexDirection: "row" }}>
        <View style={styles.column}>
          <Text style={[styles.tableHeader, { color: 'black', fontWeight: 500, textAlign: "center", padding: 10 }]}>{eventName}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.tableHeader, { color: 'black', fontWeight: 500, textAlign: "center", padding: 10 }]}>{eventDate}</Text>
        </View>
        <View style={styles.column}>
          <TouchableOpacity onPress={() => handleShowMore(eventId)} style={{ backgroundColor: "#182F63", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
            <Text style={{ color: "white", fontWeight: 700 }}>SHOW MORE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Image source={EP} style={{ width: "90%", height: 100 }} />
      </View>
    </View>
  )
}
export default SingleEvent;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 30,
    width: 300,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  postContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareIcon: {
    width: 20,
    height: 20,
    marginVertical: 10,
    marginRight: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  postFooter: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  caption: {
    fontSize: 16,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.35,
        shadowRadius: 15,
      },
      android: {
        elevation: 7,
      },
    }),
  },

  header: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: 4,
    textAlign: 'center',
    color: 'white',
  },
  tableRow: {
    flexDirection: "column",
    paddingVertical: 10,
    borderWidth: 1,
    // borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    color: 'white',
    borderColor: "white",
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    // fontWeight: 'bold',
    fontWeight: "bold",
    fontSize: 16,
  },


  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 70,
    marginBottom: 10,
    borderWidth: 1,
  },
  EditIcon: {
    width: 15,
    height: 15,
    bottom: 0,
    right: 0,
    // borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    // objectFit: "cover"
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  searchBarContainer: {
    width: '100%',
    marginTop: 20,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInputContainer: {
    borderRadius: 10,
    backgroundColor: "white",
  },
  searchBarInput: {
    backgroundColor: '#ffffff',
  },

});