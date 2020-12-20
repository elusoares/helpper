import { Injectable } from '@angular/core';
import { ClientModel } from 'src/app/modules/new-client/client-model';

export const enum StorageKeys {
  clients = 'clients'
}
@Injectable({
  providedIn: 'root'
})
// peguei a ideia de https://firstclassjs.com/persist-data-using-local-storage-and-angular/
export class StorageService {
  private localStorage: Storage;
  constructor() {
    this.localStorage = window.localStorage;
  }

  // salva um novo cliente.
  saveOneClient(client: ClientModel) {
    // salva todos os clients na variavel savedClients.
    const savedClients: ClientModel[] = this.getClients();
    // adiciona o novo lead
    savedClients.push(client);
    // sobrescreve o registro de leads
    this.localStorage.setItem(StorageKeys.clients, JSON.stringify(savedClients));
  }

  // recupera os clientes salvos
  getClients(): ClientModel[] {
    // retorna os clientes armazenados ou um array vazio se nao tiver nada
    return JSON.parse(this.localStorage.getItem(StorageKeys.clients)) || [];
  }

  // sobrescreve todos os clientes
  replaceClients(clients: ClientModel[]) {
    this.localStorage.setItem(StorageKeys.clients, JSON.stringify(clients));
  }
}
