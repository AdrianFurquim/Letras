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

  // Construtor.
  constructor(private palavrasServices: PalavrasService, private router: Router, private route: ActivatedRoute, private tentativa: TecladoTentativaService) { }
  
  // Inicalizando variaveis de respostas e as letras não concatenadas dela.
  nomeAleatorio: string = "";
  letras: string[] = [];
  isSobrePage = false;
  linhaTentativa: boolean[] = [false, true, true, true, true, true, true];
  numeroLinha: number[] = [1, 2, 3, 4, 5, 6, 7];
  


  // Ao iniciar a página, já obtemos tanto uma palavra, quanto se estamos em Sobre ou no Novo Jogo.
  ngOnInit(): void {
    // Ao iniciar a página, já pega uma palavra aleatória do service.
    this.nomeAleatorio = this.palavrasServices.getAleatorioNome();
    this.letras = this.palavrasServices.getSeparaLetras();

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
    this.correcaoLinha();
  }
  
  correcaoLinha() {
    // Verifica a primeira linha e bloqueia/desbloqueia a próxima.
    for (let i = 0; i < this.linhaTentativa.length; i++) {
      if (this.linhaTentativa[i] === true) {
        this.linhaTentativa[i] = false;
        this.linhaTentativa[i + 1] = true;
        break;
      }
    }
    
    // Cria uma nova referência para forçar a detecção de mudança
    this.linhaTentativa = [...this.linhaTentativa];
  }

  // Get para a palavra correta.
  getPalavraCorreta(){
    return this.nomeAleatorio;
  }

  // Get para a linha.
  getLinhaTentativa(index: number){
    return this.linhaTentativa[this.numeroLinha[index]];
  }

}
