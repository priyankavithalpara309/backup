import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UrlHandlingStrategy } from '@angular/router';
import { UserService } from '../services/user.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  fileName: string = "Upload Photo";
  username: any;
  emailid: any;
  phone: any;
  user_data: any;
  dropdownCountry: any;
  country1: any;
  CounteryName: any;
  searchedKeyword: any;

  e_name: any;
  e_emailid: any;
  e_id: any;
  e_country_nm: any;
  e_phone: any;
  _ID: any;
  // image1:any;

  edituser = "none";
  url = 'http://localhost:4000/public/';
  selectedFile!: ImageSnippet;
  imageService: any;  
  img: any;

  constructor(private adduserdata: UserService) { }

  ngOnInit(): void {
    this.adduserdata.showAllUser().subscribe((data) => {
      console.log(data);
      this.user_data = data;
    });

    this.adduserdata.showAllCountry().subscribe((data) => {
      console.log(data);
      this.dropdownCountry = data;
    });
  }

  adduser() {
    console.log(this.username, this.emailid, this.phone, this.CounteryName, this.fileName);
    this.adduserdata.addUser({ UserName: this.username, countryId: this.CounteryName, Email: this.emailid, PhoneNumber: this.phone, image: this.fileName }).subscribe((data) => {
      console.log(data);
    })
    // this.adduserdata.addUser(_id,{UserName:this.username,countryId:this.CounteryName,Email:this.emailid,PhoneNumber:this.phone,image:this.fileName}).subscribe((data)=>{
    //   console.log(data);
    // })
  }
 
  
  onFileInput(event:any){        
    this.fileName = event.target.files[0].name;
    console.log(this.fileName);
  }

  Changed(event: any) {
    console.log(event.target.value);
    this.CounteryName = event.target.value;
    console.log(this.CounteryName);
  }

  edituserdata(data: any) {
    this.edituser = "block";
    console.log(data);
    this.e_id = data._id;
    this.e_name = data.UserName;
    this.e_emailid = data.Email;
    // this.image1=data.image;
    // this.e_country_nm=data.countryId.CounteryName;
    this.e_phone = data.PhoneNumber;
    this.fileName = data.image;
    // console.log(this.fileName);
  }

  removedata(data: any) {
    this._ID = data._id;
    console.log(this._ID);
    this.adduserdata.deleteuser(this._ID).subscribe((data) => {
      console.log(data);
    })
  }

  edit() {
    console.log(this.e_id, this.e_name, this.e_emailid, this.e_phone, this.CounteryName, this.fileName);
    this.adduserdata.updateuser(this.e_id, { UserName: this.e_name, countryId: this.CounteryName, Email: this.e_emailid, PhoneNumber: this.e_phone, image: this.url+this.fileName }).subscribe((data) => {
      console.log(data);
    })
    this.close();
  }

  close() {
    this.edituser = "none";
  }

  public formData1: any = {};

  submit(formData1: NgForm) { }
}
