import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFormValidatorService } from 'src/app/core/services/custom-form-validator.service';
import { FakeBackendService } from 'src/app/core/services/fake-backend.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ClientModel } from './client-model';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  newClientForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private customFormValidatorService: CustomFormValidatorService,
    private fakeBackendService: FakeBackendService,
    private snackBarService: SnackbarService,
    private router: Router
  ) {
    this.newClientForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        this.customFormValidatorService.patternValidator(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { invalidEmail: true })
      ]),
      cpfOuCnpj: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
  }

  saveClient() {
    if (this.newClientForm.valid) {
      const newClient: ClientModel = new ClientModel(
        this.newClientForm.get('nome').value,
        this.newClientForm.get('email').value,
        this.newClientForm.get('cpfOuCnpj').value,
        this.newClientForm.get('telefone').value,
        this.newClientForm.get('cep').value,
        this.newClientForm.get('logradouro').value,
        this.newClientForm.get('numero').value,
        this.newClientForm.get('bairro').value,
        this.newClientForm.get('cidade').value,
        this.newClientForm.get('estado').value
      );
      this.fakeBackendService.newClient(newClient).subscribe((res) => {
        this.snackBarService.openSnackBar('Um novo cliente foi adicionado', '');
        this.router.navigateByUrl('/clients');
      },
      (error) => {
        console.log(error);
      }
      );
    }
  }
}
