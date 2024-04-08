import requests
from getpass import getpass

# this file tests the built in authorization
# run the server, then run this script, to test
# admin/admin
# note this is for token authenticaion, not JWT - configure "DEFAULT_AUTHENTICATION_CLASSES" to token

auth_endpoint = "http://localhost:8000/api/auth/" 
username = input("What is your email?\n")
password = getpass("What is your password?\n")

auth_response = requests.post(auth_endpoint, json={'username': username, 'password': password}) 
print(auth_response.json())

if auth_response.status_code == 200:
    token = auth_response.json()['token']
    headers = {
        "Authorization": f"Token {token}"
    }
    endpoint = "http://localhost:8000/api/products/" # will display product list when authorization is granted

    get_response = requests.get(endpoint, headers=headers) 
    print(get_response.json())
    

# endpoint = "http://localhost:8000/api/products/"  # http://127.0.0.1:8000/

# get_response = requests.get(endpoint) 
# print(get_response.json())
 
    