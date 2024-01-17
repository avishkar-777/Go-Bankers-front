import { HttpClient, HttpHeaderResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  
  UserArray : any[] = [];
  userName : String= "";
  password : String = "";
  new : Boolean = false;
  notMatch : Boolean = false;
  emptyPass : Boolean = false;
  emptyUser : Boolean = false;
  // Base_URL : String = "https://gobankersnew-production.up.railway.app/api/v1/goBankers"
  Base_URL : String = "http://localhost:8080/api/v1/goBankers";

  constructor(private http: HttpClient, private router: Router) {
    
  }

    verifyUser() {

      if(!this.userName && !this.password){
        this.emptyPass = true;
        this.emptyUser = true;
        return;
      }

      if (!this.userName) {
        this.emptyUser = true;
        return;
      }
      if (!this.password) {
        this.emptyPass = true;
        return;
      }

      

      let bodyData = {
        userName: this.userName,
        password: this.password
      };

      this.http.post(this.Base_URL + "/verifyUser", bodyData)
        .subscribe((resultdata: any) => {
          console.log(resultdata);
         if(resultdata.code == 200){
            this.redirectToTask();
            this.clear();
         }
         if(resultdata.code == 500 && resultdata.object == true){
          this.notMatch =true;
          this.new = false;
          return;

         }
         if(resultdata.code == 500 && resultdata.object == false){
          this.new = true;
          this.notMatch = false;
          return;
         }
          
        });
    }

    clear(){
      this.userName = '';
      this.password = '';
      this.new =false;
      this.notMatch = false;
      this.emptyPass = false;
      this.emptyUser = false;
    }
    
    redirectToRegister() {
      this.clear();
      this.router.navigate(['/user']);
    }

    redirectToTask() {
      this.router.navigate(['/task']);
    }

}
