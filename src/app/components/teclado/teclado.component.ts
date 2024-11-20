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
  // Array da tentativa que veio proviniente do service.
  tentativa_service: string[] = [];
  // Letras do teclado.
  teclas: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
  // Palavra da resposta correta.
  nomeAleatorio_service: string = "";
  // Letas da palavra correto.
  letras_correto: string[] = [];
  // Opção para mudar o backround das teclas.
  background_tecla: string[] =  [];

  ngOnInit(): void {
    this.nomeAleatorio_service = this.palavraCorreta.getPalavraCorreta();
    this.letras_correto = [this.nomeAleatorio_service[0], this.nomeAleatorio_service[1], this.nomeAleatorio_service[2], 
                    this.nomeAleatorio_service[3], this.nomeAleatorio_service[4], this.nomeAleatorio_service[5]];
    for (let i = 0; i <= 25; i++) {
      this.background_tecla.push("rgb(54, 54, 54)");
    }
  };

  // Função para ao clicar enter, recuperar a tentativa do service, e assim modificar a cor das teclas.
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterPress(event: KeyboardEvent) {
    // Recuperando a tentativa armazenada no service.
    this.tentativa_service = this.tentativa.getTentativa();
    // console.log("Tentativa de resposta: " , this.tentativa_service[0] );
    
    // For para rodar o array das teclas.
    for (let i = 0; i < this.teclas.length; i++) {
      
      // For para rodar o array das letras compostas pela tentativa.
      for (let j = 0; j < this.tentativa_service.length; j++) {
        
        // If a tecla for igual a tentativa.
        if (this.teclas[i] == this.tentativa_service[j].toUpperCase()) {

          // Garante que independentemente a letra será retirada caso não passe nos próximos IFs.
          this.background_tecla[i] = "black";
          
          // For para rodar o array das letras corretas da resposta.
          for (let k = 0; k < this.letras_correto.length; k++) {
            
            // If para se a tentativa do usuário bate com a letra correta.
            if (this.tentativa_service[j].toUpperCase() === this.letras_correto[j].toUpperCase()) {

              // Muda a cor e acaba o loop da letra.
              this.background_tecla[i] = "green";
              break;

            }else{
              // IFs para verificação de se a letra existe mas está na possição errada.
              if (this.tentativa_service[k].toUpperCase() === this.letras_correto[k].toUpperCase() && j != k ) {
              }else{
                if (this.tentativa_service[k].toUpperCase() !== this.letras_correto[k].toUpperCase() && j != k ) {
                  if (this.tentativa_service[j].toUpperCase() === this.letras_correto[k].toUpperCase() && j != k ) {

                    // Muda a cor e acaba o loop da letra.
                    this.background_tecla[i] = "rgba(255, 255, 0, 0.74)";
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
  };

}
