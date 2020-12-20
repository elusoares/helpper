import { Component, OnInit } from '@angular/core';
import { FakeBackendService } from 'src/app/core/services/fake-backend.service';
import { ClientModel } from '../new-client/client-model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(
    private fakeBackendService: FakeBackendService,
  ) {

  }

  ngOnInit(): void {
    this.fakeBackendService.getClients().subscribe((clients: ClientModel[]) => {
      console.log(clients);
    });
  }



}
