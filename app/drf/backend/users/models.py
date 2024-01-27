from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.core.validators import validate_email
from django.core.validators import MinValueValidator, MaxValueValidator

 
class CustomUserManager(UserManager):
 
    def _get_email(self, email: str):
        validate_email(email)
        return self.normalize_email(email)
 
    def _create_user(
        self, 
        email: str, 
        password: str,
        commit: bool,
        is_staff: bool = False, 
        is_superuser: bool = False
    ):
         
        email = self._get_email(email)
         
        user = User(email=email, username=email, is_staff=is_staff, is_superuser=is_superuser)
        user.set_password(password)
         
        if commit:
            user.save()
             
        return user
 
    def create_superuser(self, email: str, password: str, commit: bool = True):
        return self._create_user(email, password, is_staff=True, is_superuser=True, commit=commit)
 
    def create_user(self, email: str, password: str, commit: bool = True):
        return self._create_user(email, password, commit=commit)
   
class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    firstname = models.CharField(max_length=30, blank=True, null=True)
    lastname = models.CharField(max_length=30, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    reset_code = models.CharField(max_length=6, blank=True, null=True)
    rating = models.FloatField(default=0.0, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    content = models.TextField()
    rating = models.FloatField(default=0.0, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    timestamp = models.DateTimeField(auto_now_add=True)
