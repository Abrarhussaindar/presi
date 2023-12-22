import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from "react";
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import Post from "./components/Post";
import UploadScreen from "./components/UploadScreen";
import SignUpScreen from "./components/SignUp";
import ProfileScreen from "./components/Profile";
import SearchScreen from "./components/Search";
import EventsScreen from "./components/Events";
import SingleEventPage from "./components/singleEventsPage";
import UploadEvents from "./components/uploadEvent";
import AddReview from "./components/AddReview";
import GeneralProfile from "./components/GeneralProfile";
import { Provider } from 'react-redux';
import store from './auth/store';
import LoginScreen from "./components/Login";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const presi = require("./assets/presi.png")
const editIcon = require("./assets/edit.png")

const home = require("./assets/homeIcons/home.png")
const search = require("./assets/homeIcons/search.png")
const upload = require("./assets/homeIcons/upload.png")
const events = require("./assets/homeIcons/calendar.png")
const profile = require("./assets/homeIcons/user.png")


const url = "http://192.168.203.105:8800/api";

const WelcomeScreen = ({ navigation }) => {
  const [showWelcome, setShowWelcome] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      navigation.navigate('Login');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { justifyContent: "center", backgroundColor: "#182F63" }]}>
      {showWelcome && (
        <>
          <Text style={{ fontSize: 30, fontWeight: 600, textAlign: "center", color: "white" }}>Welcome to Presidency University</Text>
          <Image source={presi} style={{ width: "100%" }} />
        </>
      )}
    </View>
  );
};

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [authenticated, setAuthenticated] = useState(false);

//   const handleLogin = () => {
//     // Basic login logic, replace with your actual authentication mechanism
//     if (username === 'user' && password === 'password') {
//       setAuthenticated(true);
//     } else {
//       alert('Invalid credentials. Try again.');
//     }
//   };
//   const handleDoenstAcc = () => {
//     navigation.navigate('Sign Up');
//   }

//   useEffect(() => {
//     // If already authenticated, navigate to Home screen
//     if (authenticated) {
//       navigation.navigate('Home');
//     }
//   }, [authenticated, navigation]);
//   // style={{ fontWeight: 600, fontSize: "24px", textAlign: 'center' }}
//   return (
//     <View style={[styles.container, { backgroundColor: "#182F63" }]}>
//       <View style={[{ padding: 20, gap: 20, backgroundColor: "white", borderRadius: 10, alignContent: "center", justifyContent: "center" }]}>
//         <View>
//           <Text style={{ textAlign: "center", fontWeight: 600, fontSize: 30, marginBottom: 10, }} >Login</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Roll Number"
//             onChangeText={(text) => setUsername(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             onChangeText={(text) => setPassword(text)}
//           />
//         </View>
//         <View style={{ gap: 10 }}>
//           <View style={{ borderRadius: 20, overflow: 'hidden' }}>
//             <Button title="Login" style={{ width: 100 }} onPress={handleLogin} />
//           </View>
//           <Text style={{ textAlign: 'center', fontWeight: 700 }}>OR</Text>
//           <Text style={{ textAlign: 'center', fontWeight: 700 }}>Doesn't have an Account</Text>
//           <View style={{ borderRadius: 20, overflow: 'hidden' }}>
//             <Button title="Sign Up" style={{ width: 100 }} onPress={handleDoenstAcc} />
//           </View>
//         </View>

//       </View>

//     </View>
//   );
// };

const HomeScreen = () => {
  const [posts, setPosts] = useState([])


  useEffect(() => {
    axios.get(`${url}/posts`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  // axios.interceptors.response.use(
  //   response => response,
  //   error => {
  //     console.error("Axios Error:", error.message);
  //     return Promise.reject(error);
  //   }
  // );
  // const uri = require("../new_app/assets/presi.png")
  return (
    <View style={[{ backgroundColor: "#182F63", width: "100%", paddingTop: 20 }, Platform.OS === 'android' && styles.androidContainer]}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>

        {

          posts.map((post) => (
            <Post
              image={post.image}
              puserId={post.userId}
              text={post?.desc}
              likes={post.likes}
              key={post._id}
              postId={post._id}
            />
          ))
        }
      </ScrollView>

      {/* <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View>
            <Text>

              {item.username}
            </Text>
          </View>
        )}
        keyExtractor={item => item._id}
      /> */}

      {/* Add more posts as needed */}

    </View>
  );
};

const BottomTabNavigator = () => {
  const url = "http://192.168.203.105:8800/api";
  const pp = require("./assets/steve.png")
  const blueTick = require("./assets/check.png")
  const dummyPic = require("./assets/profile.png")
  const editIcon = require("./assets/edit.png")
  const phone = require("./assets/telephone.png")
  const mail = require("./assets/email.png")
  const cabin = require("./assets/office.png")
  const [loading, setLoading] = useState(true);
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
  // const userId = "65829da05aa1265ad7abe218"
  const userId = "65829c59e7c6b749bdbf1bec"
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
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#3498db',
        inactiveTintColor: '#bdc3c7',
      }}
    >
      <Tab.Screen

        name="Home Page"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image source={home} style={{ width: 25, height: 25 }} name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Image source={search} style={{ width: 25, height: 25 }} name="ios-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload Posts"
        component={UploadScreen}
        options={{
          tabBarLabel: 'Upload Posts',
          tabBarIcon: ({ color, size }) => (
            <Image source={upload} style={{ width: 25, height: 25 }} name="cloud-upload" color={color} size={size} />
          ),
        }}
      />


      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <Image source={events} style={{ width: 25, height: 25 }} name="ios-calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image source={profile} style={{ width: 25, height: 25 }} name="ios-person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" headerShown="false">
          <Stack.Screen name="Welcome" headerShown="false" component={WelcomeScreen} />
          <Stack.Screen name="Login" headerShown="false" component={LoginScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} headerShown="false" component={BottomTabNavigator} />
          <Stack.Screen name="Events" headerShown="false" component={EventsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Upload Posts" component={UploadScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Single Event" component={SingleEventPage} />
          <Stack.Screen name="Upload Event" component={UploadEvents} />
          <Stack.Screen name="Add Review" component={AddReview} />
          <Stack.Screen name="General Profile" component={GeneralProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
};

export default App;


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
