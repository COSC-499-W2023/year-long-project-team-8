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
   rating = models.FloatField(default=0.0)
#    received_reviews = models.ManyToManyField('Review', related_name='receiver_reviews', blank=True)
#    given_reviews = models.ManyToManyField('Review', related_name='giver_reviews', blank=True)
   
   USERNAME_FIELD = "email"
   REQUIRED_FIELDS = []
   objects = CustomUserManager()
   
   def update_rating(self):
        # Calculate the average rating from all reviews associated with this user
        reviews = self.received_reviews.all()
        total_rating = sum(review.rating for review in reviews) if reviews else 0
        average_rating = total_rating / len(reviews) if reviews else 0

        # Update the user's rating
        self.rating = average_rating
        self.save()

class Review(models.Model):
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_reviews')
    giver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_reviews')
    content = models.TextField()
    rating = models.FloatField(default=0.0, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        # Save the review instance
        super().save(*args, **kwargs)

        # Update the associated user's rating
        self.receiver.update_rating()
