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
        backgroundColor: 'rgba(0, 0, 0, 0.89)',
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center'  
      },
      modalImage: {
        width: 500, 
        height: 240,
      },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    modalOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    modalOptionText: {
        color: '#fff',
        fontSize: 18,
        padding: 10,
    },
    modalOptionTextDelete:{
        color: '#d9363e',
        fontSize: 18,
        padding: 10,
    },
});

export default styles;