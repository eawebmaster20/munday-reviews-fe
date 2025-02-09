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
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  inputType: string = 'password';
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  authenticate() {
    this.formSubmitted = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Logged in successfully', 'Success');
        this.authService.setUserAuthenticated(true);
        this.router.navigate(['dashboard/home']);
        console.error(res);
      },
      error: (error) => {
        this.formSubmitted = false;
        this.toastr.error(error.error.message, 'Error');
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
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
