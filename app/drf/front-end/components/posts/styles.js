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
      fontSize: 28,
      fontWeight: "bold",
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
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
    paginationOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: "center",
      padding: 10,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:"center",
      padding: 10, 
      backgroundColor: 'rgba(255, 255, 255, 0.7)', 
      borderRadius:20,
    },
    paginationDot: {
      height: 10,
      width: 10,
      borderRadius: 5, 
      marginHorizontal: 5, 
    },
    paginationDotActive: {
      backgroundColor: 'orange', 
    },
    paginationDotInactive: {
      backgroundColor: 'gray', 
    },    
      buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        padding: 20, 
      },
  });


 export default styles;  