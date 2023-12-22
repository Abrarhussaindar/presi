import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View, TextInput, StyleSheet } from 'react-native';


const AddReview = ({ navigation }) => {
  const url = "http://192.168.203.105:8800/api";
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventVenue, setEventVenue] = useState("")
  const [eventDesc, setEventDesc] = useState("")
  const [isUploaded, setIsUploaded] = useState(false)
  const route = useRoute();
  const { eventId } = route.params;
  console.log(eventId);
  const handleUploadPost = async () => {
    try {
      const res = await axios.post(`${url}/events/create`, {
        "name": eventName,
        "desc": eventDesc,
        "venue": eventVenue,
        "eventDate": eventDate,
        "clubName": "Rotract"
      })
      if (res.status === 201) setIsUploaded(true)
    } catch (error) {
      console.log(error);
    }
  }


  const redirect = () => {
    navigation.navigate("Events")
  }
  if (isUploaded) redirect();

  return (
    <View style={{ backgroundColor: "#182F63", gap: 20, minHeight: 760, justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "white", padding: 30, borderRadius: 10 }}>
        <TextInput
          placeholder="Enter Event Name..."
          onChangeText={(text) => setEventName(text)}
          value={eventName}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Event Description..."
          onChangeText={(text) => setEventDesc(text)}
          value={eventDesc}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Event Date..."
          onChangeText={(text) => setEventDate(text)}
          value={eventDate}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Event Venue..."
          onChangeText={(text) => setEventVenue(text)}
          value={eventVenue}
          style={styles.input}
        />

        {/* dropdown for club name */}
        {/* upload image for event poster */}
      </View>

      <View>
        <TouchableOpacity onPress={handleUploadPost} style={{ backgroundColor: "white", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 700, color: "black" }}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddReview;

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
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,

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
    width: 100,
    height: 100,
    borderRadius: 50,
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