import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PalavrasService } from '../../services/palavras.service';
import { NgStyle } from '@angular/common';
import { AppComponent } from '../../app.component';
import { TecladoTentativaService } from '../../services/tecladoTentativa/teclado-tentativa.service';

@Component({
  selector: 'app-linhas',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './linhas.component.html',
  styleUrls: ['./linhas.component.css']
})
export class LinhasComponent {

  // Construtor. ==========================================================================================================================================
  constructor(private tentativa: TecladoTentativaService, private palavraCorreta: AppComponent) { };

  // Variaveis ============================================================================================================================================
  nomeAleatorio_service: string = "";
  letras_correto: string[] = [];
  desabilitarInputs: boolean = false;

  // Pegando os valores dos inputs.
  @ViewChild('letra1Input', { static: false }) letra1Input!: ElementRef;
  @ViewChild('letra2Input', { static: false }) letra2Input!: ElementRef;
  @ViewChild('letra3Input', { static: false }) letra3Input!: ElementRef;
  @ViewChild('letra4Input', { static: false }) letra4Input!: ElementRef;
  @ViewChild('letra5Input', { static: false }) letra5Input!: ElementRef;
  @ViewChild('letra6Input', { static: false }) letra6Input!: ElementRef;

  // Background dos inputs para correção de letras.
  background_letra: string[] =  ["rgb(54, 54, 54)", "rgb(54, 54, 54)", "rgb(54, 54, 54)", "rgb(54, 54, 54)", "rgb(54, 54, 54)", "rgb(54, 54, 54)"];

  // Funções. =============================================================================================================================================
  
  // Ao iniciar o component já fornece a palavra escolhida da vez.
  ngOnInit(): void {
    this.nomeAleatorio_service = this.palavraCorreta.getPalavraCorreta();
    this.letras_correto = [this.nomeAleatorio_service[0], this.nomeAleatorio_service[1], this.nomeAleatorio_service[2], 
                    this.nomeAleatorio_service[3], this.nomeAleatorio_service[4], this.nomeAleatorio_service[5]];
  };

  // Função para quando teclar 'Enter' irá fazer a correção da tentativa.
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterPress(event: KeyboardEvent) {
    this.mostraResposta();
  };

  // Função para correção da tentativa.
  corrigirLetra(resposta: string[]) {
    // Variável para verificar se foi preenchido todos as 6 letras.
    let quantLetras = 0;
  
    // Verifica quantas letras foram preenchidas (não são strings vazias).
    for (let index = 0; index < resposta.length; index++) {
      if (resposta[index] !== '') {
        quantLetras++;
      }
    };
    
    // Verifica se todos os 6 inputs estão preenchidos.
    if (quantLetras === 6) {

      // For para verificar se a letra está no lugar correto, caso correto, transforma em verde.
      for (let i = 0; i < this.letras_correto.length; i++) {

        // Verifica se a letra da tentativa esta alinhada com a correta.
        if (resposta[i].toUpperCase() == this.letras_correto[i].toUpperCase()) {
          this.background_letra[i] = "rgba(0, 255, 0, 0.808)";
        } else {

          // For para verificar se a letra pelo menos existe na palavra, caso a letra exista, mas lugar errado, transforma em amarelo.
          for (let j = 0; j < this.letras_correto.length; j++) {

            // Verifica se a letra da tentativa esta ao menos na palavra correta.
            if (resposta[j].toUpperCase() == this.letras_correto[i].toUpperCase()) {
              this.background_letra[j] = "rgba(255, 255, 0, 0.74)";
            }
          }
        }
      }
      // Desabilita a modificação dos inputs com tentativas já concluídas.
      this.desabilitarInputs = true;
      // Atualiza a tentativa para fazer a modificação na cor do teclado.
      this.atualizarTentativa(resposta);
    } else {
    }
  };

  // Função para mandar a tentativa para fazer a modificação na cor do teclado.
  atualizarTentativa(novaTentativa: string[]) {
    this.tentativa.atualizarTentativa(novaTentativa);
  };

  // Função para ao inserir uma letra no input, passa para o próximo input.
  moverProximoInput(atualInput: HTMLInputElement, proximoInput: HTMLInputElement) {
    // Move o foco para o próximo input caso o usuário insira uma letra no campo atual.
    if (atualInput.value.length === 1) {
      proximoInput.focus();
    }
  };

  // Função para ao apagar uma letra no input, passa para o input anterior.
  moverAnteriorInput(event: KeyboardEvent, anteriorInput: HTMLInputElement | null, atualInput: HTMLInputElement) {
    // Move o foco para o input anterior se "Backspace" for pressionado e o campo atual estiver vazio.
    if (event.key === 'Backspace' && atualInput.value.length === 0 && anteriorInput) {
      anteriorInput.focus(); 
    }
  };

  // Função para pegar os valores e corrigir posições.
  mostraResposta() {
    // criando array com os valores dos inputs.
    const resposta: string[] = [this.letra1Input.nativeElement.value, this.letra2Input.nativeElement.value, this.letra3Input.nativeElement.value, 
      this.letra4Input.nativeElement.value, this.letra5Input.nativeElement.value, this.letra6Input.nativeElement.value];

    // Rodando a função de corrigir a tentativa.
    this.corrigirLetra(resposta);
  };

}