import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PalavrasService } from '../../services/palavras.service';
import { NgStyle } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-linhas',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './linhas.component.html',
  styleUrls: ['./linhas.component.css']
})
export class LinhasComponent {

  // Construtor. 
  constructor(private palavrasServices: PalavrasService, private palavraCorreta: AppComponent) { };

  // Variaveis.
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

  // Função para corrigir as posições das letras.
  corrigirLetra(resposta: string[]){
    // For para verificar se a letra esta no lugar correto.
    for (let i = 0; i < this.letras_correto.length; i++) {
      if(resposta[i].toUpperCase() == this.letras_correto[i].toUpperCase()){
        this.background_letra[i] = "green";
      }else{
        // For para verificar se a letra pelo menos existe na palavra.
        for (let j = 0; j < this.letras_correto.length; j++) {
          if (resposta[j].toUpperCase() == this.letras_correto[i].toUpperCase()) {
            this.background_letra[j] = "yellow";
          }else{
          }
        }
      }
    }
  }

  // Função para pegar os valores e corrigir posições.
  mostraResposta() {
    const letra1Value = this.letra1Input.nativeElement.value;
    const letra2Value = this.letra2Input.nativeElement.value;
    const letra3Value = this.letra3Input.nativeElement.value;
    const letra4Value = this.letra4Input.nativeElement.value;
    const letra5Value = this.letra5Input.nativeElement.value;
    const letra6Value = this.letra6Input.nativeElement.value;

    const resposta: string[] = [letra1Value, letra2Value, letra3Value, letra4Value, letra5Value, letra6Value];
    
    this.desabilitarInputs = true;

    this.corrigirLetra(resposta);
  }

  // Ao iniciar o component já fornece a palavra escolhida da vez.
  ngOnInit(): void {
    this.nomeAleatorio_service = this.palavraCorreta.getPalavraCorreta();
    this.letras_correto = [this.nomeAleatorio_service[0], this.nomeAleatorio_service[1], this.nomeAleatorio_service[2], 
                    this.nomeAleatorio_service[3], this.nomeAleatorio_service[4], this.nomeAleatorio_service[5]];
  }
}