from django.shortcuts import render,redirect
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from EASS.models import Student
from django.contrib.auth.models import User
from django.contrib import messages

# Create your views here.
def outerpage(request):
    return render(request, 'OuterHomePage.html')
def home(request):
    if request.user.is_authenticated:
        return render(request,'home.html')
    else:
        messages.error(request,"You must login to enter this page.")
        return SignIN(request)

def EditStudent(request):
    if request.user.is_authenticated:
        return render(request,'EditStudent.html')
    else:
        messages.error(request,"You must login to enter this page.")
        return SignIN(request)

def active(request):
    if request.user.is_authenticated:
        return render(request,'active.html')
    else:
        messages.error(request,"You must login to enter this page.")
        return SignIN(request)
        
def Departments(request):
    if request.user.is_authenticated:
        return render(request,'Departments.html')
    else:
        messages.error(request,"You must login to enter this page.")
        return SignIN(request)

def AllStudents(request):
    if request.user.is_authenticated:
        return render(request,'AllStudents.html')
    else:
        messages.error(request,"You must login to enter this page.")
        return SignIN(request)

def AddStudent(request):
    if request.user.is_authenticated:
        return render(request,'AddStudent.html')
    else:
        messages.error(request,"You must login to enter this page.")
        return SignIN(request)

@csrf_protect
def SignIN(request):
    if request.user.is_authenticated:
        logout(request)
    if request.method == "POST":
        userx=request.POST['username']
        passx=request.POST['password']
        user = authenticate(username=userx, password=passx)
        
        if user is not None:
            login(request, user)
            return HttpResponseRedirect('home')
        else:
            messages.error(request,"Wrong Username or Password!..")
            return redirect('login')
     
    return render(request,'login.html')

