from django.urls import path,include
from django.contrib.auth import views as auth_views
from . import views
urlpatterns = [
    path('srchact',views.searchActive,name="searchActive"),
    path('srchdep',views.searchDep,name="SearchDep"),
    path('assigndep',views.assigndep,name="AssignDep"),
    path('update',views.update,name="update"),
    path('getdata',views.getdata,name='getdata'),
    path('AddStd',views.AddStd,name="AddStd"),
    path('srchedit',views.search,name="srchedit"),
    path('delete',views.dltID,name="deleteWithID"),
    path('edtstd',views.EditSTD,name="EditStudent"),
]