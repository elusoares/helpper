import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs/operators';

import { FakeBackendService } from 'src/app/core/services/fake-backend.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ClientModel } from '../new-client/client-model';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit  {
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
    private snackBarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getClients();
  }

  getClients() {
    this.fakeBackendService.getClients().subscribe((clients: ClientModel[]) => {
      console.log(clients);
      this.dataSource.data = clients;
    });
  }

  deleteClients() {
    console.log(this.selection.selected);
    this.dataSource.data = this.dataSource.data.filter(client => {
      for (const selected of this.selection.selected) {
        return client !== selected;
      }
    });
    this.selection.clear();
    this.fakeBackendService.updateClients(this.dataSource.data).subscribe((res) => {
      this.snackBarService.openSnackBar('O cliente foi excluído', '');
    },
    (error) => {
      console.log(error);
    });
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
