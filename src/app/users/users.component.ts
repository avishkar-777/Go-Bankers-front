import { HttpClient, HttpHeaderResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent {

  UserArray : any[] = [];
  firstName : String= "";
  middleName : String = "";
  lastName : String ="";
  mobileNo : String = "";
  email : String = "";
  userId : number = 0;
  password : String = "";
  
  // Base_URL : String = "https://gobankersnew-production.up.railway.app/api/v1/goBankers"
  Base_URL : String = "http://localhost:8080/api/v1/goBankers";
  showFirstNameError : Boolean = false;
  lastNameError : Boolean = false;
  mobNoError : Boolean = false;
  emailError : Boolean = false;
  passwordError : Boolean = false;

  constructor(private http: HttpClient)
  {
    this.getUsers();
  }


    getUsers()
    {
      this.http.get(this.Base_URL+"/getUsers")
      .subscribe((resultdata: any) =>
      {
        console.log(resultdata);
        this.UserArray = resultdata;
      });
    }


    registerUser()
    {
       if(!this.firstName && !this.lastName && !this.mobileNo && !this.email && !this.password){
        this.showFirstNameError = true;
        this.lastNameError = true;
        this.mobNoError = true;
        this.emailError = true;
        this.passwordError = true;

       }
      
      if (!this.firstName) {
        this.showFirstNameError = true;
        return;
      }
      if (!this.lastName) {
        this.lastNameError = true;
        return;
      }
      if (!this.mobileNo) {
        this.mobNoError = true;
        return;
      }
      if (!this.email) {
        this.emailError = true;
        return;
      }
      if (!this.password) {
        this.passwordError = true;
        return;
      }  

      let bodyData = {
        firstName : this.firstName,
        middleName : this.middleName,
        lastName : this.lastName,
        mobileNo : this.mobileNo,
        email : this.email,
        password : this.password
      }

      this.http.post(this.Base_URL + "/registerUser", bodyData, {responseType : 'text'})
      .subscribe((resultData : any) =>
      {
          console.log(resultData);
          alert("User Registered Successfully!");
          
          this.clearForm();
          this.getUsers();
      });
    }
    

    clearForm()
    {
      this.firstName = '';
      this.middleName = '';
      this.lastName = '';
      this.mobileNo = '';
      this.email = '';
      this.password = '';
      this.userId = 0;
      this.showFirstNameError = false;
      this.lastNameError = false;
      this.mobNoError = false;
      this.emailError = false;
      this.passwordError = false;

    }


    setUpdate(data : any)
    {
      this.firstName = data.firstName;
      this.middleName = data.middleName;
      this.lastName = data.lastName;
      this.mobileNo = data.mobileNo;
      this.email = data.email;
      this.password = data.password;
      this.userId = data.userId;
    }


    updateUser()
    {

      if (!this.firstName) {
        this.showFirstNameError = true;
        return;
      }
      if (!this.lastName) {
        this.lastNameError = true;
        return;
      }
      if (!this.mobileNo) {
        this.mobNoError = true;
        return;
      }
      if (!this.email) {
        this.emailError = true;
        return;
      }
      if (!this.password) {
        this.passwordError = true;
        return;
      }  

      let bodyData = {
        userId : this.userId,
        firstName : this.firstName,
        middleName : this.middleName,
        lastName : this.lastName,
        mobileNo : this.mobileNo,
        email : this.email,
        password : this.password
      }

      this.http.put(this.Base_URL + "/updateUser", bodyData,{responseType:'text'})
      .subscribe((resultData: any)=>
      {
        console.log(resultData);
        alert("User Updated Successfully!");
        this.getUsers();
        this.clearForm();
      });

    }

    saveUser()
    {
        if (this.userId >0 && this.userId != undefined)
        this.updateUser();

        else
        this.registerUser();
    }


    removeUser(data: any)
    {
      
      this.http.delete(this.Base_URL + "/removeUser/"+ data.userId, {responseType:'text'})
      .subscribe((resultData: any)=>
      {
        
        console.log(resultData);
        alert("User Removed Successfully!");
        this.getUsers();
        this.clearForm();
      });

    }




}
