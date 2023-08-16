from rest_framework import serializers
from .models import user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user
        fields = ('id',
                  'username',
                  'password',
                  'first_name',
                  'last_name',
                  'gender',
                  'dob',
                  'preferred_name',
                  'email',
                  'address_line1',
                  'address_line2',
                  'city',
                  'state',
                  'country',
                  'zip_code',
                  'phone_number',
                  'ethnicity',
                  'issue_diagnosed',
                  'issue_type',
                  'issue_duration',
                  'caregiver')
