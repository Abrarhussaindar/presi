const { useEffect } = require('react');
import React from 'react';
const { useState } = require('react');
import { Text, View, StyleSheet, Image, FlatList, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native';

import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import { selectUser } from '../auth/authSlice';
import { useSelector } from 'react-redux';

const SearchScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const url = 'http://192.168.203.105:8800/api';
  const [searchEle, setSearchEle] = useState('');
  const searchIcon = require('../assets/search.png')
  const [NoRes, setNoRes] = useState(true);
  const pp = require('../assets/steve.png')
  const blueTick = require('../assets/check.png')
  const [results, setResults] = useState([]);
  console.log("res; ", results[0]);
  const [following, setFollowing] = useState(user?.followings?.includes(results[0]?._id))
  console.log("fol: ", following);
  const handleShowProfile = (userId) => {
    navigation.navigate('General Profile', { userId });
  }
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${url}/user/search?username=${searchEle}`);
      setResults(response.data);

    } catch (error) {
      console.error(error);

    }
  };
  const handleFollow = () => {
    const URL = "http://192.168.203.105:8800/api"
    const loggedUser = user._id;
    const resUser = results[0]?._id;
    try {
      const res = axios.put(`${URL}/user/${resUser}/follow`, { loggedUser })
      setFollowing(true)
    } catch (error) {
      console.log(error);
    }
  }
  const handleUnFollow = () => {
    const URL = "http://192.168.203.105:8800/api"
    const loggedUser = user._id;
    const resUser = results[0]?._id;
    try {
      const res = axios.put(`${URL}/user/${resUser}/unfollow`, { loggedUser })
      setFollowing(false)
    } catch (error) {
      console.log(error);
    }
  }
  const PF = 'http://192.168.203.105:8800/images/'
  return (
    user
      ? (
        <View style={[styles.container, { backgroundColor: '#182F63', justifyContent: 'flex-start' }]}>

          <View style={{ width: '100%' }}>
            <SearchBar
              placeholder="Type Here..."
              value={searchEle}
              onChangeText={(text) => setSearchEle(text)}
              searchIcon={searchIcon}
              containerStyle={styles.searchBarContainer}
              inputContainerStyle={styles.searchBarInputContainer}
              inputStyle={styles.searchBarInput}
            />
            <View style={{ padding: 10 }}>

              <TouchableOpacity onPress={handleSearch} style={{ backgroundColor: 'white', paddingVertical: 8, borderRadius: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 700, color: 'black', textAlign: 'center' }}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={{ width: '100%' }}
            data={results}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => <View style={{ justifyContent: 'center', alignItems: 'center', minHeight: 500 }}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 700 }}>User Not Found</Text>
            </View>}
            renderItem={({ item }) => (
              <View style={{ width: '100%', marginTop: 20 }}>
                <View style={{ backgroundColor: 'white', alignItems: 'center', flexDirection: 'row', paddingVertical: 30, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                    <View>
                      <TouchableOpacity onPress={() => handleShowProfile(item._id)} >

                        <Image source={item.profilePicture ? { uri: PF + item.profilePicture } : pp} style={{ width: 60, height: 60, borderRadius: 50 }} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', gap: 5 }}>
                      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handleShowProfile(item._id)}>

                          <Text style={{ color: 'black', fontSize: 18, fontWeight: 700 }}>{item.username ? item.username : 'dummy'}</Text>
                        </TouchableOpacity>
                        {
                          item.isAdmin
                            ?
                            <Image source={blueTick} style={{ width: 15, height: 15 }} />
                            :
                            ""
                        }
                      </View>
                      <View>
                        <Text style={{ color: 'black', fontSize: 12 }}>Dept. of {item.department ? item.department : '-'} - {item.position ? item.position : '-'}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 50 }}>
                        <View style={{ flexDirection: 'row', position: 'relative' }}>
                          <Image source={pp} style={{ position: 'absolute', width: 20, height: 20, borderRadius: 50 }} />
                          <Image source={pp} style={{ position: 'absolute', marginLeft: 15, width: 20, height: 20, borderRadius: 50 }} />
                        </View>
                        <View>
                          <Text style={{ color: 'black', fontWeight: 700 }}>{item.followers.length ? item.followers.length : '0'} Followers</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {
                    user._id === item._id
                      ?
                      ""
                      :
                      following
                        ?
                        <View>
                          <TouchableOpacity onPress={handleUnFollow} style={{ backgroundColor: '#182F63', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 }}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 700, letterSpacing: 1.5 }}>UNFOLLOW</Text>
                          </TouchableOpacity>
                        </View>
                        :
                        <View>
                          <TouchableOpacity onPress={handleFollow} style={{ backgroundColor: '#182F63', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 }}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 700, letterSpacing: 1.5 }}>FOLLOW</Text>
                          </TouchableOpacity>
                        </View>
                  }

                </View>
              </View>
            )
            }
          />




        </View >
      )
      : (
        ""
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
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,

    color: 'white',
    borderColor: 'white',
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
    backgroundColor: 'white',
  },
  searchBarInput: {
    backgroundColor: '#ffffff',
  },

});

export default SearchScreen;