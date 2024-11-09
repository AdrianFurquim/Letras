import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PalavrasService {

  // Construtor.
  constructor() { }

  // Local temporario para armazenar dados.
  palavras: string[] = [
    "exceto", "cinico", "idoneo", "ambito", "nescio", "mister", "indole", "vereda", "apogeu", "inocuo", "defina", "convem", "utopia", "escopo", "sadico", "enfase", 
    "idiota", "merito", "alusao", "casual", "hostil", "anseio", "cetico", "legado", "gentil", "hetero", "pressa", "alheio", "paixao", "nocivo", "cliche", "infame", 
    "eximio", "afavel", "dadiva", "adorno", "tambem", "extase", "larica", "sobrio", "aferir", "astuto", "otario", "adesao", "sessao", "solene", "gloria", "limiar", 
    "julgar", "embora", "ensejo", "labaro", "habito", "apreco", "formal", "impeto", "eficaz", "outrem", "nuance", "dispor", "jubilo", "perene", "ocioso", "alento", 
    "difuso", "escusa", "cessao", "faccao", "ilacao", "exilio", "ludico", "abster", "objeto", "acesso", "alcada", "desejo", "mulher", "acento", "axioma", "buscar", 
    "tacito", "etereo", "sancao", "quando", "mazela", "isento", "cortes", "cobica", "penhor", "sisudo", "eximir", "avidez", "prazer", "receio", "vulgar", "remoto", 
    "sempre", "fatico", "nomade", "adagio", "rotina", "insano", "ciente", "asseio", "esmero", "diante", "comico", "duvida", "prover", "linear", "grande", "rancor", 
    "lograr", "alocar", "altivo", "coesao", "crenca", "amiude", "esteio", "lirico", "ironia", "enxuto", "faceta", "vedado", "origem", "melhor", "formos", "biblia", 
    "perfil", "inveja", "abjeto", "belico", "aderir", "danado", "apatia", "padrao", "idonea", "cingir", "passar", "aludir", "porfia", "cessar", "beleza", "tacita", 
    "adepto", "pensar", "inerte", "espaco", "credor", "mencao", "desdem", "emanar", "herege", "coagir", "metodo", "servir", "venham", "enigma", "trouxa", "agonia", 
    "avante", "bordao", "inutil", "nativo", "arauto", "lucido", "arguir", "decoro", "estima", "lacuna", "brando", "adorar", "pessoa", "franco", "limite", "viagem", 
    "maroto", "sereno", "esboco", "licito", "lavrar", "anciao", "colher", "engodo", "trazer", "apenas", "emocao", "estado", "colera", "iniquo", "genero", "sovina", 
    "florao", "tirano", "conter", "agucar", "deixar", "encher", "inibir", "seccao", "praxis", "senhor", "dotado", "sudito", "ajudar", "topico", "pleito", "genese", 
    "clamar", "proeza", "amanha", "fogosa", "martir", "devido", "teoria", "frisar", "sentir", "prisma", "alarde", "esnobe", "diccao", "feicao", "triste", "jamais", 
    "surtar", "emitir", "piegas", "acordo", "exalar", "forjar", "frugal", "vermos", "lexico", "dilema", "falico", "satira", "tornar", "talvez", "sabido", "quanto", 
    "infimo", "inepto", "exiguo", "suprir", "cismar", "aduzir", "missao", "provem", "idilio", "semear", "pseudo", "divino", "almeja", "seguir", "abismo", "deriva", 
    "coacao", "triade", "polido", "funcao", "evocar", "subito", "social", "condiz", "galgar", "querer", "patria", "aporte", "depois", "bencao", "omitir", "modelo", 
    "patife", "demais", "cacula", "lastro", "bonito", "servil", "tipico", "sermos", "apesar", "aurora", "elidir", "pueril", "chapeu", "escuso", "obtuso", "comigo", 
    "alguns", "plebeu", "esvair", "mitico", "pudico", "insumo", "indice", "perdao", "calido", "arrimo", "imagem", "cerrar", "sinico", "tensao", "ilusao", "compor", 
    "manter", "onerar", "matriz", "inicio", "xingar", "tratar", "enseja", "fulgor", "vetado", "patroa", "trouxe", "rapido", "evento", "varias", "alguem", "cativo", 
    "ousado", "devoto", "crivel", "fraude", "estara", "timido", "agouro", "remota", "escola", "coibir", "cassar", "fertil", "cuidar", "estilo", "meados", "oficio", 
    "macula", "celere", "evasao", "expert", "labuta", "estais", "torpor", "erigir", "delito", "voltar", "ilidir", "honrar", "peleja", "sairam", "afinco", "flanco", 
    "viavel", "expiar", "ceifar", "acervo", "gratis", "ferias", "toxico", "propor", "brasil", "loquaz", "gestao", "motriz", "intimo", "porvir", "virgem", "ladino", 
    "avesso", "status", "condao", "obstar", "embate", "cinica", "exacao", "prezar", "elogio", "efeito", "feitio", "motivo", "pacato", "lingua", "termos", "maxima", 
    "dentre", "helena", "chegar", "regaco", "matuto", "acusar", "chiste", "tolher", "jovial", "poente", "tirica", "alguma", "humano", "exigir", "sequer", "amavel", 
    "fabula", "eterno", "cidade", "lesado", "futuro", "enredo", "rapina", "agente", "alegre", "ofensa", "acerca", "previa", "adendo", "erario", "contem", "pranto", 
    "acatar", "destra", "oracao", "quiser", "fastio", "umbral", "arguto", "safada", "frouxo", "bebado", "abonar", "contra", "metido", "colhao", "urbano", "fulcro", 
    "nitido", "inocua", "colega", "fadado", "oposto", "abaixo", "amante", "evitar", "charco", "gaiato", "diacho", "descer", "possam", "munido", "animal", "afetar", 
    "babaca", "dormir", "covado", "lisura", "jardim", "despir", "caucao", "doenca", "trevas", "jocoso", "regido", "entao", "enviar", "conciso", "ativar", "alcada", 
    "vulgar", "varios", "musica", "letras"
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

  // Função para retornar se a palavra existe no array.
  getPalavra(palavra: string) {
    return this.palavras.find(p => p === palavra) !== undefined;
  }
  
}
