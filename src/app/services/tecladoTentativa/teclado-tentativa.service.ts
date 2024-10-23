import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecladoTentativaService {

  // Construtor ===================================================================================================================
  constructor() { }

  // Armazenando uma variável com ajuda do Behavior Subjetc.
  private tentativaReposta: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);  
  tentativa$ = this.tentativaReposta.asObservable();

  // Função para atualizar a tentativa.
  atualizarTentativa(novoValor: string[]) {
    this.tentativaReposta.next(novoValor);
  }

  // Função para retornar a tentativa.
  getTentativa(){
    return this.tentativaReposta.getValue();
  }

}
