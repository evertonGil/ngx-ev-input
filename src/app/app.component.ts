import { Component } from '@angular/core';
import { MethodsListBuilder } from './directives/method-list-builder';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngxev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-ev-input';
  formulario: FormGroup;
  email;

  constructor(private fb: FormBuilder) {
    MethodsListBuilder.setMethods({
      alerta: (input) => {
        alert('atalho foi acionado');
      }
    });
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    console.log('component', this);
  }

  iniciarFormulario(): any {
    this.formulario = this.fb.group({
      Nome: [''],
      Email: ['']
    });
  }
}
