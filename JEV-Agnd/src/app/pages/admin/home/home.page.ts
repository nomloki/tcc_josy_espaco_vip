import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() { }

  Agendamentos: any[] = [
    // {
    //   status: 'Confirmado',
    //   horarioInicio: '9:00', horarioFim: '10:30',
    //   cliente: 'Laura Peneira',
    //   servico: 'Cabelo, Manicure, Pedicure',
    //   metodoPagamento: 'Pix',
    //   preco: '150.00',
    //   data: '2023-09-28'
    // },
    // {
    //   status: 'Esperando confirmação',
    //   horarioInicio: '11:00', horarioFim: '12:30',
    //   cliente: 'Josefina Chapéu',
    //   servico: 'Cabelo',
    //   metodoPagamento: 'Dinheiro',
    //   preco: '50.00',
    //   data: '2023-09-30'
    // },
    // {
    //   status: 'Esperando confirmação',
    //   horarioInicio: '14:20', horarioFim: '15:20',
    //   cliente: 'Claudinha Buxexa',
    //   servico: 'Manicure, Pedicure',
    //   metodoPagamento: 'Débito',
    //   preco: '100.00',
    //   data: '2023-09-29'
    // },
  ]

  Agendamentos_exibidos: any[] = this.Agendamentos;

  ngOnInit() {

  }
  AddForm!: FormGroup;

  submit_add() {

    console.log(this.AddForm.value)
    if (this.AddForm.invalid) {
      console.log('Formulario De Adição Invalido')
      return;
    }
    console.log('Formulario De Adição Valido')

  }
  setOpenAdd(isOpen: any) {
    this.modalOpenAdd = isOpen;

    this.createFormAdd();
  }
  createFormAdd() {
    this.AddForm = new FormGroup({
      id: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required]),
      servicos: new FormControl('', [Validators.required]),
      formaDePagamento: new FormControl('', [Validators.required])
    });
  }
  get status() {
    return this.AddForm.get('status')!;
  }
  get cliente() {
    return this.AddForm.get('cliente')!;
  }
  get servicos() {
    return this.AddForm.get('servicos')!;
  }
  get formaDePagamento() {
    return this.AddForm.get('formaDePagamento')!;
  }

  modalOpenDelete = false;
  modalOpenAdd = false;
  modalOpenEdit = false;

  setOpenDelete(isOpen: any) {
    this.modalOpenDelete = isOpen;
  }

  setOpenEdit(isOpen: any) {
    this.modalOpenEdit = isOpen;
  }

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
    },
  ];

  setResult(ev: any) {
    // O role pode ser confirm or cancel
    console.log(ev.detail.role);

  }

  search(e: Event): void {
    let estado: boolean = false;
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.Agendamentos_exibidos = this.Agendamentos.filter((agendamento) => {
      if (agendamento.data.includes(value) == true) {
        estado = true;
      }
      return agendamento.data.includes(value);
    });
    this.verificarEstado(estado);
  }

  verificarEstado(estado: any) {
    if (!estado) {
      setTimeout(() => {
        this.Agendamentos_exibidos = this.Agendamentos
      }, 1000)
    }
  }
}
