import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { timestamp } from 'rxjs';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes/clientes.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  ClienteCad: Clientes[] = [];
  clientes_Exibidos: Clientes[] = [];

  filterClienteName(e: Event) {
    let estado: boolean = false;
    const target = e.target as HTMLInputElement;
    const value = target.value;
    // console.log(value)

    this.clientes_Exibidos = this.ClienteCad.filter((cliente) => {
      if (cliente.cliente_nome.includes(value.toLocaleLowerCase()) || cliente.cliente_email.includes(value)) {
        estado = true;
      }
      console.log(value)
      return cliente.cliente_nome.includes(value.toLocaleLowerCase()) || cliente.cliente_email.includes(value);
    });
    this.verificarEstado(estado);
  }

  verificarEstado(estado: any) {
    if (!estado) {
      setTimeout(() => {
        this.clientes_Exibidos = this.ClienteCad
      }, 1000)
    }
  }

  constructor(private clientesService: ClientesService) {
    this.cad_cli()
  }
  isLoading = false;
  cad_cli() {
    this.isLoading = true;
    this.clientesService.list().subscribe((dados: any) => {
      this.isLoading = false;
      this.ClienteCad = dados.clientes;
      console.log(this.ClienteCad);
      this.clientes_Exibidos = this.ClienteCad;
      console.log(this.clientes_Exibidos);
    })
  }
  indiceDel:any
  apagarService(indice: any) {
    this.indiceDel = indice
    this.setOpenDelete(true);
  }

    // Modal de delete confirm
    modalOpenDelete = false;
    setOpenDelete(isOpen: any) {
      this.modalOpenDelete = isOpen;
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
      this.setOpenDelete(false);
      if (ev.detail.role == 'confirm') {
        this.clientesService.delete(this.indiceDel).subscribe(data=>{
          this.ClienteCad = this.ClienteCad.filter((cliente: any) => cliente.id_cliente !== this.indiceDel);
          this.clientes_Exibidos = this.ClienteCad;
        });
      }
    }
  

  // modal
  EditForm!: FormGroup;
  modalOpenEdit = false;

  submit_edit() {
    console.log(this.EditForm.value)
    if (this.EditForm.invalid) {
      console.log('Formulario De Edição Invalido')
      // this.message = 'Falha ao agendar!!'
      // this.ExibirMessage(false);
      return;
    }
    console.log('Formulario De Edição Valido')
    // this.message = 'Agendado com sucesso!!'
    // this.ExibirMessage(true);
  }

  setOpenEdit(isOpen: any) {
    if (isOpen == true || isOpen == false || this.EditForm.valid && isOpen == 'submit') {
      this.modalOpenEdit = isOpen == 'submit' ? false : isOpen;
    }
    if (isOpen == true) {
      this.createFormEdit()
    }
  }

  createFormEdit() {
    this.EditForm = new FormGroup({
      idCli: new FormControl(''),
      nomeCli: new FormControl('', Validators.compose([
        Validators.maxLength(70),
        Validators.minLength(3),
        Validators.required])),
      telCli: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(15),
        Validators.required])),
      emailCli: new FormControl('', Validators.compose([
        Validators.maxLength(70),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required])),
    });
  }

  get nomeCli_edit() {
    return this.EditForm.get('nomeCli')!;
  }
  get telCli_edit() {
    return this.EditForm.get('telCli')!;
  }
  get emailCli_edit() {
    return this.EditForm.get('emailCli')!;
  }
  // modal
  AddForm!: FormGroup;
  modalOpenAdd = false;

  submit_add() {
    console.log(this.AddForm.value)
    if (this.AddForm.invalid) {
      console.log('Formulario De Adição Invalido')
      // this.message = 'Falha ao agendar!!'
      // this.ExibirMessage(false);
      return;
    }
    console.log('Formulario De Adição Valido')
    // this.message = 'Agendado com sucesso!!'
    // this.ExibirMessage(true);
  }

  setOpenAdd(isOpen: any) {
    if (isOpen == true || isOpen == false || this.AddForm.valid && isOpen == 'submit') {
      this.modalOpenAdd = isOpen == 'submit' ? false : isOpen;
    }
    if (isOpen == true) {
      this.createFormAdd()
    }
  }

  createFormAdd() {
    this.AddForm = new FormGroup({
      idCli: new FormControl(''),
      nomeCli: new FormControl('', Validators.compose([
        Validators.maxLength(70),
        Validators.minLength(3),
        Validators.required])),
      telCli: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(15),
        Validators.required])),
      emailCli: new FormControl('', Validators.compose([
        Validators.maxLength(70),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required])),
    });
  }

  get nomeCli_add() {
    return this.AddForm.get('nomeCli')!;
  }
  get telCli_add() {
    return this.AddForm.get('telCli')!;
  }
  get emailCli_add() {
    return this.AddForm.get('emailCli')!;
  }

  ngOnInit() { }

  valorMask: any;

  mask(e: Event) {
    let target = e.target as HTMLInputElement;
    let value = target.value
    setTimeout(() => {
      var v = this.mphone(value);
      if (v != value) {
        this.valorMask = v;
        console.log(v)
      }
    }, 1);
  }

  mphone(v: any) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }

}



