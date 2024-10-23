import { Component, HostListener } from '@angular/core';
import { TecladoTentativaService } from '../../services/tecladoTentativa/teclado-tentativa.service';

@Component({
  selector: 'app-teclado',
  standalone: true,
  imports: [],
  templateUrl: './teclado.component.html',
  styleUrl: './teclado.component.css'
})
export class TecladoComponent {

  // Construtor. ==========================================================================================================================================
  constructor(private tentativa: TecladoTentativaService) {};

  // Variáveis. ==========================================================================================================================================
  letrasJaUsadas: string[] = [];
  tentativa_service: string[] = [];

  // Testes para mapear teclado.
  teclaPressionada: string = '';
  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    this.teclaPressionada = event.key; // Captura a tecla pressionada
    console.log('Tecla pressionada:', this.teclaPressionada);
  };

  // Função para ao clicar enter, recuperar a tentativa do service, e assim modificar a cor das teclas.
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterPress(event: KeyboardEvent) {
    // Recuperando a tentativa armazenada no service.
    this.tentativa_service = this.tentativa.getTentativa();
    console.log("Tentativa de resposta: " , this.tentativa.getTentativa() );
  };
}
