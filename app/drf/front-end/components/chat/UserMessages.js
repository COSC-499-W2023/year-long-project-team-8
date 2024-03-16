import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  KeyboardAvoidingView,
  Animated,
  ActivityIndicator,
  Image,
  Platform,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../context/AuthContext";
import styles from "./styles";
import CustomText from "../CustomText";
import {
  getChatMessages,
  sendChatMessage,
  getUserData,
  getProductById,
} from "../helperFunctions/apiHelpers";
import ChatHeader from "./ChatHeader";

const UserMessages = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverDetails, setReceiverDetails] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const { authTokens, userId } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const chatId = route.params?.chatId;
  const receiver = route.params?.receiver;
  const product = route.params?.product;
  const sender = route.params?.sender;
  const navigation = useNavigation();
  const buttonScale = useRef(new Animated.Value(1)).current;
  const LINE_HEIGHT = 20;
  const MAX_LINES = 5;
  const MAX_HEIGHT = LINE_HEIGHT * MAX_LINES;

  const onGivenConfirm = () => {
    setModalVisible(true);
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.9,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        setIsLoading(true);
        const chatData = await getChatMessages(authTokens, chatId);
        setMessages(chatData.messages);
        console.log("Message objects fetched from getChatMessages");
        console.log("Sender:", chatData.sender);
        console.log("Receiver:", chatData.receiver);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchReceiverDetails = async () => {
      try {
        setIsLoading(true);
        const userDetailsId = sender !== userId ? sender : receiver;
        const userData = await getUserData(userDetailsId, authTokens);
        setReceiverDetails(userData);
      } catch (error) {
        console.error("Error fetching receiver details:", error);
      }
    };

    const fetchProductDetailsEnriched = async () => {
      try {
        setIsLoading(true);
        const productData = await getProductById(authTokens, product);
        if (productData) {
          // Fetch additional data for the product here (e.g., owner details)
          const ownerDetails = await getUserData(productData.owner, authTokens);
          // Combine the product with its additional data
          const enrichedProductDetails = { ...productData, ownerDetails };
          setProductDetails(enrichedProductDetails);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
      setIsLoading(false);
    };

    fetchChatMessages();
    fetchReceiverDetails();
    fetchProductDetailsEnriched();
  }, [authTokens, chatId, sender, receiver, product]);

  const isSender = (message) => message.sender === userId;
  const receiverInitial = receiverDetails.firstname
    ? receiverDetails.firstname.charAt(0).toUpperCase()
    : receiverDetails.email
      ? receiverDetails.email.charAt(0).toUpperCase()
      : "?";
  console.log("reciever details", receiverDetails);
  const renderMessageBubble = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 8,
        justifyContent: isSender(item) ? "flex-end" : "flex-start",
      }}
    >
      {!isSender(item) && (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#41ade8",
            marginRight: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {receiverDetails.profile_picture ? (
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
              source={{ uri: receiverDetails.profile_picture }}
            />
          ) : (
            <CustomText style={{ color: "white", fontSize: 18 }}>
              {receiverInitial}
            </CustomText>
          )}
        </View>
      )}
      <View
        style={{
          padding: 8,
          backgroundColor: isSender(item) ? "#FFA500" : "#ddd",
          borderRadius: 8,
          maxWidth: "80%",
        }}
      >
        <CustomText style={{ color: isSender(item) ? "white" : "black" }}>
          {item.message}
        </CustomText>
      </View>
    </View>
  );

  const sendMessage = async () => {
    try {
      let messageToSend = newMessage.trim(); // Trim whitespace from the message
      if (messageToSend === "") {
        // If the message is empty, set a default message
        messageToSend = "Hi! Can I get this plate?";
      }
      console.log("In rec details userId", userId);
      const userDetailsId = sender !== userId ? sender : receiver;
      console.log("In send message id", userDetailsId);
      const data = await sendChatMessage(
        userId,
        authTokens,
        messageToSend,
        userDetailsId,
        product
      );
      setMessages([...messages, data]);
      setNewMessage("");
      await onRefresh();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log("Rec details", receiverDetails);
  console.log("Receiver route params", receiver);
  console.log("Receiver.id", receiverDetails.id);
  console.log("Prod details chat", productDetails);
  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    try {
      const chatData = await getChatMessages(authTokens, chatId);
      setMessages(chatData.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setRefreshing(false); // Set refreshing state to false
    }
  };

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [isLoading, messages]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -300}
        >
          <ChatHeader
            receiverDetails={receiverDetails}
            productDetails={productDetails}
            receiver={receiver}
            product={product}
            navigation={navigation}
            isGiver={userId === productDetails.owner}
            onGivenConfirm={onGivenConfirm}
          />
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderMessageBubble}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 16,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ flex: 1 }}
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({ animated: true })
            }
          />
          <View style={styles.separator} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              value={newMessage}
              onChangeText={(text) => setNewMessage(text)}
              multiline={true}
              maxLength={2000}
            />

            {newMessage.trim() !== "" && ( // Only render the send button if the input field has a value
              <View style={styles.sendButtonContainer}>
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={1}
                  >
                    <CustomText style={styles.sendButtonText}>Send</CustomText>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CustomText style={styles.modalText}>
              Thanks for helping people!
            </CustomText>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.goBack();
                }}
              >
                <CustomText style={styles.textStyle}>
                  Go Back to Chats
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <CustomText style={styles.textStyle}>Stay Here</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserMessages;
