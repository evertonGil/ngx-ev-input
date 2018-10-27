import { Component } from '@angular/core';
import { MethodsListBuilder } from './core/method-list-builder';
import { FormGroup, FormBuilder, NgControl } from '@angular/forms';

@Component({
  selector: 'nht-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-hotkeytrapper';
  formulario: FormGroup;
  email;

  hotkey1 = [
    { keys: ['F1'], callback: 'alerta', method: 'registered' },
    { keys: ['Control', 'a'], callback: 'valor', method: 'value' },
    { keys: ['3', 'Tab'], callback: this.funcao1, method: 'function' }
  ];

  hotkey2 = {keys:['F1'], callback: 'alerta', method: 'registered'};

  constructor(private fb: FormBuilder) {
    MethodsListBuilder.setMethods({
      alerta: (input: NgControl) => {
        console.log(input);
        alert(`atalho foi acionado no control: \n ${input}`);
      }
    });
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    console.log('component', this);
  }

  iniciarFormulario(): any {
    this.formulario = this.fb.group({
      Nome1: [''],
      Nome2: [''],
      Nome3: [''],
      Nome4: ['']
    });
  }


  funcao1() {
    alert('foi chamado o methodo function');
  }
}
