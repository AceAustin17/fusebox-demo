import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../core/services/api.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  public loginForm!: FormGroup;

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private api = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    firstValueFrom(this.api.login(this.loginForm.value)).then((res) => {
      this.auth.updateToken(res.data.api_access_token);
      this.router.navigate(['/home']);
    });
  }
}
