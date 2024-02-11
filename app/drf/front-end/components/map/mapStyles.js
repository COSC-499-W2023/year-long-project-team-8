import { StyleSheet} from "react-native";

const styles = StyleSheet.create({

    backButton: {
        position: "absolute",
        height: 40,
        width: 40,
        alignSelf: "flex-start",
    },
    backButtonImage: {
        height: 40,
        width: 40,
        top: 50,
        left: 20,
    },
    sliderContainer: {
        alignContent: "center",
        justifyContent: "flex-end",
        height: '100%',
    },
    slider: {
        width: '80%',
        alignSelf: "center",
        bottom: 40,

    },
    sliderText: {
        alignSelf: "center",
        bottom: 40,
    }

});

export default styles;