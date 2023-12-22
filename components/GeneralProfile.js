import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";
import axios from 'axios';
import { useRoute } from "@react-navigation/native";

const url = "http://192.168.203.105:8800/api";
const GeneralProfile = ({ navigation }) => {
  const pp = require("../assets/steve.png")
  const blueTick = require("../assets/check.png")
  const dummyPic = require("../assets/profile.png")
  const editIcon = require("../assets/edit.png")
  const phone = require("../assets/telephone.png")
  const mail = require("../assets/email.png")
  const cabin = require("../assets/office.png")

  // Sample user data (replace this with actual user data)
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { userId } = route.params;
  const [userData, setUserData] = useState({
    profilePicture: pp,
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    section: '8CSE13',
    club: 'Rotract',
    cabin: 'SB-CB01',
    followers: [],
    followings: [],
  });
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${url}/user?id=${userId}`)
        setUserData(res.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getUserData();
  }, [userId]);
  // console.log(userData);
  const handleLogout = () => {
    navigation.navigate('Login');
  };
  const PF = "http://192.168.203.105:8800/images/"

  if (loading) {
    // Render loading indicator or placeholder while data is being fetched
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ backgroundColor: "#182F63", display: "flex", justifyContent: "flex-start", gap: 50, minHeight: 760, padding: 30 }}>
      <View style={{ flexDirection: "row", gap: 30, marginTop: 10 }}>
        <View style={{ position: "relative" }}>
          <Image source={userData.profilePicture ? { uri: PF + userData.profilePicture } : dummyPic} style={styles.profilePicture} />
          <Image source={editIcon} style={{ position: "absolute", bottom: 20, right: 0, width: 25, height: 25 }} />
        </View>
        <View style={{ gap: 15 }}>
          <View style={{ alignItems: "center", gap: 5 }}>
            <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>{userData.username}</Text>
              <Image source={blueTick} style={{ height: 20, width: 20 }} />
            </View>
            <Text style={{ color: "wheat", fontSize: 16 }}>{userData.clubName ? userData.clubName : "dummy club"}</Text>
          </View>
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 30 }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: 700 }}>{userData.followers.length ? userData.followers.length : "0"}</Text>
                <Text style={{ color: "white", fontWeight: 700 }}>Followers</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: 700 }}>{userData.followers.length ? userData.followers.length : "0"}</Text>
                <Text style={{ color: "white", fontWeight: 700 }}>Followings</Text>
              </View>
            </View>
            {/* <View>
              <TouchableOpacity style={{ backgroundColor: "white", paddingLeft: 20, paddingRight: 20, paddingVertical: 5, borderRadius: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 600, textAlign: "center", color: "black" }}>Review</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: "white", padding: 40, borderRadius: 20, gap: 20 }}>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <Image source={phone} style={{ width: 30, height: 30 }} />
          <Text style={{ color: "black", fontWeight: 600, fontSize: 16 }}>{userData.phoneNumber ? `+91 ${userData.phoneNumber}` : "0-00-000-000"}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <Image source={mail} style={{ width: 30, height: 30 }} />
          <Text style={{ color: "black", fontWeight: 600, fontSize: 16 }}>{userData.email ? userData.email : "dummy@demo.com"}</Text>
        </View>
        {
          userData.isAdmin
            ?
            <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
              <Image source={cabin} style={{ width: 35, height: 35 }} />
              <Text style={{ color: "black", fontWeight: 600, fontSize: 16 }}>{userData.cabin ? userData.cabin : "Contact Faculty"}</Text>
            </View>
            :
            ""
        }



      </View>
    </View>
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

export default GeneralProfile;