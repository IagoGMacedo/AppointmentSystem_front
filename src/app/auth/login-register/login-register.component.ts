import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { InputValidationComponent } from '../../shared/components/input-validation/input-validation.component';
import { Login, Register } from '../../core/types/formTypes';
import { AuthService } from '../../core/services/auth.service';

const matchPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let password = control.get('password');
  let confirmpassword = control.get('passwordConfirmation');
  if (
    password &&
    confirmpassword &&
    password?.value != confirmpassword?.value
  ) {
    confirmpassword.setErrors({ mismatch: true });
  }
  return null;
};

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [ReactiveFormsModule, InputValidationComponent,],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
})
export class LoginRegisterComponent {
  constructor(private formBuilderService: FormBuilder, private authService: AuthService) {

  }

  loginForm = this.formBuilderService.group({
    login: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  registerForm = this.formBuilderService.group(
    {
      name: ['', Validators.required],
      login: ['', Validators.required],
      profile: [1, Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    },
    {
      validators: matchPassword,
    }
  );

  wrongCredentials: boolean = false;
  showLoginForm: boolean = true;

  onSubmitLogin() {

    if (this.loginForm.valid) {
      this.authService.onLogin(this.loginForm.value as Login).subscribe({
        next: () => {},
        error: () => {
          this.wrongCredentials = true;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onSubmitRegister() {

    if (this.registerForm.valid) {
      const registerData: Register = {
        name: this.registerForm.controls.name.value!,
        login: this.registerForm.controls.login.value!,
        password: this.registerForm.controls.password.value!,
        profile: Number(this.registerForm.controls.profile.value!),
        dateOfBirth: new Date(this.registerForm.controls.dateOfBirth.value!).toISOString()
      }

      this.authService
        .onRegister(registerData)
        .subscribe({
          next: () => {
            this.registerForm.reset()
            this.changeForm();
          },
          error: () => {
            this.wrongCredentials = true;
          },
        });
        
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  changeForm() {
    this.showLoginForm = !this.showLoginForm;
  }
}
