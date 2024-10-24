import { Component, HostListener } from '@angular/core';
import { TecladoTentativaService } from '../../services/tecladoTentativa/teclado-tentativa.service';
import { NgStyle } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-teclado',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './teclado.component.html',
  styleUrl: './teclado.component.css'
})
export class TecladoComponent {

  // Construtor. ==========================================================================================================================================
  constructor(private tentativa: TecladoTentativaService, private palavraCorreta: AppComponent) {};
  
  // Variáveis. ==========================================================================================================================================
  letrasJaUsadas: string[] = [];
  tentativa_service: string[] = [];
  tecla = document.getElementsByClassName('tecla');
  nomeAleatorio_service: string = "";
  letras_correto: string[] = [];
  background_tecla: string[] =  [];


  ngOnInit(): void {
    this.nomeAleatorio_service = this.palavraCorreta.getPalavraCorreta();
    this.letras_correto = [this.nomeAleatorio_service[0], this.nomeAleatorio_service[1], this.nomeAleatorio_service[2], 
                    this.nomeAleatorio_service[3], this.nomeAleatorio_service[4], this.nomeAleatorio_service[5]];
    for (let i = 0; i <= 25; i++) {
      this.background_tecla.push("rgb(54, 54, 54)");
    }
  };

  // Testes para mapear teclado.
  teclaPressionada: string = '';
  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    this.teclaPressionada = event.key; // Captura a tecla pressionada
    console.log('Tecla pressionada:', this.tecla[25].innerHTML);
  };

  // Função para ao clicar enter, recuperar a tentativa do service, e assim modificar a cor das teclas.
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterPress(event: KeyboardEvent) {
    // Recuperando a tentativa armazenada no service.
    this.tentativa_service = this.tentativa.getTentativa();
    // console.log("Tentativa de resposta: " , this.tentativa_service[0] );

    // For para rodar o array das teclas.
    for (let i = 0; i < this.tecla.length; i++) {

      // For para rodar o array das letras compostas pela tentativa.
      for (let j = 0; j < this.tentativa_service.length; j++) {

        // If a tecla for igual a tentativa.
        if (this.tecla[i].innerHTML == this.tentativa_service[j].toUpperCase()) {

          
          // Mudando a cor para amarelo, pois já é garantido que a letra esta dentre as opções.
          this.background_tecla[i] = "rgba(255, 255, 0, 0.74)";

          // For para rodar o array das letras corretas da resposta.
          for (let k = 0; k < this.letras_correto.length; k++) {
            
            // If para se a tentativa do usuário bate com a letra correta.
            if(this.tentativa_service[k].toUpperCase() == this.letras_correto[k].toUpperCase()){

              // If para verificar se a letra que deve ser mudada está correta com a tentativa.
              if (this.tecla[i].innerHTML == this.tentativa_service[k].toUpperCase()) {
                this.background_tecla[i] = "green"
              }
            }
          }
        }
      }
    }
  };

}
