from rest_framework.authentication import TokenAuthentication as BaseTokenAuth
from rest_framework.authtoken.models import Token

class TokenAuthentication(BaseTokenAuth):
    keyword = 'Token' # set to token to not interfere with 'Bearer' from jwt