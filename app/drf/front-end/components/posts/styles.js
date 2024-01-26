import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    scrollview:{
        flex:1,
    },
    image: {
      width: "100%",
      height: 250,
      resizeMode: "cover",
    },
    card: {
      marginTop: 10,
      padding: 10,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    divider: {
      marginVertical: 8,
    },
    description: {
      fontSize: 16,
      color: "#333",
      paddingVertical: 10,
    },
    distanceText: {
      fontSize: 14,
      color: "grey",
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
      },
      paginationDotActive: {
        backgroundColor: 'orange', 
      },
      paginationDotInactive: {
        backgroundColor: 'lightgrey',
      },
      buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20, 
      },
      goBackButton: {
       marginTop:20,
      },
      goBackButtonText: {
        color: '#8a8a8a', 
        fontSize: 18,
      },
    
  });


 export default styles;  