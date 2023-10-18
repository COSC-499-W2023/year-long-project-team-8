import requests

# python file to test api 

# this post request will save the hard coded data into the data base.
# look at api/views.py to see the views that get called 
# if we use a 'get' here, we need a "GET" view in api/views
# if we use a 'post', which is typically used to send data, we need a "POST" in api/views
# go to api/views to see the view and change the type.
# Notice that with a "POST", we are not allowed to post data with our current permissions. This is good!
# If you want to toggle this ability - go to app/settings and find:
# DEFAULT_PERMISSION_CLASSES": [
#        "rest_framework.permissions.IsAuthenticatedOrReadOnly",]
# comment this out, removing the permission, and you will be able to send post data.
# run list.py to see the product list.

endpoint = "http://localhost:8000/api/"  # http://127.0.0.1:8000/

get_response = requests.get(
    endpoint, json={"title": "test post", "content": "Hello", "location": "commons couch"}
)

# get_response = requests.post(
#     endpoint, json={"title": "test post", "content": "Hello", "location": "commons couch"}
# )

print(get_response.json())
# print(get_response.status_code)
