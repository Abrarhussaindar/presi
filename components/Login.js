// LoginScreen.js

import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuth } from '../auth/authSlice';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuth);
  const url = "http://192.168.203.105:8800/api";
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${url}/user/login`, {
        username,
        password,
      });
      // Assuming your backend returns user data upon successful authentication
      const userData = response.data;

      // Dispatch the login action with user data
      dispatch(login(userData));

      Alert.alert('Login successful');
    } catch (error) {
      console.error('Authentication failed:', error);
      Alert.alert('Invalid credentials. Try again.');
    }
  };
  const handleDoenstAcc = () => {
    navigation.navigate('Sign Up');
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: "#182F63" }]}>
      <View style={[{ padding: 20, gap: 20, backgroundColor: "white", borderRadius: 10, alignContent: "center", justifyContent: "center" }]}>
        <View>
          <Text style={{ textAlign: "center", fontWeight: 600, fontSize: 30, marginBottom: 10, }} >Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Roll Number"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ gap: 10 }}>
          <View style={{ borderRadius: 20, overflow: 'hidden' }}>
            <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "red", paddingVertical: 8 }}>
              <Text style={{ textAlign: "center", color: "white", fontSize: 18, fontWeight: 700 }}>Login</Text>
            </TouchableOpacity>

          </View>
          <Text style={{ textAlign: 'center', fontWeight: 700 }}>OR</Text>
          <Text style={{ textAlign: 'center', fontWeight: 700 }}>Doesn't have an Account</Text>
          <View style={{ borderRadius: 20, overflow: 'hidden' }}>
            <Button title="Sign Up" style={{ width: 100 }} onPress={handleDoenstAcc} />
          </View>
        </View>

      </View>

    </View>
  );
};

export default LoginScreen;

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
