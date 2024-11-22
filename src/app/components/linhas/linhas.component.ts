import { Component, ViewChild, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
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
  constructor(private tentativa: TecladoTentativaService, private palavraCorreta: AppComponent, private palavraService: PalavrasService) { };

  // Variaveis ===========================================================================================================================================

  // Resposta correta do service.
  palavra_correto: string = "";
  // Letras da resposta correta do service.
  letras_correto: string[] = [];
  
  // Linhas tem que ter um ID.
  @Input() id!: number;
  // Linhas tem que ter um numero da tentativa.
  @Input() Ltentativa!: boolean;
  // Linhas tem que verificar se a linha foi completa.
  @Input() completo!: boolean;

  // Output para fazer modificação no componente pai.
  @Output() completoChange = new EventEmitter<boolean>();

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
    this.palavra_correto = this.palavraCorreta.getPalavraCorreta();
    this.letras_correto = [this.palavra_correto[0], this.palavra_correto[1], this.palavra_correto[2], 
                    this.palavra_correto[3], this.palavra_correto[4], this.palavra_correto[5]];
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

    // Juntando a resposta em uma palavra completa.
    let respostaCompleta = resposta.join('');
    // Verificando se a palavra digitada ao menos existe no array de dados.
    if (this.palavraService.getPalavra(respostaCompleta) == true) {

      // Caso exista - Verifica quantas letras foram preenchidas (não são strings vazias).
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
        this.Ltentativa = true;
        // Atualiza a tentativa para fazer a modificação na cor do teclado.
        this.atualizarTentativa(resposta);
      } else {
      }
    }else{
      // Caso não exista notifica no console por agora.
      console.log("Esta palavra não foi reconhecida");
    }
  
  };

  // Função para mandar a tentativa para fazer a modificação na cor do teclado.
  atualizarTentativa(novaTentativa: string[]) {
    this.tentativa.atualizarTentativa(novaTentativa);
    this.completo = true;

    // Emite o evento para o pai quando completo muda para true
    this.completoChange.emit(this.completo);
  };

  // Função para ao inserir uma letra no input, passa para o próximo input.
  moverProximoInput(atualInput: HTMLInputElement, proximoInput: HTMLInputElement) {
    // Move o foco para o próximo input caso o usuário insira uma letra no campo atual.
    if (atualInput.value.length === 1) {
      proximoInput.focus();
    }
  };

  // Função para ao apagar uma letra no input, passar ou voltar para o input anterior.
  moverAnteriorInput(event: KeyboardEvent, anteriorInput: HTMLInputElement | null, atualInput: HTMLInputElement, proximoInput: HTMLInputElement | null) {
    // Move o foco para o input anterior se "Backspace" for pressionado e o campo atual estiver vazio.
    if (event.key === 'Backspace' && atualInput.value.length === 0 && anteriorInput) {
      anteriorInput.focus();
    } 
    // Caso anterior seja negativo, verfica se "Backspace" foi pressionado, se o campo atual estiver preenchido, apaga o valor atual.
    else if( event.key === 'Backspace' && atualInput.value.length === 1){
      atualInput.value = '';
    }
    // Move o Foco para o input anterior se "ArrowLeft" for pressionado.
    else if (event.key === 'ArrowLeft' && anteriorInput) {
      anteriorInput.focus(); 
    }
    // Move o Foco para o próximo input se "ArrowRight" for pressionado.
    else if (event.key === 'ArrowRight' && proximoInput ){
      proximoInput.focus();
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