import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { selectUser } from '../auth/authSlice';
import { useSelector } from 'react-redux';

const SingleEventPage = ({ navigation }) => {
  const EP = require("../assets/presi.png")
  const url = "http://192.168.203.105:8800/api";
  const [singleEvent, setSingleEvent] = useState([])
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const user = useSelector(selectUser);
  const { eventId } = route.params;
  useEffect(() => {
    axios.get(`${url}/events/${eventId}`)
      .then(res => {
        setSingleEvent(res.data)
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
  }, [eventId]);
  const handleReview = (eventId) => {
    navigation.navigate("Add Review", { eventId })
  }
  if (loading) {
    // Render loading indicator or placeholder while data is being fetched
    return <Text>Loading...</Text>;
  }
  return (
    user
      ? (<View style={{ backgroundColor: "white", minHeight: 760 }}>
        {
          user.isAdmin
            ?
            <View style={{ padding: 20 }}>
              <TouchableOpacity onPress={() => handleReview(eventId)} style={{ backgroundColor: "#182F63", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                <Text style={{ color: "white", fontWeight: 700, textAlign: "center" }}>ADD REVIEW</Text>
              </TouchableOpacity>
            </View>
            : ""
        }
        <View style={{ gap: 20, padding: 20 }}>
          <Image source={EP} style={{ width: "100%", height: 200, borderRadius: 10 }} />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: 16 }}>Event Name: </Text>
              <Text style={{ color: "black", fontSize: 18, fontWeight: 600 }}>{singleEvent.name}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Club Name: </Text>
              <Text style={{ color: "black", fontSize: 18, fontWeight: 600 }}>{singleEvent.clubName}</Text>

            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: 16 }}>Event Date: </Text>
              <Text style={{ color: "black", fontSize: 18, fontWeight: 600 }}>{singleEvent.eventDate}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Event Venue: </Text>
              <Text style={{ color: "black", fontSize: 18, fontWeight: 600 }}>{singleEvent.venue}</Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>More Info. about this event: </Text>
            <Text style={{ color: "black", fontSize: 18, fontWeight: 600 }}>{singleEvent.desc}</Text>
          </View>
        </View>

      </View >)
      : ("")

  )
}
export default SingleEventPage;


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