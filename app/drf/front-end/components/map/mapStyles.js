import { StyleSheet} from "react-native";

const styles = StyleSheet.create({

    map: {
        width: '100%',
        height: '100%',
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    backArrow: {
        position: 'absolute',
        height: 40,
        width: 40,
        left: 15,
        top: 15,
    },
    slider: {
        position: 'absolute',
        alignSelf: 'center',
        width: '80%',
        bottom: 35,
    },
    sliderText: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    }

});

export default styles;