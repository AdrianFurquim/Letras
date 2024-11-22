import { Component, HostListener, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LinhasComponent } from './components/linhas/linhas.component';
import { HeaderComponent } from './components/header/header.component';
import { TecladoComponent } from './components/teclado/teclado.component';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NgIf } from '@angular/common';

import { PalavrasService } from './services/palavras.service';
import { TecladoTentativaService } from './services/tecladoTentativa/teclado-tentativa.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LinhasComponent, HeaderComponent, TecladoComponent, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Construtor ===================================================================================================================================================
  constructor(private palavrasServices: PalavrasService, private router: Router, private route: ActivatedRoute, private tentativa: TecladoTentativaService) { }
  
  // Inicalizando variaveis =======================================================================================================================================

  // Nome Proveniente do Services.
  palavraCorreta: string = "";
  // String da tentativa que veio proviniente do service.
  tentativa_service_string: string = "";
  // Ajuda a definir se todas as 7 linhas já foram preenchidas.
  qntCompleto: number = 0;
  // Localização da pagina do usuário.
  isSobrePage: boolean = false;
  // Ajuda a mostrar a resposta ao completar todas as tentativas.
  isResposta: boolean = false;
  // Define se a liberação da tentariva linha por linha.
  linhaTentativa: boolean[] = [false, true, true, true, true, true, true];
  // Define se a linha já esta completa ou não.
  linhaCompleta: boolean[] = [false, false, false, false, false, false, false];

  // Funções =======================================================================================================================================================

  // Ao iniciar a página, já obtemos tanto uma palavra, quanto se estamos em Sobre ou no Novo Jogo.
  ngOnInit(): void {
    // Ao iniciar a página, já pega uma palavra aleatória do service.
    this.palavraCorreta = this.palavrasServices.getAleatorioNome();

    // Ao iniciar a página, verificamos se estamos em Sobre ou no Novo Jogo.
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isSobrePage = event.url === '/sobre';
    });
  }

  // Ao clicar no enter, executa a mudança de linha.
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterPress(event: KeyboardEvent) {    

  }
  
  // Realiza a liberação das linhas para tentativas.
  liberaLinha() {
    // For para verificar todo o array de completo.
    for (let index = 0; index < this.linhaCompleta.length; index++) {
      // Verificando se a linha foi completa.
      if (this.linhaCompleta[index] == true){
        // Verificando se a próxima tentativa ainda não foi utilizada.
        if (this.linhaTentativa[index + 1] = true) {
          // Libera a próxima linha de tentativa.
          this.linhaTentativa[index + 1] = false;
        }
      }
    }

    // Pegando tentativa do usuário direto do service.
    this.tentativa_service_string = this.tentativa.getTentativa().join("");

    // Verifica se a tentativa for igual a palavra aleatória.
    if(this.palavraCorreta == this.tentativa_service_string){
      // Se sim, mostra a resposta correta. e encerra o jogo
      this.isResposta = true;
      // Laço de repetição para retirar as tentativas restantes.
      for (let index = 0; index < this.linhaCompleta.length; index++) {
        this.linhaTentativa[index] = true;
      }
    }
  }
  
  // Função para autalizar as linhas que já foram feita as tentativas.
  atualizarCompleto(index: number, novoValor: boolean) {
    // Variáveis.
    this.linhaCompleta[index] = novoValor;
    this.qntCompleto = 0;

    // For para verificar todo o array de completo.
    for (let index = 0; index < this.linhaCompleta.length; index++) {
      // Caso o completo[index] seja verdadeiro, soma em qntCompleto.
      if (this.linhaCompleta[index] == true){
        this.qntCompleto++;
      }
    }

    // Verifica se todos as sete linhas foram feitas tentativas.
    if(this.qntCompleto == 7){
      // Se sim, mostra a resposta correta.
      this.isResposta = true;
    }else{
      // Caso contrário, zera qntCompleto para próxima verificação.
      this.qntCompleto = 0
    }

    // Função para liberar a próxima linha de tentativa caso não seja a ultima.
    this.liberaLinha();
  }

  // Get para a palavra correta.
  getPalavraCorreta(){
    return this.palavraCorreta;
  }

}
