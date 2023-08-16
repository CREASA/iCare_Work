from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from .models import user
from django.contrib.auth.hashers import make_password, check_password

from backend.test_chat import generate_response

@api_view(['POST'])
def signup_user(request):
    # parses request data
    user_data = JSONParser().parse(request)

    # hashes password before storing in database
    if 'password' in user_data:
        user_data['password'] = make_password(user_data.get('password'))

    # creates + validates serializer. saves data if valid, error if not.
    user_serializer = UserSerializer(data=user_data)
    if user_serializer.is_valid():
        user_serializer.save()
        return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    #extracts username, password for login
    login_data = request.data
    username = login_data.get('username')
    password = login_data.get('password')

    # query for matching user object
    user_data = user.objects.filter(username=username).values()

    # checks if user exists + if password matches, error if either condition not met
    if user_data.exists():
        user_data = list(user_data)[0]
        if check_password(password, user_data.get('password')):
            return JsonResponse(user_data, status=status.HTTP_200_OK)
    return JsonResponse(login_data, status=status.HTTP_401_UNAUTHORIZED)

# takes in request, username to edit user information.
# if password correct, password will be updated to 'new_password' value provided in request
# username used as identifier - should not be changed
@api_view(['PATCH'])
def edit_user(request):
    # extract fields to change. request only contains modified fields.
    change_data = request.data
    
    # get user to edit based on username field, return error if user does not exist
    try:
        user_to_edit = user.objects.get(username=change_data.get('username'))
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)


    for field, value in change_data.items():
        # goes through non-password fields to change values
        if field in [field.name for field in user._meta.fields]:
            if field != 'password' and field != 'new_password':
                setattr(user_to_edit, field, value)

            # verifies + updates password, throws error if no new password provided
            if field == 'password':
                if (check_password(value, user_to_edit.password)):
                    try:
                        value = make_password(change_data.get('new_password'))
                        setattr(user_to_edit, field, value)
                    except Exception as e:
                        return JsonResponse({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
                else:
                    return JsonResponse({field: make_password(value)}, status=status.HTTP_404_NOT_FOUND)

    # save changes + successful response
    user_to_edit.save()
    return JsonResponse(change_data, status=status.HTTP_202_ACCEPTED)


# test
@api_view(['POST'])
def chat_coachbot(request):
    # parses request data
    input = request.data.get("input")
    output = generate_response(input)
    out = {"output": output}
    return JsonResponse(out, status=status.HTTP_200_OK, safe=False)
