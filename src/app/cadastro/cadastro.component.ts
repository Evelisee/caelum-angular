import { Component, OnInit } from '@angular/core';
import { Foto } from '../foto/foto';
import { FotoService } from '../service/foto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'caelumpic-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new Foto();
  formCadastro: FormGroup;
  titulo = new FormControl('', 
    Validators.compose([Validators.required, Validators.minLength(2)])
  );
  url = new FormControl('', Validators.required);

  constructor(
    private fotoService : FotoService,
    private roteador: Router,
    private rotaAtivada: ActivatedRoute,
    private formBuilder: FormBuilder
  ){}
  
  ngOnInit() {

    this.formCadastro = this.formBuilder.group({
      titulo:  this.titulo,
      url: this.url,
      descricao: ['', Validators.required]
    })


    let fotoId = this.rotaAtivada.snapshot.params.id;
    if(fotoId){
      this.fotoService.buscar(fotoId).subscribe(
        (resp) => {
          this.foto = resp;
          this.formCadastro.patchValue(resp);
        }
      );
    }
  }


  cadastrarFoto(){
    this.foto = {...this.foto, ...this.formCadastro.value };
    
    if(this.foto._id){
      this.fotoService.editar(this.foto).subscribe(resp => {
        this.roteador.navigate(['']);
      });
    } else {
      this.fotoService.cadastrar(this.foto).subscribe(
        (resp) => {
          this.roteador.navigate(['']);
        },
        erro => {
          console.log('deu erro');
        }
      );
    }
  }
}
