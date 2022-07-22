from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse,HttpResponse,HttpResponseRedirect
import json
from .models import Student,Departments
from django.contrib import messages
# Create your views here.
############################################################################################
@csrf_protect
def searchActive(request):
    data = json.loads(request.body)
    stu= Student.objects.all()
    stu=stu.filter(name__istartswith=data["name"])

    if data["department"] != 'All':
        stu = stu.filter(department=data["department"])

    if data["level1"] is False:
        stu=stu.exclude(level ='First Level')

    if data["level2"] is False:
        stu=stu.exclude(level ='Second Level')

    if data["level3"] is False:
        stu=stu.exclude(level ='Third Level')

    if data["level4"] is False:
        stu=stu.exclude(level ='Fourth Level')

    if data["level5"] is False:
        stu=stu.exclude(level ='Graduated')

    if data["level6"] is False:
        stu=stu.exclude(level ='Masters Student')

    if data["level7"] is False:
        stu=stu.exclude(level ='PHD Student')

    stat1=data["status1"]
    stat2=data["status2"]

    if stat1 is True:
        stu=stu.filter(status='Active')
    elif stat2 is True:
        stu=stu.filter(status='Inactive')

    response = stu.values()
    response_list = list(response)
    return JsonResponse(response_list, safe=False)

############################################################################################
@csrf_protect
def searchDep(request):
    data = json.loads(request.body)
    print(data)
    stu=Student.objects.all()
    if not stu.filter(ID=data["id"]):
        response_list = list([])
        return JsonResponse(response_list,safe=False)

    stu=stu.filter(ID=data["id"])  
    print(stu.values())
    if stu[0].level == "Second Level" or stu[0].level == "First Level":
        response_list = list([])
        return JsonResponse(response_list,safe=False)
    else:
        response=stu.values()
        response_list = list(response)
        return JsonResponse(response_list,safe=False)

@csrf_protect  
def assigndep(request):
    data = json.loads(request.body)
    dep=Departments.objects.get(D_name=data["depart"])
    Student.objects.filter(ID=data["Ident"]).update(department=dep)
    #stu=Student(name=stu.name,ID=stu.ID,gpa=stu.gpa,birthdate=stu.birthdate,phone_number=stu.phone_number,email=stu.email,gender=stu.gender,status=stu.status,level=stu.level,department=dep)
    #stu.save()
    return HttpResponse("done")
############################################################################################

@csrf_protect
def update(request):
    data = json.loads(request.body)
    if Student.objects.filter(ID=data["Ident"]):
        stat1=data["status0"]
        stat2=data["status1"]
        if stat1==True:
            Student.objects.filter(ID=data["Ident"]).update(status="Active")
        elif stat2==True:
            Student.objects.filter(ID=data["Ident"]).update(status="Inactive")
        return HttpResponse("done")
    else:
        return HttpResponse("error")   

############################################################################################

def getdata(request):
    Data = Student.objects.all()
    return JsonResponse({"stuData": list(Data.values())})

############################################################################################
@csrf_protect
def AddStd(request):
    if request.method=="GET":
        return render(request,'AddStudent.html')
    
    if request.method == "POST":
        SID=request.POST["SID"]
    print(SID)
    if Student.objects.filter(ID=SID):
        print("ERRORRRR")
        messages.error(request,"I")
        return redirect('AddStudent')
    print(SID)
    Sname=request.POST["Sname"]
    Sgndr=request.POST["gender"]
    SbirthDate=request.POST["SbirthDate"]
    Level=request.POST["Level"]
    SGPA=request.POST["gpa"]
    Sstatus=request.POST["Status"]
    
    if request.POST.get("Department",False):
        Sdepart=Departments.objects.get(D_name=request.POST["Department"])
    else:
        Sdepart=Departments.objects.get(D_name="General")

    PN=request.POST["PhoneNumber"]
    em=request.POST["email"]

    std=Student(name=Sname,ID=SID,gpa=SGPA,birthdate=SbirthDate,status=Sstatus,gender=Sgndr,level=Level,department=Sdepart,phone_number=PN,email=em)
    std.save()
    messages.success(request,"Saved")
    return HttpResponseRedirect('../AddStudent')

############################################################################################
@csrf_protect
def search(request):
    data = json.loads(request.body)
    stu=Student.objects.all()
    stu=stu.filter(ID=data["id"])
    response=stu.values()
    response_list = list(response)
    return JsonResponse(response_list,safe=False)
@csrf_protect
def dltID(request):
    data=json.loads(request.body)
    if Student.objects.filter(ID=data["id"]):
        Student.objects.filter(ID=data["id"]).delete()
        return HttpResponse("done")
    else:
        return HttpResponse("error")

@csrf_protect
def EditSTD(request):
    if request.method=="GET":
        return render(request,'EditStudent.html')

    data=json.loads(request.body)
    if data["id"]=="":
        return HttpResponse("error")

    std=Student.objects.get(ID=data["id"])
    if data["level"]=="Second Level" or data["level"]=="First Level":
        Sdepart=Departments.objects.get(D_name="General")
    else:
        Sdepart=std.department
    if data["name"]=="":
        data["name"]=std.name
    if data["level"]=="":
        data["level"]=std.level
    if data["gpa"]=="":
        data["gpa"]=std.gpa
    if data["BrD"]=="":
        data["BrD"]=std.birthdate
    if data["stat"]=="":
        data["stat"]=std.status
    if data["phone"]=="":
        data["phone"]=std.phone_number
    if data["email"]=="":
        data["email"]=std.email
    std=Student(name=data["name"],department=Sdepart,gender=std.gender,ID=data["id"],gpa=data["gpa"],birthdate=data["BrD"],status=data["stat"],level=data["level"],phone_number=data["phone"],email=data["email"])
    std.save()
    return HttpResponse("done")
############################################################################################
