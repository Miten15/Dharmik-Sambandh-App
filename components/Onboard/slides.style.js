import { StyleSheet } from "react-native";
import {SIZES} from "../../constants/theme"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative', // Ensure positioning context for absolute positioning
    },
    image: {
      resizeMode: "cover",
      width: SIZES.width,
      height: "100%",
    },
    overlayContainer: {
      ...StyleSheet.absoluteFillObject, // Take up the entire parent container
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayImage: {
        width: 100, // Increase the width and height to make sure it's visible
        height: 100,
        position: 'absolute',
        top: '50%', // Position the image in the center
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }], // Center the image
      },
    stack: {
      position: "absolute",
      bottom: 0,
      marginBottom: 60,
      marginHorizontal: 20,
    },
  });
  
  export default styles;
  