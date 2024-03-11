import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#FFA500',
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 16,
      alignItems: 'center',
      flexDirection: 'row', // Added flexDirection
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 8,
      flex: 1, // Added flex to allow the text to take remaining space
    },
    receiverText: {
      fontSize: 16,
      color: 'white',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    input: {
      flex: 1,
      marginRight: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderRadius: 8,
    },
    sendButton: {
      backgroundColor: '#FFA500',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    sendButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    backButton: {
      color: 'white',
      padding: 10,
      marginRight: 10,
    },
    backText:{
        color: 'white',
    },
    backIcon: {
      width: 24,
      height: 24,
      tintColor: 'white',
    },
  });

  export default styles;