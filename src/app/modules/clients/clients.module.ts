import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';


@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
