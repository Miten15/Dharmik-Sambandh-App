import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string().email("Provide a valid email").required("Required"),
});

const Signin = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [obscureText, setObscureText] = useState(true); 

  const errorLogin = () => {
    Alert.alert("Invalid Form", "Please provide all required fields");
  };

  const login = async (values) => {
    setLoader(true);

    try {
      const endpoint = "http://192.168.0.151:5003/api/login";
      const data = values;

      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data);
        await AsyncStorage.setItem("id", JSON.stringify(responseData.id));
        await AsyncStorage.setItem("token", JSON.stringify(responseData.token));

        navigation.replace("Bottom");
      } else {
        Alert.alert("Error Logging in ", "Please provide valid credentials ", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => navigation.navigate("Bottom")
          },
          { defaultIndex: 1 },
        ]);
      }
    } catch (error) {
      Alert.alert(
        "Error ",
        "Oops, Error logging in try again with correct credentials",
        [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => navigation.navigate("Bottom")
          },
          { defaultIndex: 1 },
        ]
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => login(values)}
      >
        {({
          handleChange,
          touched,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldTouched,
        }) => (
          <View style={{ paddingTop: 30 }}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="email-outline" size={20} color="gray" />
              <TextInput
                placeholder="Enter email"
                onFocus={() => setFieldTouched("email")}
                onBlur={() => setFieldTouched("email", "")}
                value={values.email}
                onChangeText={handleChange("email")}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>
            {touched.email && errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}

            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="gray" />
              <TextInput
                secureTextEntry={obscureText}
                placeholder="Enter password"
                onFocus={() => setFieldTouched("password")}
                onBlur={() => setFieldTouched("password", "")}
                value={values.password}
                onChangeText={handleChange("password")}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setObscureText(!obscureText)}>
                <MaterialCommunityIcons name={obscureText ? "eye-outline" : "eye-off-outline"} size={18} />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={isValid ? handleSubmit : errorLogin} disabled={!isValid}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Registration")}>
              <Text style={styles.registerButtonText}>Haven't Registered? Sign up here</Text>
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
    padding: 20,
    backgroundColor: "#fff",
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
  errorMessage: {
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
  registerButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#3461A8',
    fontSize: 16,
  },
});

export default Signin;
