import requests

# python file to test api 
# change /products/n/ to key to look up

endpoint = "http://localhost:8000/api/products/2/"  # http://127.0.0.1:8000/

get_response = requests.get(endpoint) 
print(get_response.json())
 
