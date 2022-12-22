from django.db import models
from django.utils import timezone
from django.utils.text import slugify

# VARIABLES
BED_TYPES = [
    ("1 full bed", "1 full bed"),
    ("2 queen beds", "2 queen beds"),
    ("2 full beds", "2 full beds"),
    ("1 small bed", "1 small bed"),
    ("King size bed", "King size bed"),
    ("2 small beds", "2 small beds"),
]


# Create your models here.
class Apartment(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    main_image = models.ImageField(upload_to='apartments')
    other_images = models.ManyToManyField(
        "ApartmentImages", blank=True, related_name="other_apartment_images")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Apartment, self).save(*args, **kwargs)


class Room(models.Model):
    apartment = models.ForeignKey(
        Apartment, on_delete=models.CASCADE, related_name="apartment_room")
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    max_people = models.IntegerField()
    price = models.IntegerField()
    bed_type = models.CharField(max_length=30, choices=BED_TYPES)
    size = models.IntegerField()
    refundable = models.BooleanField(default=True)
    room_info = models.ManyToManyField(
        "RoomInfo", blank=True, related_name="info_list")
    room_extras = models.ManyToManyField(
        "RoomExtra", blank=True, related_name="extras_list")
    # booked_start_date = models.DateField("Start Date", default=timezone.now)
    # booked_end_date = models.DateField("End Date", default=timezone.now)
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.apartment} - {self.name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Room, self).save(*args, **kwargs)


class RoomInfo(models.Model):
    info = models.CharField(max_length=100)

    def __str__(self):
        return self.info


class RoomExtra(models.Model):
    extra = models.CharField(max_length=100)

    def __str__(self):
        return self.extra


class ApartmentImages(models.Model):
    apartment = models.ForeignKey(
        "Apartment", on_delete=models.CASCADE, related_name='related_images')
    image = models.ImageField(upload_to='apartment_rooms')

    class Meta:
        verbose_name = 'Apartment Image'
        verbose_name_plural = 'Apartment Images'

    def __str__(self):
        return "image of {}".format(self.apartment.name)
