from django.contrib import admin

from backend_app.models import user


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name']

admin.site.register(user, UserAdmin)
