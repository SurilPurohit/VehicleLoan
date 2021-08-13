import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadTables } from '../Models/user/upload';
import { UploadService } from '../Services/upload.service';

@Component({
  selector: 'app-application-files',
  templateUrl: './application-files.component.html',
  styleUrls: ['./application-files.component.css']
})
export class ApplicationFilesComponent implements OnInit {

  uploadForm = new FormGroup({
    userId : new FormControl('',[Validators.required]),
    adhar : new FormControl('',[Validators.required]),
    pan : new FormControl('',[Validators.required]),
    tick : new FormControl('',[Validators.required]),
  });

  uploads : UploadTables[] = [];

  upload : UploadTables = {
    userId : 0,
    adhar : "",
    pan : "",
  }

  //Other required variables.
  msg:string="";
  u_msg:string="";
  d_msg:string="";
  e_msg:string="";

  flag_get:boolean=false;
  flag_post:boolean=false;
  flag_put:boolean=false;
  flag_delete:boolean=false;
  flag_register:boolean=false;

  update_id:number=0;
  delete_id:number=0;

  constructor(private obj:UploadService,private router: Router) { }

  ngOnInit(): void {
  }

  post_api(data:any):void
  {
    console.log(data);
    this.obj.createUser(data).subscribe(data=>{
    this.msg="Successfully created "+data.userId;
    //Logging the response received from web api.
    console.log(data);
    alert("Your form is Successfully submitted!");
    this.router.navigate(["/UserDashboard"])
    })
  }

}
