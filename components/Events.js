import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";

import axios from 'axios';

import SingleEvent from "./singleEvent";
import { selectUser } from "../auth/authSlice";
import { useSelector } from "react-redux";

const EventsScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const EP = require("../assets/presi.png")
  const url = "http://192.168.203.105:8800/api";
  const [events, setEvents] = useState([])

  const handlePress = () => {
    navigation.navigate("Upload Event")
  }

  useEffect(() => {
    axios.get(`${url}/events`)
      .then(res => {
        setEvents(res.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  return (
    user
      ? (<View style={[styles.container, { width: "100%", backgroundColor: "#182F63", }]}>
        {
          user.isAdmin
            ?
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-end", backgroundColor: "white", marginTop: 10, paddingHorizontal: 10, paddingVertical: 10 }}>
              <TouchableOpacity onPress={handlePress} style={{ backgroundColor: "#182F63", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 }}>
                <Text style={{ color: "white", fontWeight: 700 }}>Upload Event</Text>
              </TouchableOpacity>

            </View >
            :
            ""
        }


        {/* <View style={[styles.tableRow, { width: "100%", marginTop: 10, flexDirection: "row", marginBottom: 20 }]}>
  <View style={styles.column}>
    <Text style={[styles.tableHeader, { color: 'black', fontWeight: 700, fontSize: 18 }]}>Event Name</Text>
  </View>
  <View style={styles.column}>
    <Text style={[styles.tableHeader, { color: 'black', fontWeight: 700, fontSize: 18 }]}>Date</Text>
  </View>
  <View style={styles.column}>
    <Text style={[styles.tableHeader, { color: 'black', fontWeight: 700, fontSize: 18 }]}>Action</Text>
  </View>
</View> */}
        < ScrollView vertical style={{ width: "100%", marginTop: 10 }}>

          <View style={{ display: "flex", color: "white", flexDirection: "column", gap: 10 }}>

            {
              events.map((event) => (
                <SingleEvent
                  eventName={event.name}
                  eventDesc={event.desc}
                  eventClubName={event.clubName}
                  eventDate={event.eventDate}
                  eventVenue={event.venue}
                  key={event._id}
                  eventId={event._id}
                  navigation={navigation}
                />
              ))
            }


          </View>

        </ScrollView >
      </View >)
      : (
        <View style={[styles.container, { width: "100%", backgroundColor: "#182F63", }]}>


          {/* <View style={[styles.tableRow, { width: "100%", marginTop: 10, flexDirection: "row", marginBottom: 20 }]}>
        <View style={styles.column}>
          <Text style={[styles.tableHeader, { color: 'black', fontWeight: 700, fontSize: 18 }]}>Event Name</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.tableHeader, { color: 'black', fontWeight: 700, fontSize: 18 }]}>Date</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.tableHeader, { color: 'black', fontWeight: 700, fontSize: 18 }]}>Action</Text>
        </View>
      </View> */}
          < ScrollView vertical style={{ width: "100%", marginTop: 10 }}>

            <View style={{ display: "flex", color: "white", flexDirection: "column", gap: 10 }}>

              {
                events.map((event) => (
                  <SingleEvent
                    eventName={event.name}
                    eventDesc={event.desc}
                    eventClubName={event.clubName}
                    eventDate={event.eventDate}
                    eventVenue={event.venue}
                    key={event._id}
                    eventId={event._id}
                    navigation={navigation}
                  />
                ))
              }


            </View>

          </ScrollView >
        </View >
      )

  );
};


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
    fontWeight: 'bold',
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

export default EventsScreen;