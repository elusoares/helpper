import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from 'src/app/modules/new-client/client-model';

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {

  constructor(
    private http: HttpClient,
  ) { }

  getClients() {
    return this.http.get('user/clients');
  }

  newClient(client: ClientModel) {
    return this.http.post('user/new-client', client);
  }

  updateClients(clients: ClientModel[]) {
    return this.http.post('user/clients/update', clients);
  }
}
