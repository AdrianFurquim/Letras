import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PalavrasService {

  // Construtor.
  constructor() { }

  // Local temporario para armazenar dados.
  palavras: string[] = [
    "exceto", "cínico", "idôneo", "âmbito", "néscio", "mister", "índole", "vereda", "apogeu", 
      "inócuo", "defina", "convém", "utopia", "escopo", "sádico", "ênfase", "idiota", "mérito", 
      "alusão", "casual", "hostil", "anseio", "cético", "legado", "gentil", "hétero", "pressa", 
      "alheio", "paixão", "nocivo", "clichê", "infame", "exímio", "afável", "dádiva", "adorno", 
      "também", "êxtase", "larica", "sóbrio", "aferir", "astuto", "otário", "adesão", "sessão", 
      "solene", "glória", "limiar", "julgar", "embora", "ensejo", "lábaro", "hábito", "apreço", 
      "formal", "ímpeto", "eficaz", "outrem", "nuance", "dispor", "júbilo", "perene", "ocioso", 
      "alento", "difuso", "escusa", "cessão", "facção", "ilação", "exílio", "lúdico", "abster", 
      "objeto", "acesso", "alçada", "desejo", "mulher", "acento", "axioma", "buscar", "tácito", 
      "etéreo", "sanção", "quando", "mazela", "isento", "cortês", "cobiça", "penhor", "sisudo", 
      "eximir", "avidez", "prazer", "receio", "vulgar", "remoto", "sempre", "fático", "nômade", 
      "adágio", "rotina", "insano", "ciente", "asseio", "esmero", "diante", "cômico", "dúvida", 
      "prover", "linear", "grande", "rancor", "lograr", "alocar", "altivo", "coesão", "crença", 
      "amiúde", "esteio", "lírico", "ironia", "enxuto", "faceta", "vedado", "origem", "melhor", 
      "formos", "bíblia", "perfil", "inveja", "abjeto", "bélico", "aderir", "danado", "apatia", 
      "padrão", "idônea", "cingir", "passar", "aludir", "porfia", "cessar", "beleza", "tácita", 
      "adepto", "pensar", "inerte", "espaço", "credor", "menção", "desdém", "emanar", "herege", 
      "coagir", "método", "servir", "venham", "enigma", "trouxa", "agonia", "avante", "bordão", 
      "inútil", "nativo", "arauto", "lúcido", "arguir", "decoro", "estima", "lacuna", "brando", 
      "adorar", "pessoa", "franco", "limite", "viagem", "maroto", "sereno", "esboço", "lícito", 
      "lavrar", "ancião", "colher", "engodo", "trazer", "apenas", "emoção", "estado", "cólera", 
      "iníquo", "gênero", "sovina", "florão", "tirano", "conter", "aguçar", "deixar", "encher", 
      "inibir", "secção", "práxis", "senhor", "dotado", "súdito", "ajudar", "tópico", "pleito", 
      "gênese", "clamar", "proeza", "amanhã", "fogosa", "mártir", "devido", "teoria", "frisar", 
      "sentir", "prisma", "alarde", "esnobe", "dicção", "feição", "triste", "jamais", "em vão", 
      "emitir", "piegas", "acordo", "exalar", "forjar", "frugal", "vermos", "léxico", "dilema", 
      "fálico", "sátira", "tornar", "talvez", "sabido", "quanto", "ínfimo", "inepto", "exíguo", 
      "suprir", "cismar", "aduzir", "missão", "provém", "idílio", "semear", "pseudo", "divino", 
      "almeja", "seguir", "abismo", "deriva", "coação", "tríade", "polido", "função", "evocar", 
      "súbito", "social", "condiz", "galgar", "querer", "pátria", "aporte", "depois", "bênção", 
      "omitir", "modelo", "patife", "demais", "caçula", "lastro", "bonito", "servil", "típico", 
      "sermos", "apesar", "aurora", "elidir", "pueril", "chapéu", "escuso", "obtuso", "comigo", 
      "alguns", "plebeu", "esvair", "mítico", "pudico", "insumo", "índice", "perdão", "cálido", 
      "arrimo", "imagem", "cerrar", "sínico", "tensão", "ilusão", "compor", "manter", "onerar", 
      "matriz", "início", "xingar", "tratar", "enseja", "fulgor", "vetado", "patroa", "trouxe", 
      "rápido", "evento", "várias", "alguém", "cativo", "ousado", "devoto", "crível", "fraude", 
      "estará", "tímido", "agouro", "remota", "escola", "coibir", "cassar", "fértil", "cuidar", 
      "estilo", "meados", "ofício", "mácula", "célere", "evasão", "expert", "labuta", "estais", 
      "torpor", "erigir", "delito", "voltar", "ilidir", "honrar", "peleja", "saíram", "afinco", 
      "flanco", "viável", "expiar", "ceifar", "acervo", "grátis", "férias", "tóxico", "propor", 
      "brasil", "loquaz", "gestão", "motriz", "íntimo", "porvir", "virgem", "ladino", "avesso", 
      "status", "condão", "obstar", "embate", "cínica", "exação", "prezar", "elogio", "efeito", 
      "feitio", "motivo", "pacato", "língua", "termos", "máxima", "dentre", "helena", "chegar", 
      "regaço", "matuto", "acusar", "chiste", "tolher", "jovial", "poente", "tiriça", "alguma", 
      "humano", "exigir", "sequer", "amável", "fábula", "eterno", "cidade", "lesado", "futuro", 
      "enredo", "rapina", "agente", "alegre", "ofensa", "acerca", "prévia", "adendo", "erário", 
      "contém", "pranto", "acatar", "destra", "oração", "quiser", "fastio", "umbral", "arguto", 
      "safada", "frouxo", "bêbado", "abonar", "contra", "metido", "colhão", "urbano", "fulcro", 
      "nítido", "inócua", "colega", "fadado", "oposto", "abaixo", "amante", "evitar", "charco", 
      "gaiato", "diacho", "descer", "possam", "munido", "animal", "afetar", "babaca", "dormir", 
      "côvado", "lisura", "jardim", "despir", "caução", "doença", "trevas", "jocoso", "regido", 
      "ambas", "então", "enviar", "conciso", "ativo", "ontem", "alçada", "vulgar", "vários", 
      "mistura", "armazen", "músicas"
  ];
  
  // Variáveis.
  nomeAleatorio: string = '';

  // Função para retornar uma palavra aleatória dos dados.
  getAleatorioNome(){
    // Pegando uma palavra aleatória dos dados.
    const indiceAleatorio = Math.floor(Math.random() * this.palavras.length);
    this.nomeAleatorio = this.palavras[indiceAleatorio];
    return this.nomeAleatorio;
  }

  // Função para retornar um array com as letras da palavra aleatória escolhida.
  getSeparaLetras(){
    const letras: string[] = [this.nomeAleatorio[0], this.nomeAleatorio[1], this.nomeAleatorio[2], 
                   this.nomeAleatorio[3], this.nomeAleatorio[4], this.nomeAleatorio[5]];
    return letras;
  }

}
