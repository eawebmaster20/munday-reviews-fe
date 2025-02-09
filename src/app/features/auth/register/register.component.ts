import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  formSubmitted: boolean = false;
  inputType: string = 'password';
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  register() {
    this.formSubmitted = true;
    // console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe({
      next: () => {
        this.toastr.success('Registration successful', 'Success');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.formSubmitted = false;
        this.toastr.error(error.error.message, 'Error');
        // console.error('Error Signing Up', error.error.message)
      },
    });
  }

  toggleType() {
    if (this.inputType === 'text') {
      this.inputType = 'password';
      return;
    }
    this.inputType = 'text';
  }
  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
