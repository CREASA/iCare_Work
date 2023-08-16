from django.db import models

class user(models.Model):
    username=models.CharField(max_length=25, unique=True, error_messages ={
        "unique":"The Username provided is already taken."
    })
    password=models.TextField()
    first_name=models.CharField(max_length=25)
    last_name=models.CharField(max_length=25)
    gender=models.CharField(max_length=30)
    dob=models.DateField(blank=True)
    preferred_name=models.CharField(max_length=25,blank=True)
    bot_name=models.CharField(max_length=25,blank=True)
    email=models.EmailField(blank=True)
    address_line1 = models.CharField(max_length=128)
    address_line2 = models.CharField(max_length=128, blank=True)
    city = models.CharField(max_length=64)
    state = models.CharField(max_length=64)
    country = models.CharField(max_length=64)
    zip_code = models.CharField(max_length=6)
    phone_number=models.CharField(max_length=12, blank=True)
    ethnicity=models.CharField(max_length=30,blank=True)
    issue_diagnosed=models.BooleanField()
    issue_type=models.TextField(blank=True)
    issue_duration=models.CharField(max_length=30,blank=True)
    caregiver=models.BooleanField()
    class Meta:
        db_table='user'
        indexes = [ models.Index(fields=['username'])]



