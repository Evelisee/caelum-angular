import { Component, OnInit } from '@angular/core';
import { FotoService } from '../service/foto.service';
import { Foto } from '../foto/foto';

@Component({
  selector: 'caelumpic-listagem',
  templateUrl: './listagem.component.html',
  styles: []
})
export class ListagemComponent  {
  listaFotos: Foto[] = [];
  title = 'Caelum Pic';

  constructor(
    private fotoService: FotoService
  ){
    this.fotoService.listar().subscribe(resp => {
      this.listaFotos = resp;
    })
  }
  

  excluir(fotoDeletada : Foto){
    this.fotoService.apagar(fotoDeletada).subscribe(resp => {
      //this.listaFotos.splice(index, 1);
      this.listaFotos = this.listaFotos.filter(f => f._id !== fotoDeletada._id);
    });
  }
}
