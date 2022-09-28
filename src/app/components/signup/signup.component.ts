import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(password&& confirmPassword&& password!==confirmPassword){
      return{
        passwordsDontMatch:true
      }
    }
    return null;
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),
   },{validators: passwordMatchValidator()})
  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router) { }

  ngOnInit(): void {
  }

  get name(){
    return this.signUpForm.get('name')
  }
  get email(){
    return this.signUpForm.get('email')
  }
  get password(){
    return this.signUpForm.get('password')
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword')
  }
  submit(){
    if(!this.signUpForm.valid) return;
    const {name, email, password}= this.signUpForm.value;
    this.authService.signUp(name!,email!, password!).pipe(
      this.toast.observe({
        success:'congrats! you are signed up',
        loading:'Signing in',
        error:({message})=>`${message}`
      })
    ).subscribe(()=>{
      this.router.navigate(['/home']);
    })
  }
}
