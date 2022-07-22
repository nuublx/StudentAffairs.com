from django.urls import path,include
from django.contrib.auth import views as auth_views
from . import views
urlpatterns = [
    path('',views.outerpage, name="outerpage"),
    path('login',views.SignIN, name="login"),
    path('home',views.home,name="home"),
    path('AddStudent',views.AddStudent,name="AddStudent"),
    path('EditStudent',views.EditStudent,name="EditStudent"),
    path('active',views.active,name="active"),
    path('Departments',views.Departments,name="Departments"),
    path('AllStudents',views.AllStudents,name="AllStudents")
]
