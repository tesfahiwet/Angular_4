import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PostformComponent } from './postform.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const ROUTES : Routes = [
  {path: '', component: PostformComponent},
  {path: 'thankyou', component : ThankyouComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PostformComponent,
    ThankyouComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [FormBuilder, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
