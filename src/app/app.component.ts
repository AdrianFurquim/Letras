import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LinhasComponent } from './components/linhas/linhas.component';
import { HeaderComponent } from './components/header/header.component';
import { TecladoComponent } from './components/teclado/teclado.component';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NgIf } from '@angular/common';

import { PalavrasService } from './services/palavras.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LinhasComponent, HeaderComponent, TecladoComponent, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Construtor.
  constructor(private palavrasServices: PalavrasService, private router: Router, private route: ActivatedRoute) { }
  
  // Inicalizando variaveis de respostas e as letras não concatenadas dela.
  nomeAleatorio: string = "";
  letras: string[] = [];
  isSobrePage = false;

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

  // Get para a palavra correta.
  getPalavraCorreta(){
    return this.nomeAleatorio;
  }

}
