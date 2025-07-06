from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import get_user_model

def index(request):
    return render(request, "core/home.html")

def create_admin(request):
    User = get_user_model()
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("glancy", "valentindesel@gmail.com", "Valick565+")
        return HttpResponse("Admin created")
    return HttpResponse("Admin already exists")