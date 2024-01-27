import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollview: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', 
  },
  image: {
    width: "95%", 
    height: 250,
    resizeMode: "cover",
    borderRadius: 15,
  },
  chatCard: {
    marginVertical: 10, 
    borderRadius: 15,
    elevation: 3,
    padding: 10,
    backgroundColor: "#fff",
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5, 
  },
  chatTitle: {
    fontSize: 15,
    color: "#5c5c5c",
  },
  chatIcon: {
    width: 28,
    height: 28,
    marginRight:5
  },
  messageBox: {
    flexDirection: "row",
    padding: 10, 
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageInput: {
    flex: 1,
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20, 
  },
  card: {
    marginHorizontal: 5, 
    marginTop: 10, 
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10, 
  },
  bestBefore: {
    fontSize: 14,
    marginBottom: 10, 
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10, 
    marginHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 17,
    marginBottom: 5, 
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
    width: 60, 
  },
  categoryIcon: {
    width: 48,
    height: 48,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 13,
    textAlign: 'center',
  },
  dividerContainer:{
    marginVertical:10,
  },
  divider: {
    height: 1,
    backgroundColor: 'grey',
  },
  descriptionContainer:{
    marginHorizontal:5,
  },
  descriptionTitle:{
    fontSize:17,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
  },
  viewMoreText: {
    color: "#9ba5f1",
    fontSize: 16,
    fontWeight: "bold",
  },  
  giverTitle:{
    fontSize:17,
  },
  giverContent:{
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginVertical:10,
  },
  profilePic:{
    width:50,
    height:50,
    borderRadius:50,
    marginRight:10,
  },
  ratingDisplay:{
    flexDirection:"row",
  },
  rating:{
    marginLeft: 10,
  },
  reviews:{
    marginLeft: 5,
    color:"#6676f2"
  },
  allergenText:{
    fontSize: 16,
    color: "#333",
    paddingVertical: 3,
  },
  allergenTitle:{
    fontSize:17,
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
    alignSelf: "center",
    padding: 10, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    borderRadius: 20,
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