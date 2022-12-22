from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, Booking


@admin.register(CustomUser)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': (
            'is_active', 'is_staff', 'is_superuser',
            'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email', 'first_name', 'last_name')


class BookingAdmin(admin.ModelAdmin):
    list_display = ['user', 'room', 'occupant_email',
                    'stay_duration',  'start_date', 'end_date']
    # list_editable = ['start_date', 'end_date']
    # list_filter = ['category']
    # search_fields = ['name', 'price']


admin.site.register(Booking, BookingAdmin)
