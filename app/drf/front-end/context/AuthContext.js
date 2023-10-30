import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { jwtDecode } from 'jwt-decode'; // Update the import

const baseEndpoint = "http://localhost:8000/api";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [authTokens, setAuthTokens] = useState(null);
    const [access, setAccessToken] =useState(null);
    const [refresh, setRefreshToken] =useState(null);
    const [loading, setLoading] = useState(false);
    
    const loadAuthData = async () => {
      try {
        const authTokensData = await AsyncStorage.getItem('authTokens');
        if (authTokensData) {
          const authTokensJSON = await JSON.parse(authTokensData);
          const tokenString = JSON.stringify(authTokensData);
          console.log('Token to be saved:', authTokensJSON);
          console.log('Token string:', tokenString);
          setAuthTokens(authTokensJSON);
          //setAuthTokens(tokenString);
          // need to refine decoding to properly set user
          const decodedToken = jwtDecode(tokenString);
          console.log("decoded token: ", decodedToken);
          const userId = decodedToken.user_id;
          const userEmail = decodedToken.email;
          console.log('User ID:', userId);
          console.log('User email:', userEmail);
          setUserId(userId);
        } else {
          setAuthTokens(null);
          setUser(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading auth data:', error);
      }
    };
    
    useEffect(() => {
      loadAuthData();
    }, []);

    //const history = useHistory()

    let loginUser = async (email, password)=> {
        let response = await fetch(`${baseEndpoint}/token/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':email, 'password':password})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access).user_id)
            AsyncStorage.setItem('authTokens', JSON.stringify(data))
            AsyncStorage.setItem('access', JSON.stringify(data.access))
            AsyncStorage.setItem('refresh', JSON.stringify(data.access))
            //navigation.navigate('Tabs');  // for some reason this navigation didn't work so na
            // history.push('/')
        }else{
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        AsyncStorage.removeItem('authTokens')
        AsyncStorage.removeItem('access')
        AsyncStorage.removeItem('refresh')
        navigation.navigate('Landing');
        // history.push('/login')
    }


    let updateToken = async ()=> {
      console.log('Request Payload:', JSON.stringify({'refresh':authTokens?.refresh}));
        let response = await fetch(`${baseEndpoint}/token/refresh/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        console.log(response);

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            AsyncStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }


    useEffect(()=> {

        if(loading){
           //updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                //updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
export default AuthContext;

