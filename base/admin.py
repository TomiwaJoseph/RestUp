from django.contrib import admin
from .models import Apartment, Room, ApartmentImages, RoomInfo, RoomExtra


class ApartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


class RoomAdmin(admin.ModelAdmin):
    list_display = ['apartment', 'name', 'price', 'max_people',  'bed_type',
                    'refundable', 'availability']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['availability']
    # list_filter = ['category']
    # search_fields = ['name', 'price']


admin.site.register(Apartment, ApartmentAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(ApartmentImages)
admin.site.register(RoomInfo)
admin.site.register(RoomExtra)
