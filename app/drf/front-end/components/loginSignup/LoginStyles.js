import { StyleSheet, Platform } from "react-native";

const LoginStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  allContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerContainer: {
    padding: 30,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "700",
    color: "#1f1f1f",
  },
  subHeaderText: {
    fontSize: 20,
    color: "grey",
    marginTop: 10,
  },
  fields: {
    paddingHorizontal: 30,
  },
  loginBut: {},
  forgotLoginContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgotPasswordContainer: {
    alignItems: "flex-start",
    marginTop: 0,
    marginLeft: 15,
  },
  forgotPasswordText: {
    color: "#3b3a3a",
    fontWeight: "bold",
    fontSize: 15,
    opacity: 0.7,
  },
  arrow: {
    marginLeft: 10,
  },
  signupContainer: {
    alignSelf: "center",
    marginTop: 60,
  },
  signupText: {
    color: "#3F525C",
    fontWeight: "bold",
    fontSize: 16,
  },
  signup: {
    color: "#DB6D2A",
    fontSize: 17,
    fontWeight: "bold",
    
  },
  modalContainer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width:"85%",
    borderRadius: 10,
    backgroundColor:"transparent"

  },
  floatingBubble: {
    backgroundColor: "transparent",
    padding: 20,
    elevation: 5,
    alignSelf: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  
  forgotPasswordModalHeader: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color:"#3b3b3b",
  },
  forgotPasswordModalsubHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color:"grey",
  },
  forgotPasswordModalInput: {
    width: "100%",
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    color: "#1f1f1f",
  },
  containerInputModal:{
    marginTop:20,
  },
  forgotPasswordModalButton: {
    position: "absolute",
    right: 10, 
    bottom: 10, 
  },
  forgotPasswordModalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordModalCloseButton: {
    position: "absolute",
    right: 10, 
    top: 10, 
    backgroundColor: "#F8B951",
    padding: 8, 
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  forgotPasswordModalCloseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordModalError:{
    color:"red",
    marginLeft:10,
    marginTop:10,
  },
  backButton:{
    fontWeight:"bold",
    textDecorationLine: "none",
    fontSize: 20,
    color: "#525252",
    opacity: 0.7,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC', 
    opacity: 0.6, 
},

countContainer: {
  justifyContent: "flex-start",
  marginTop:10,
  marginLeft:10,
},
countdownText: {
  color: 'grey', 
  fontSize: 14, 
},

});

export default LoginStyles;
