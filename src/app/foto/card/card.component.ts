import { Component, Input } from "@angular/core";
import { Foto } from "../foto";

@Component({
    selector: 'card',
    templateUrl: './card.component.html'
})
export class CardComponent{
    @Input('dados') foto:Foto;
}