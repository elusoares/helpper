import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/clients',
    pathMatch: 'full'
  },
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'clients',
        loadChildren: () => import ('./clients/clients.module').then( m => m.ClientsModule)
      },
      {
        path: 'new-client',
        loadChildren: () => import ('./new-client/new-client.module').then( m => m.NewClientModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
