
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Alert, Share, TouchableOpacity, Button, Animated, StyleSheet } from 'react-native';
import axios from "axios";
import { followUser, updateLikesInBackend } from "../fatchApi";
import { selectUser } from "../auth/authSlice";
import { useSelector } from "react-redux";

const presi = require("../assets/presi.png");
const black = require("../assets/diamond.png");
const colored = require("../assets/diamond-color.png");

const Post = ({ image, puserId, text, postId, caption, likes }) => {
  const user = useSelector(selectUser);
  const [following, setFollowing] = useState(user?.followings.includes(puserId))
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [liked, setLiked] = useState(likes.includes(user?._id));
  let DI;
  if (liked) DI = colored
  else DI = black
  const [diamond, setDiamond] = useState(DI);
  const [numLikes, setNumLikes] = useState(likes.length);
  const [username, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const PF = "http://192.168.203.105:8800/images/";
  useEffect(() => {
    const getUserName = async () => {
      const url = "http://192.168.203.105:8800/api";
      try {
        const response = await axios.get(`${url}/user?id=${puserId}`);
        const user = response.data;
        setUserName(user.username);
        setProfilePicture(user.profilePicture);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getUserName();
  }, [puserId]);



  const handleDiamondPress = () => {
    if (liked) {
      setDiamond(colored)
    } else {

      setDiamond((currentDiamond) =>
        currentDiamond === black ? colored : black
      );
    }
    setNumLikes((prev) => (diamond === colored ? prev - 1 : prev + 1));
    const pId = postId;

    const uId = user._id;
    updateLikesInBackend(pId, uId);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 900,
      useNativeDriver: false,
    }).start(() => {
      rotateValue.setValue(0);
    });


  };

  const handleFollow = () => {
    const URL = "http://192.168.203.105:8800/api"
    const loggedUser = user._id;
    const postUser = puserId;
    try {
      const res = axios.put(`${URL}/user/${postUser}/follow`, { loggedUser })
      setFollowing(true)
    } catch (error) {
      console.log(error);
    }
  }
  const handleUnFollow = () => {
    const URL = "http://192.168.203.105:8800/api"
    const loggedUser = user._id;
    const postUser = puserId;
    try {
      const res = axios.put(`${URL}/user/${postUser}/unfollow`, { loggedUser })
      setFollowing(false)
    } catch (error) {
      console.log(error);
    }
  }
  const rotateY = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  if (loading) {
    // Render loading indicator or placeholder while data is being fetched
    return <Text>Loading...</Text>;
  }

  return (
    user
      ? (
        <View style={[styles.postContainer, { backgroundColor: "white" }]}>
          <View style={[styles.postHeader, { justifyContent: "space-between" }]}>
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
              <Image source={{ uri: PF + profilePicture }} style={styles.userProfileImage} />
              <Text style={styles.username}>{username}</Text>
            </View>
            <View>
              {
                following
                  ?
                  <TouchableOpacity onPress={handleUnFollow} style={{ backgroundColor: "#182F63", paddingHorizontal: 25, paddingVertical: 7, borderRadius: 20 }}>
                    <Text style={{ color: "white" }}>UNFOLLOW</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={handleFollow} style={{ backgroundColor: "#182F63", paddingHorizontal: 25, paddingVertical: 7, borderRadius: 20 }}>
                    <Text style={{ color: "white" }}>FOLLOW</Text>
                  </TouchableOpacity>
              }



            </View>
          </View>
          {image && <Image source={{ uri: PF + image }} style={styles.postImage} />}
          {text && <Text style={styles.postText}>{text}</Text>}
          <View style={styles.postFooter}>
            <Text style={styles.caption}>{caption}</Text>
            <View style={styles.postActions}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <TouchableOpacity onPress={handleDiamondPress}>
                  {/* {
                    liked
                      ?

                      < Animated.Image
                        source={colored}
                        style={{
                          width: 25,
                          height: 25,
                          transform: [{ rotateY }],
                        }}
                      />
                      :
                      <Animated.Image
                        source={black}
                        style={{
                          width: 25,
                          height: 25,
                          transform: [{ rotateY }],
                        }}
                      />
                  } */}
                  <Animated.Image
                    source={diamond}
                    style={{
                      width: 25,
                      height: 25,
                      transform: [{ rotateY }],
                    }}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                  <Text style={{ color: "black", fontSize: 16, fontWeight: 700 }}>{numLikes ? `${numLikes}` : "0"}</Text>
                  <Text style={{ color: "black" }}>Likes</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onShare}>
                <Image source={require("../assets/share.png")} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    // borderRadius: 10,
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
    fontSize: 18,
    fontWeight: '700',
    color: "black",
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
    color: "black"
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

export default Post;
