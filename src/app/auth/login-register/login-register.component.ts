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
  imports: [ReactiveFormsModule, InputValidationComponent],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
})
export class LoginRegisterComponent {
  constructor(private formBuilderService: FormBuilder) {}

  loginForm = this.formBuilderService.group({
    login: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', Validators.required],
  });

  registerForm = this.formBuilderService.group(
    {
      name: ['', Validators.required],
      login: ['', Validators.required],
      profile: ['1', Validators.required],
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
      //logica do login aqui
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onSubmitRegister() {
    if (this.registerForm.valid) {
      //logica do register aqui
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  changeForm() {
    console.log(this.showLoginForm);
    this.showLoginForm = !this.showLoginForm;
  }
}
