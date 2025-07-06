from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, "core/home.html")

def create_admin(request):
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("glancy", "valentindesel@gmail.com", "Valick565+")
        return HttpResponse("Admin created")
    return HttpResponse("Admin already exists")