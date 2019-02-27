const grafo: number[][] =   [[ 0, 1, 1, 0, 0, 0, 0, 0],
                            [ 1, 0, 1, 0, 0, 0, 0, 0],
                            [ 1, 1, 0, 1, 1, 1, 0, 0],
                            [ 0, 0, 1, 0, 1, 1, 1, 0],
                            [ 0, 0, 1, 1, 0, 1, 0, 0],
                            [ 0, 0, 1, 1, 1, 0, 0, 0],
                            [ 0, 0, 0, 1, 0, 0, 0, 1],
                            [ 0, 0, 0, 0, 0, 0, 1, 0]]

const v: number = 2; // Contando a partir do '0', 'c' é representado por 2.

// begin

const vetorDeZeros: number[] = []
for(let i = 0; grafo[0].length; i++){ 
    vetorDeZeros[i] = 0;
}


function isClique(subgrafo: number[]): boolean{
    let resposta: boolean = true

    for(let i: number = 0; i < subgrafo.length; i++){
        if(i == 1){
            for(let j: number = 0; j < subgrafo.length; j++){
                if( (i != j && subgrafo[j] == 1) && (grafo[i][j] == 0) )
                    resposta = false   
            }
        }
    }
    return resposta
}

function findLocalCliques(){}

function uniteCliques(vetorZerado: number[], ...cliques: number[][]): number[]{
    // o vetor abaixo deve começar zerado. Deve-se incrementar um nele onde nos outros já existe.
    let unitedClique: number[] = vetorDeZeros.slice() // Por baixo dos panos é uma iteração. Gambiarra para evitar ficar escrevendo for. Acaba copiando o mesmo array de antes, porém não a referência e sim os valores.
   
    let posicao: number = 0
    while( cliques[posicao] != undefined){ // "Enquanto houver um clique no vetor de cliques..."
        for(let i: number = 0; i < cliques[i].length; i++)
            if( cliques[i][posicao] === 1)
                unitedClique[posicao] = cliques[i][posicao]    
    }

    return unitedClique
}

function findMaiorCliqueCom(v: number): number[]{
    let maiorClique: number[] = vetorDeZeros.slice()
    maiorClique[v] = 1;

    let cliquesProximos: number[][]
    for(let i: number = 0; i < grafo.length; i++){
        for(let j: number = 0; j < grafo[i].length; j++){
            cliquesProximos[i][j] = 0
        }
    }

    for(let posCliqueProximo: number; posCliqueProximo < grafo[0].length; posCliqueProximo++){ // percorrendo cada posicao da matriz de "cliquesProximos". Esse length representa qualuqer tamanho de vetor, dentro da matriz "grafo"
        let j: number // esta é a posição "compartilhada", usada no vetor da posição "v" do grafo, e em cada vetor de "cliquesProximos"
        while( cliquesProximos[posCliqueProximo][v] == 0 ){ // Esta comparação vale, porque só receberá "1", quando achar um "1" em "grafo", na posição de "v".
            if( grafo[v][j] == 1){
                cliquesProximos[posCliqueProximo][j] = 1
                cliquesProximos[posCliqueProximo][v] = 1
            }
        } 
    }

    //let j: number; j < cliquesProximos[i].length; j++

    return  maiorClique
}