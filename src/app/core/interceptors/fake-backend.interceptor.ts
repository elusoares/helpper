import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { ClientModel } from 'src/app/modules/new-client/client-model';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // adicionar novo cliente aos clientes armazenados
    if (request.url.endsWith('user/new-client') && request.method === 'POST') {
      const newClient: ClientModel = request.body as ClientModel;
      // atualiza o registro de clientes
      this.storageService.saveOneClient(newClient);
      // e aí retorna uma nova resposta com o status ok
      return of(new HttpResponse({ status: 200 }));
    }

    // atualiza o array de clients, importante pra quando for excluir um cliente, ja que nao vou usar id
    if (request.url.endsWith('user/clients/update') && request.method === 'POST') {
      // pega o array de clients
      const clients: ClientModel[] = request.body as ClientModel[];
      // atualiza o registro de clientes
      this.storageService.replaceClients(clients);
      // e aí retorna uma nova resposta com o status ok
      return of(new HttpResponse({ status: 200 }));
    }

    // retorna todos os clients
    if (request.url.endsWith('user/clients') && request.method === 'GET') {
      const clients: ClientModel[] = this.storageService.getClients();
      return of(new HttpResponse({ status: 200, body: clients }));
    }
    return next.handle(request);
  }
}
