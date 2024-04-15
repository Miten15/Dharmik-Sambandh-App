import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),

  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Required"),
  email: Yup.string().email("Provide a valid email").required("Required"),
});

const Registration = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obscureText, setObscureText] = useState(true); // Changed from "obsecureText" to "obscureText"

  const errorLogin = () => {
    Alert.alert("Invalid Form", "Please provide all required fields");
  };

  const register = async (values) => {
    setLoader(true);

    try {
      // Simulating registration API call
      console.log("Registering:", values);
      setLoader(false);
      Alert.alert("Registration Successful", "Please login to your account");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to register, please try again");
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => register(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
          <View>
              
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="face-man-profile" size={20} color="gray" />
              <TextInput
                placeholder="Username"
                onChangeText={handleChange("username")}
                onBlur={() => setFieldTouched("username")}
                value={values.username}
                style={styles.input}
              />
            </View>
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="email-outline" size={20} color="gray" />
              <TextInput
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                value={values.email}
                style={styles.input}
              />
            </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="gray" />
              <TextInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                value={values.password}
                style={styles.input}
                secureTextEntry={obscureText}
              />
              <TouchableOpacity onPress={() => setObscureText(!obscureText)}>
                <MaterialCommunityIcons name={obscureText ? "eye-outline" : "eye-off-outline"} size={18} />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity
              style={styles.button}
              onPress={isValid ? handleSubmit : errorLogin}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SigninScreen")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  error: {
    color: 'red',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#3461A8',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Registration;
