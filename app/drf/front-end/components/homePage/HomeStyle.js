import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  searchRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  luckyIconContainer: {
    marginLeft: 10,
    padding:10
  },
  categoryScroll: {
    flexDirection: "row",
    marginVertical: 5,
    alignContent:"center"
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  categorySelected: {
    backgroundColor: "rgba(252,166,60,0.2) ",
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  iconImageClear: {
    width: 35,
    height: 35,
    marginTop:10,
  },
  categoryText: {
    fontWeight: "600",
    color: "black",
    fontSize: 12,
  },
  categoryTextSelected: {
    fontWeight: "600",
    color: "rgba(252,166,60,0.8)",
    fontSize: 12,
  },
  filterAllContainer: {
    marginHorizontal: 10,
    marginTop:10
  },
  filterContainer: {
    flexDirection: "row",
    padding: 10,
  },
  mainFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,   
  },
  filter: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 31,
    borderRadius: 10,
  },
  filterIcon: {
    width:25,
    height:25,
  },
  luckyIcon: {
    width:35,
    height:35,
  },
  luckyText:{
    fontSize:20,
    marginLeft:10,
    alignSelf:"center"

  },
  quickFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10, 
  },
  listingsContainer: {
    padding:10
  },
  noMatchesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    color: "grey",
  },
  loader:{
    marginTop: 20,
  }
});

export default styles;
