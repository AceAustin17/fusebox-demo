import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../core/services/api.service';
import { firstValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
  panic_id: any;
  historyText: any;
  selectedvalue: any;

  statuses = [
    { value: 1, viewValue: 'In Progress' },
    { value: 2, viewValue: 'Cancelled' },
    { value: 3, viewValue: 'Resolved' },
  ];

  ngOnInit(): void {}

  send() {
    //GET THIS INFO FROM FORM
    const body = {
      longitude: '28.0559616',
      latitude: '-26.099712',
      panic_type: 'Bank Robbery',
      details: 'The joker is holding hostages. Come quick!',
    };
    firstValueFrom(this.api.send(body)).then((res) => {
      this.panic_id = res.data.panic_id;
    });
  }

  cancel() {
    const body = {
      panic_id: this.panic_id,
    };
    firstValueFrom(this.api.cancel(body)).then((res) => {
      console.log(res);
    });
  }

  history() {
    const params = {
      status_id: this.selectedvalue,
    };
    firstValueFrom(this.api.history(params)).then((res) => {
      this.historyText = res;
    });
  }
}
