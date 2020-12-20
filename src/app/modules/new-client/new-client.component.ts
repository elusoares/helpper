import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CustomFormValidatorService } from 'src/app/core/services/custom-form-validator.service';

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
    this.getFormValidationErrors();

  }
  getFormValidationErrors() {
    Object.keys(this.newClientForm.controls).forEach(key => {

    const controlErrors: ValidationErrors = this.newClientForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }
}
