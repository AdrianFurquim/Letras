import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LinhasComponent } from './components/linhas/linhas.component';

import { PalavrasService } from './services/palavras.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LinhasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  // Construtor para service.
  constructor(private palavrasServices: PalavrasService) { }

  // Inicalizando variaveis de respostas e as letras não concatenadas dela.
  nomeAleatorio: string = "";
  letras: string[] = [];

  // Ao iniciar a página já pega uma palavra aleatória do service.
  ngOnInit(): void {
    this.nomeAleatorio = this.palavrasServices.getAleatorioNome();
    this.letras = this.palavrasServices.getSeparaLetras();
  }

  // Get para a palavra correta.
  getPalavraCorreta(){
    return this.nomeAleatorio
  }



}
