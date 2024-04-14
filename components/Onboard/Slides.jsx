import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeightSpacer, ReusableBtn, ReusableText } from "../../components/index";
import { COLORS, SIZES } from "../../constants/theme";
import styles from "./slides.style";

const Slides = ({ item }) => {
  const navigation = useNavigation();
  const splash = ('../../assets/huh.png'); 
  
  return (
    <View style={styles.container}>
      {/* Render the background image */}
      <Image source={item.image} style={styles.image} />

      {/* Render the overlay image */}
      <View style={styles.overlayContainer}>
        <Image source={{ uri: splash }} style={styles.overlayImage} />
      </View>

      <View style={styles.stack}>
        <ReusableText
          text={item.title}
          family="medium"
          size={SIZES.xxLarge}
          color={COLORS.white}
        />

        <HeightSpacer height={40} />

        <ReusableBtn
          onPress={() => navigation.navigate("RegistraionScreen")} // typo in 'RegistraionScreen'
          btnText="Let's go"
          width={(SIZES.width - 50) / 2.2}
          backgroundColor={COLORS.red}
          borderColor={COLORS.red}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
    </View>
  );
};

export default Slides;
