import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        zIndex: 1,
        padding:10,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: "white",
        zIndex: 1,
        paddingHorizontal:20,
        paddingBottom:20,  
    },
    headerText:{
        fontSize:25,
        textAlign:"center"
    },
    input: {
        marginHorizontal:3,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor:"#F5F0E5"
    },
    title:{
        marginLeft:3,
        marginBottom:10,
        marginTop:15,
        fontSize:18,
        fontWeight:"bold"
    },
    textArea: {
        marginHorizontal:3,
        height: 100,
        justifyContent: "flex-start",
        textAlignVertical: 'top', 
        padding: 10, 
        borderRadius: 10, 
        backgroundColor: "#F5F0E5", 
        marginBottom: 10, 
    },
    quickFiltersContainer: {
        flexDirection: "row",
        flexWrap: "wrap", 
        justifyContent: "flex-start", 
        alignItems: "center",
        marginHorizontal:3,
        paddingVertical:10,

    },
    datePicker:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingVertical:10,
        marginLeft:3,
        flex:1,
    },
    datePickerText:{
        fontSize:15,
        paddingVertical:10,
        paddingRight:10,
    },
    changeDateButtonContainer:{
        padding:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    bestBeforeDate:{
        marginRight:5,
        fontSize:15
    },
    imageSection:{
        flexDirection:"row",
        justifyContent:"space-between",
        flex:1,
    },
    addIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    imageContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        marginBottom: 10, 
        marginTop:10
    },
    postImage: {
        width: 150, 
        height: 150, 
        marginRight: 10,
        marginBottom: 15, 
        borderRadius: 10, 
    },
    submitButtonContainer:{
        borderRadius:10,
        alignItems:"center",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:10,
    },
    submitButton:{
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        paddingVertical:15,
        marginTop:10,
        backgroundColor:"#fab650",
    },
    submitText:{
        color:"white",
        textAlign:"center",
    },
    cancelButtonContainer:{
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:30,
    },
    cancelButton:{
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:15,
        width:"95%",
    },
    cancelText:{
        color:"#f73e47",
        textAlign:"center",

    },
    section:{
        marginBottom:10,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    },

    modalImage: {
        width: 300, 
        height: 300, 
        resizeMode: 'contain', 
        marginBottom: 20,
      },
      

    modalButtonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '80%', 
    },

    modalButton: {
        padding: 10, 
        width: 200, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    modalButtonText:{
        color:"white",
        fontSize:18,    
    },
    modalButtonTextDelete:{
        color:"#f73e47",
        fontSize:18
    },
    imageAndCloseButtonContainer: {
        position: 'relative', 
    },
    
    closeButton: {
        position: 'absolute', 
        top: 10, 
        right: 0, 
        padding: 10, 
        zIndex: 1, 
    },
    invalidInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
    loader:{
        marginTop:"50%"
    }
    });

export default styles;