import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs/operators';

import { FakeBackendService } from 'src/app/core/services/fake-backend.service';
import { ClientModel } from '../new-client/client-model';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = [
    'select',
    'nome',
    'email',
    'cpfOuCnpj',
    'telefone',
    'cep',
    'logradouro',
    'numero',
    'bairro',
    'cidade',
    'estado'
  ];
  displayedColumnsNames: string[] = [
    'Nome',
    'Email',
    'CPF/CNPJ',
    'Telefone',
    'CEP',
    'Logradouro',
    'Número',
    'Bairro',
    'Cidade',
    'Estado'
  ];
  dataSource: MatTableDataSource<ClientModel>;
  selection = new SelectionModel<ClientModel>(true, []);
  constructor(
    private fakeBackendService: FakeBackendService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getClients();
  }

  ngAfterViewInit() {
    // this.getData();
  }

  getClients() {
    this.fakeBackendService.getClients().subscribe((clients: ClientModel[]) => {
      console.log(clients);
      this.dataSource.data = clients;
    });
  }

  deleteClients() {
    console.log(this.selection.selected);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ClientModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nome + 1}`;
  }



}
