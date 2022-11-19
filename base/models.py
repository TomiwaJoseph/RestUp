from django.db import models

# VARIABLES
BED_TYPES = [
    ("2 queen beds", "2 queen beds"),
    ("King size bed", "King size bed"),
    ("2 small beds", "2 small beds"),
]
BATHROOM_TYPES = [
    ("1 bathroom", "1 bathroom"),
    ("2 bathrooms", "2 bathrooms"),
]
VIEW_TYPES = [
    ("Terrace", "Terrace"),
    ("Balcony", "Balcony"),
]


# Create your models here.
class Apartment(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    price = models.IntegerField()
    size = models.IntegerField()
    capacity = models.IntegerField()
    pets = models.BooleanField(default=False)
    breakfast = models.BooleanField(default=False)
    main_image = models.ImageField(upload_to='apartments')
    other_images = models.ManyToManyField(
        "ApartmentImages", blank=True)    
        
    def __str__(self):
        return self.name
    
    
class Room(models.Model):
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name="apartment_room")
    name = models.CharField(max_length=100)
    availability = models.BooleanField(default=True)
    bed_type = models.CharField(max_length=30, choices=BED_TYPES)
    bathroom = models.CharField(max_length=30, choices=BATHROOM_TYPES)
    view = models.CharField(max_length=30, choices=VIEW_TYPES)
    max_people = models.IntegerField()
    
    
# class DoorNumber(models.Models):
#     room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="room_door")
#     number = models.IntegerField()
#     availability = models.BooleanField(default=True)
    
    
class ApartmentImages(models.Model):
    apartment = models.ForeignKey(
        "Apartment", on_delete=models.CASCADE, related_name='apartment_image')
    image = models.ImageField(upload_to='apartment_rooms')

    class Meta:
        verbose_name = 'Apartment Image'
        verbose_name_plural = 'Apartment Images'
        
    def __str__(self):
        return "image of {}".format(self.apartment.name)


