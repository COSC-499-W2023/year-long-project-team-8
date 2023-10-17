/*
    Sample JS client to test API. Alter as needed to access models, users, authorization etc.
    Pure JS - will need to be handled by front end team in ReactNative but this is for backend conceptualization
*/

const contentContainer = document.getElementById('content-container')
const loginForm = document.getElementById('login-form')
const baseEndpoint = "http://localhost:8000/api"
if (loginForm) {
    // handle this login form
    loginForm.addEventListener('submit', handleLogin)
}

function handleLogin(event) {
    console.log(event)
    event.preventDefault()
    const loginEndpoint = `${baseEndpoint}/token/` //jwt token endpoint
    let loginFormData = new FormData(loginForm)
    let loginObjectData = Object.fromEntries(loginFormData)
    let bodyStr = JSON.stringify(loginObjectData)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyStr
    }
    fetch(loginEndpoint, options) //  Promise
    .then(response=>{
        console.log(response)
        return response.json()
    })
    .then(authData => {
        handleAuthData(authData, getProductList) // use callback to get product list
    })
    .then(x => {
        console.log(x)
    })
    .catch(err=> {
        console.log('err', err)
    })
}

function handleAuthData(authData, callback) {
    localStorage.setItem('access', authData.access)
    localStorage.setItem('refresh', authData.refresh)
    if (callback) {
        callback()
    }
}

// retrieve product list - uses products endpoint
function getProductList(){
    const endpoint = `${baseEndpoint}/products/`
    const options = getFetchOptions()
    fetch(endpoint, options)
    .then(response=>{
        return response.json()
    })
    .then(data=> {
        const validData = isTokenNotValid(data)
        if (validData) {
            writeToContainer(data) // uses writeToContainer to display the product list
        }
        
    })
}

// function to generate html to display product list
function writeToContainer(data) {
    if (contentContainer) {
        contentContainer.innerHTML = "<pre>" + JSON.stringify(data, null, 4) + "</pre>"
    }
}

function getFetchOptions(method, body){
    return {
        method: method === null ? "GET" : method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access')}` //access token!
        },
        body: body ? body : null
    }
}
function isTokenNotValid(jsonData) {
    if (jsonData.code && jsonData.code === "token_not_valid"){
        // run a refresh token fetch
        alert("Please login again")
        return false
    }
    return true
}

// jwt token authorization

function validateJWTToken() {
    // fetch
    const endpoint = `${baseEndpoint}/token/verify/`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.getItem('access')
        })
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(x=> {
        // refresh token
    })
}
validateJWTToken()
// implement clearing out the data if user not logged in