import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { IAuthReqPayload } from '../../core/models/authReq.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(payload: IAuthReqPayload) {
    return this.api.post('auth/login', payload);
  }
}
