  import { Component, OnInit } from '@angular/core';
  import {FormBuilder, FormGroup, Validators} from '@angular/forms'; 
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { ReactiveFormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';
  import { FormControl } from '@angular/forms/src/model';
  import { DataService } from './data.service';
  import { IPosts } from './IPosts';
  import { error } from 'util';
import { IUser } from './IUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent implements OnInit {

  postForm: FormGroup;
  postsArray: IPosts[];
  postUser: IUser;

  somedata: string;
  postMessage: string;

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) { 
    this.postForm = fb.group({
      'name':['', Validators.required],
      'email': ['',Validators.compose([Validators.required, Validators.pattern(/^[a-zA-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)])],
      'post': ['', this.postValidator]
    });

    //this.postForm.statusChanges.subscribe((data: any) =>console.log(data));

  }
  onSubmit(){
    console.log(this.postForm.value);
    this.router.navigateByUrl('thankyou');
    return;
  }

  getData(){
    this.data.getPosts().subscribe( pd => this.postMessage = pd[0].body);
    this.data.getUser().subscribe(user => 
      this.postForm.setValue({'name': user.name, 'email' : user.email,'post': this.postMessage}));
  }

  postValidator(control: FormControl):{[s: string]: boolean}{
    if(control.value.length < 10){
      return {'invalid': true};
    }
    return null;
  }

  getPosts():void{
    this.data.getPosts()
      .subscribe(resultArray =>this.postsArray = resultArray
     // console.log(resultArray)
    )
     error   => console.log("Error: " + error);
  }

  getUsers():void{
    this.data.getUser()
      .subscribe(result => this.postUser = result
     // console.log(resultArray)
    )
    console.log(this.postUser)
     error   => console.log("Error: " + error);
  }

  ngOnInit() {
    this.getPosts();
    this.getUsers();
    //this.somedata = this.postsArray.values.toString();
  }

}
