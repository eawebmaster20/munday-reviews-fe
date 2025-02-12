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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../../core/services/state/state.service';

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
    public stateService: StateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  authenticate() {
    this.formSubmitted = true;
    this.authService
      .login(
        this.loginForm.value,
        this.stateService.companyAuthentication ? 'auth/login/company' : '',
      )
      .subscribe({
        next: (res) => {
          this.toastr.success('Logged in successfully', 'Success');
          this.authService.setUserAuthenticated(true);
          if (this.stateService.companyAuthentication) {
            console.log(res.data.company.id);

            this.router.navigate([`dashboard/company/${res.data.company.id}`]);
          } else {
            this.router.navigate(['dashboard/home']);
          }
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
    this.route.queryParams.subscribe((params) => {
      if (params['company']) {
        console.log('hasParam');
        this.stateService.companyAuthentication = true;
        this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(5)]],
        });
        return;
      }
      this.stateService.companyAuthentication = false;
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
      });
    });
  }
}
