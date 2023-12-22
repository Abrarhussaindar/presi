import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button } from "react-native";

// import { Picker } from "@react-native-picker/picker";

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [authenticated, setAuthenticated] = useState(false);
  // const [selectedOption, setSelectedOption] = useState('');

  // const dropdownItems = [
  //   { label: 'Option 1', value: 'option1' },
  //   { label: 'Option 2', value: 'option2' },
  //   // Add more options as needed
  // ];

  const handleLogin = () => {
    // Basic login logic, replace with your actual authentication mechanism
    if (rollNumber === 'user' && password === 'password') {
      setAuthenticated(true);
    } else {
      alert('Invalid credentials. Try again.');
    }
  };

  const handleHaveAcc = () => {
    navigation.navigate('Login');
  }

  useEffect(() => {
    // If already authenticated, navigate to Home screen
    if (authenticated) {
      navigation.navigate('Login');
    }
  }, [authenticated, navigation]);
  // style={{ fontWeight: 600, fontSize: "24px", textAlign: 'center' }}
  return (
    <View style={[styles.container, { backgroundColor: "#182F63" }]}>
      <View style={[{ padding: 20, gap: 20, backgroundColor: "white", borderRadius: 10, alignContent: "center", justifyContent: "center" }]}>
        <View>
          <Text style={{ textAlign: "center", fontWeight: 600, fontSize: 30, marginBottom: 10, }} >Sign Up</Text>

          {/* <Picker
            selectedValue={selectedOption}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
          >
            <Picker.Item label="Select an option..." value="" />
            {dropdownItems.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker> */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Roll Number"
            onChangeText={(text) => setRollNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="University Email Id"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View style={{ gap: 10 }}>

          <View style={{ borderRadius: 20, overflow: 'hidden' }}>
            <Button title="Sign Up" style={{ width: 100 }} onPress={handleLogin} />
          </View>
          {/* <Text style={{ textAlign: 'center', fontWeight: 700 }}>OR</Text> */}
          <Text style={{ textAlign: 'center', fontWeight: 700 }}>Already have an account?</Text>
          <View style={{ borderRadius: 20, overflow: 'hidden' }}>
            <Button title="Login" style={{ width: 100 }} onPress={handleHaveAcc} />
          </View>
        </View>

      </View>

    </View>
  );
};


export default SignUpScreen;



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
