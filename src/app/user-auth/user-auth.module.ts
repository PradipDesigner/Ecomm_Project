import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthRoutingModule } from './user-auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAuthComponent } from './user-auth.component';


@NgModule({
  declarations: [
    UserAuthComponent
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserAuthModule { }
