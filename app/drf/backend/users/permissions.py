from rest_framework import permissions
from rest_framework.generics import GenericAPIView
from rest_framework.request import Request
from rest_framework.permissions import BasePermission
 
from django.db import models
 
class UserPermission(permissions.BasePermission):
    """
    source: https://stackoverflow.com/questions/19313314/django-rest-framework-viewset-per-action-permissions
    """
 
    def has_permission(self, request: Request, view: GenericAPIView) -> bool:
         
        if view.action == "create":
            return True # anyone can create user, no additional checks needed.
        if view.action == "list":
            return request.user.is_authenticated
        elif view.action in ["retrieve", "update", "partial_update", "destroy", "details", "delete"]:
            return True  # defer to has_object_permission
        else:
            return False
 
    def has_object_permission(
        self, request: Request, view: GenericAPIView, obj: models.Model
    ) -> bool:
 
        if not request.user.is_authenticated:
            return False
 
        # if view.action in ["retrieve", "update", "partial_update"]:
        if view.action in ["retrieve", "list", "details"]:
            return True  # Allow users to retrieve other users' data
        elif view.action in ["update", "partial_update", "destroy", "delete"]:
            return obj == request.user or request.user.is_staff  # Users can update their own data
        # elif view.action in ["destroy"]:
        #     return False  # Users cannot delete other users' data
        else:
            return obj == request.user or request.user.is_staff

        
class IsSelfOrReadOnly(BasePermission):
    """
    Custom permission to only allow users to edit their own details.
    """

    def has_object_permission(self, request, view, obj):
        # Allow GET, HEAD, and OPTIONS requests.
        if request.method in ["GET", "HEAD", "OPTIONS", "PATCH", "DELETE"]:
            return True

        # Check if the user making the request is the same as the user being updated.
        return obj == request.user or request.user.is_staff
    
# Permissions for only allowing model owner to edit the model
class IsOwnerOrReadOnly(permissions.BasePermission):
     def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user or request.user.is_staff
      