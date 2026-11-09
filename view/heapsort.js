/**
 * heapsort.js
 * Gerador de passos (Timeline / Event Recorder) fiel ao algoritmo em C (heapsortcpp.c)
 * Permite navegação passo a passo (Next, Prev, Play, Pause, Jump).
 */

class HeapsortSimulator {
  constructor(initialArray) {
    this.initialArray = [...initialArray];
    this.steps = [];
    this.comparisonsCount = 0;
    this.swapsCount = 0;
    this.generateSteps();
  }

  generateSteps() {
    this.steps = [];
    this.comparisonsCount = 0;
    this.swapsCount = 0;

    const v = [...this.initialArray];
    let tamanhoHeap = v.length;
    let pai = Math.floor((tamanhoHeap - 2) / 2);
    const sortedIndices = [];

    // Passo Inicial 0: Estado Inicial
    this.addStep({
      array: [...v],
      tamanhoHeap,
      phase: 'BUILD_HEAP',
      activeParent: null,
      activeLeft: null,
      activeRight: null,
      comparing: [],
      swapping: [],
      sortedIndices: [...sortedIndices],
      codeLine: 12,
      title: 'Início da Execução',
      explanation: `Vetor inicial com ${v.length} elementos carregado. O primeiro nó que possui filhos (último pai) é calculado pela fórmula <code>(tamanhoHeap - 2) / 2 = (${tamanhoHeap} - 2) / 2 = ${pai}</code>.`
    });

    // FASE 1: Construir MAXHEAP
    this.addStep({
      array: [...v],
      tamanhoHeap,
      phase: 'BUILD_HEAP',
      activeParent: pai,
      activeLeft: null,
      activeRight: null,
      comparing: [],
      swapping: [],
      sortedIndices: [...sortedIndices],
      codeLine: 15,
      title: 'Fase 1: Construir MAX-HEAP',
      explanation: `Iniciando o loop de baixo para cima: do último pai (índice ${pai}) até a raiz (índice 0). Cada subárvore será transformada em Max-Heap chamando <code>constroiHeap</code>.`
    });

    for (; pai >= 0; pai--) {
      this.addStep({
        array: [...v],
        tamanhoHeap,
        phase: 'BUILD_HEAP',
        activeParent: pai,
        activeLeft: null,
        activeRight: null,
        comparing: [pai],
        swapping: [],
        sortedIndices: [...sortedIndices],
        codeLine: 16,
        title: `Verificando Subárvore no Pai [${pai}]`,
        explanation: `Analisando o nó pai no índice <strong>${pai}</strong> (valor <strong>${v[pai]}</strong>). Vamos verificar se ele cumpre a propriedade de Max-Heap com seus filhos.`
      });

      this.constroiHeap(v, tamanhoHeap, pai, sortedIndices, 'BUILD_HEAP');
    }

    // Fim da Fase 1
    this.addStep({
      array: [...v],
      tamanhoHeap,
      phase: 'BUILD_HEAP',
      activeParent: 0,
      activeLeft: null,
      activeRight: null,
      comparing: [],
      swapping: [],
      sortedIndices: [...sortedIndices],
      codeLine: 18,
      title: 'MAX-HEAP Construído com Sucesso!',
      explanation: `✅ <strong>Fase 1 Concluída!</strong> A árvore agora é um MAX-HEAP perfeito. Em qualquer nó, o pai é maior ou igual aos filhos. O maior elemento absoluto de todo o vetor está na raiz: <strong>v[0] = ${v[0]}</strong>.`
    });

    // FASE 2: Swaps e reconstrução da HEAP
    this.addStep({
      array: [...v],
      tamanhoHeap,
      phase: 'SORTING',
      activeParent: null,
      activeLeft: null,
      activeRight: null,
      comparing: [],
      swapping: [],
      sortedIndices: [...sortedIndices],
      codeLine: 20,
      title: 'Fase 2: Ordenação por Extração',
      explanation: `Iniciando a ordenação: retiramos repetidamente a raiz (maior elemento da heap), trocamos com a última posição da heap, diminuímos o tamanho da heap e chamamos <code>constroiHeap</code> na raiz.`
    });

    while (tamanhoHeap > 1) {
      const lastIndex = tamanhoHeap - 1;
      const rootVal = v[0];
      const lastVal = v[lastIndex];

      // Passo antes da troca
      this.addStep({
        array: [...v],
        tamanhoHeap,
        phase: 'SORTING',
        activeParent: 0,
        activeLeft: null,
        activeRight: null,
        comparing: [0, lastIndex],
        swapping: [],
        sortedIndices: [...sortedIndices],
        codeLine: 22,
        title: `Preparando Troca: Raiz [0] ↔ Fim [${lastIndex}]`,
        explanation: `O maior valor atual (<strong>${rootVal}</strong> na raiz v[0]) será movido para sua posição final definitiva: o índice <strong>${lastIndex}</strong> (que atualmente contém <strong>${lastVal}</strong>).`
      });

      // Efetua a troca
      this.swapsCount++;
      const aux = v[0];
      v[0] = v[lastIndex];
      v[lastIndex] = aux;

      // Passo da troca realizada
      this.addStep({
        array: [...v],
        tamanhoHeap,
        phase: 'SORTING',
        activeParent: 0,
        activeLeft: null,
        activeRight: null,
        comparing: [],
        swapping: [0, lastIndex],
        sortedIndices: [...sortedIndices],
        codeLine: 24,
        title: `Swap Concluído: ${rootVal} foi para o índice ${lastIndex}`,
        explanation: `Troca realizada entre a raiz (índice 0) e o final da heap (índice ${lastIndex}). O valor <strong>${rootVal}</strong> agora está em sua posição correta e ordenada!`
      });

      // Reduz tamanhoHeap
      tamanhoHeap--;
      sortedIndices.push(lastIndex);

      this.addStep({
        array: [...v],
        tamanhoHeap,
        phase: 'SORTING',
        activeParent: 0,
        activeLeft: null,
        activeRight: null,
        comparing: [],
        swapping: [],
        sortedIndices: [...sortedIndices],
        codeLine: 25,
        title: `Tamanho do Heap Reduzido para ${tamanhoHeap}`,
        explanation: `O elemento no índice ${lastIndex} (valor <strong>${v[lastIndex]}</strong>) agora está <strong>ordenado</strong> e fora da heap. A nova raiz temporária (índice 0, valor <strong>${v[0]}</strong>) provavelmente viola o Max-Heap e precisa descer (sift-down).`
      });

      // Reconstrói a heap a partir da raiz (0)
      this.constroiHeap(v, tamanhoHeap, 0, sortedIndices, 'SORTING');
    }

    // O último elemento restante (índice 0) já é o menor e está ordenado
    sortedIndices.push(0);
    this.addStep({
      array: [...v],
      tamanhoHeap: 0,
      phase: 'FINISHED',
      activeParent: null,
      activeLeft: null,
      activeRight: null,
      comparing: [],
      swapping: [],
      sortedIndices: [...sortedIndices],
      codeLine: 30,
      title: '🎉 Vetor 100% Ordenado!',
      explanation: `O algoritmo Heapsort foi finalizado com sucesso! O vetor está perfeitamente ordenado em ordem crescente em <strong>O(n log n)</strong> com <strong>O(1)</strong> de memória extra.`
    });
  }

  constroiHeap(v, tamanhoHeap, pai, sortedIndices, phase) {
    const filhoEsq = pai * 2 + 1;
    const filhoDir = pai * 2 + 2;

    this.addStep({
      array: [...v],
      tamanhoHeap,
      phase,
      activeParent: pai,
      activeLeft: filhoEsq < tamanhoHeap ? filhoEsq : null,
      activeRight: filhoDir < tamanhoHeap ? filhoDir : null,
      comparing: [pai],
      swapping: [],
      sortedIndices: [...sortedIndices],
      codeLine: 37,
      title: `Calculando Filhos do Pai [${pai}]`,
      explanation: `Para o pai no índice <strong>${pai}</strong> (valor <strong>${v[pai]}</strong>):<br>
        • Filho Esquerdo: <code>2 × ${pai} + 1 = ${filhoEsq}</code> ${filhoEsq < tamanhoHeap ? `(valor: ${v[filhoEsq]})` : '(fora da heap)'}<br>
        • Filho Direito: <code>2 × ${pai} + 2 = ${filhoDir}</code> ${filhoDir < tamanhoHeap ? `(valor: ${v[filhoDir]})` : '(fora da heap)'}`
    });

    if (filhoDir < tamanhoHeap) {
      // Tem os dois filhos
      this.comparisonsCount += 2;
      this.addStep({
        array: [...v],
        tamanhoHeap,
        phase,
        activeParent: pai,
        activeLeft: filhoEsq,
        activeRight: filhoDir,
        comparing: [pai, filhoEsq, filhoDir],
        swapping: [],
        sortedIndices: [...sortedIndices],
        codeLine: 42,
        title: `Comparando Pai [${pai}] com Ambos os Filhos`,
        explanation: `O pai tem ambos os filhos ativos. Comparando valores:<br>
          Pai: <strong>${v[pai]}</strong> | Filho Esq [${filhoEsq}]: <strong>${v[filhoEsq]}</strong> | Filho Dir [${filhoDir}]: <strong>${v[filhoDir]}</strong>.`
      });

      if (v[filhoDir] > v[filhoEsq] && v[filhoDir] > v[pai]) {
        // Swap com filho direito
        this.swapsCount++;
        const aux = v[pai];
        v[pai] = v[filhoDir];
        v[filhoDir] = aux;

        this.addStep({
          array: [...v],
          tamanhoHeap,
          phase,
          activeParent: pai,
          activeLeft: filhoEsq,
          activeRight: filhoDir,
          comparing: [],
          swapping: [pai, filhoDir],
          sortedIndices: [...sortedIndices],
          codeLine: 44,
          title: `Swap: Pai [${pai}] ↔ Filho Direito [${filhoDir}]`,
          explanation: `O filho direito (<strong>${v[pai]}</strong>) é maior que o filho esquerdo (<strong>${v[filhoEsq]}</strong>) e maior que o pai (<strong>${aux}</strong>). Efetuando a troca!`
        });

        // Desce na árvore recursivamente
        this.addStep({
          array: [...v],
          tamanhoHeap,
          phase,
          activeParent: filhoDir,
          activeLeft: null,
          activeRight: null,
          comparing: [],
          swapping: [],
          sortedIndices: [...sortedIndices],
          codeLine: 48,
          title: `Descendo na Árvore pelo Filho Direito [${filhoDir}]`,
          explanation: `Como o valor menor desceu para a posição <strong>${filhoDir}</strong>, chamamos recursivamente <code>constroiHeap(v, ${tamanhoHeap}, ${filhoDir})</code> para verificar se ele precisa descer ainda mais.`
        });
        this.constroiHeap(v, tamanhoHeap, filhoDir, sortedIndices, phase);

      } else if (v[filhoEsq] >= v[filhoDir] && v[filhoEsq] > v[pai]) {
        // Swap com filho esquerdo
        this.swapsCount++;
        const aux = v[pai];
        v[pai] = v[filhoEsq];
        v[filhoEsq] = aux;

        this.addStep({
          array: [...v],
          tamanhoHeap,
          phase,
          activeParent: pai,
          activeLeft: filhoEsq,
          activeRight: filhoDir,
          comparing: [],
          swapping: [pai, filhoEsq],
          sortedIndices: [...sortedIndices],
          codeLine: 52,
          title: `Swap: Pai [${pai}] ↔ Filho Esquerdo [${filhoEsq}]`,
          explanation: `O filho esquerdo (<strong>${v[pai]}</strong>) é maior ou igual ao direito e maior que o pai (<strong>${aux}</strong>). Efetuando a troca!`
        });

        // Desce na árvore recursivamente
        this.addStep({
          array: [...v],
          tamanhoHeap,
          phase,
          activeParent: filhoEsq,
          activeLeft: null,
          activeRight: null,
          comparing: [],
          swapping: [],
          sortedIndices: [...sortedIndices],
          codeLine: 56,
          title: `Descendo na Árvore pelo Filho Esquerdo [${filhoEsq}]`,
          explanation: `Como o valor desceu para a posição <strong>${filhoEsq}</strong>, chamamos recursivamente <code>constroiHeap(v, ${tamanhoHeap}, ${filhoEsq})</code>.`
        });
        this.constroiHeap(v, tamanhoHeap, filhoEsq, sortedIndices, phase);

      } else {
        // Pai já é maior que ambos os filhos!
        this.addStep({
          array: [...v],
          tamanhoHeap,
          phase,
          activeParent: pai,
          activeLeft: filhoEsq,
          activeRight: filhoDir,
          comparing: [pai],
          swapping: [],
          sortedIndices: [...sortedIndices],
          codeLine: 40,
          title: `Pai [${pai}] já é maior que os filhos`,
          explanation: `O pai (<strong>${v[pai]}</strong>) já é maior ou igual ao filho esquerdo (<strong>${v[filhoEsq]}</strong>) e ao direito (<strong>${v[filhoDir]}</strong>). A propriedade de Max-Heap já está satisfeita aqui!`
        });
      }

    } else if (filhoEsq < tamanhoHeap) {
      // Tem apenas o filho esquerdo
      this.comparisonsCount++;
      this.addStep({
        array: [...v],
        tamanhoHeap,
        phase,
        activeParent: pai,
        activeLeft: filhoEsq,
        activeRight: null,
        comparing: [pai, filhoEsq],
        swapping: [],
        sortedIndices: [...sortedIndices],
        codeLine: 62,
        title: `Comparando Pai [${pai}] com Único Filho Esquerdo [${filhoEsq}]`,
        explanation: `O nó possui apenas o filho esquerdo no índice <strong>${filhoEsq}</strong>. Comparando: Pai <strong>${v[pai]}</strong> vs Filho <strong>${v[filhoEsq]}</strong>.`
      });

      if (v[filhoEsq] > v[pai]) {
        this.swapsCount++;
        const aux = v[pai];
        v[pai] = v[filhoEsq];
        v[filhoEsq] = aux;

        this.addStep({
          array: [...v],
          tamanhoHeap,
          phase,
          activeParent: pai,
          activeLeft: filhoEsq,
          activeRight: null,
          comparing: [],
          swapping: [pai, filhoEsq],
          sortedIndices: [...sortedIndices],
          codeLine: 64,
          title: `Swap: Pai [${pai}] ↔ Filho Esquerdo [${filhoEsq}]`,
          explanation: `O filho esquerdo (<strong>${v[pai]}</strong>) é maior que o pai (<strong>${aux}</strong>). Efetuando a troca!`
        });

        this.addStep({
          array: [...v],
          tamanhoHeap,
          phase,
          activeParent: filhoEsq,
          activeLeft: null,
          activeRight: null,
          comparing: [],
          swapping: [],
          sortedIndices: [...sortedIndices],
          codeLine: 68,
          title: `Descendo na Árvore pelo Filho Esquerdo [${filhoEsq}]`,
          explanation: `Chamando recursivamente <code>constroiHeap(v, ${tamanhoHeap}, ${filhoEsq})</code>.`
        });
        this.constroiHeap(v, tamanhoHeap, filhoEsq, sortedIndices, phase);

      } else {
        this.addStep({
          array: [...v],
          tamanhoHeap,
          phase,
          activeParent: pai,
          activeLeft: filhoEsq,
          activeRight: null,
          comparing: [pai],
          swapping: [],
          sortedIndices: [...sortedIndices],
          codeLine: 62,
          title: `Pai [${pai}] já é maior que o filho esquerdo`,
          explanation: `O pai (<strong>${v[pai]}</strong>) já é maior ou igual ao filho esquerdo (<strong>${v[filhoEsq]}</strong>). Nenhuma troca necessária.`
        });
      }
    } else {
      // É folha (não tem filhos dentro da heap)
      this.addStep({
        array: [...v],
        tamanhoHeap,
        phase,
        activeParent: pai,
        activeLeft: null,
        activeRight: null,
        comparing: [],
        swapping: [],
        sortedIndices: [...sortedIndices],
        codeLine: 71,
        title: `Nó [${pai}] é uma folha`,
        explanation: `O nó no índice <strong>${pai}</strong> não possui filhos dentro do heap ativo. Nada a fazer.`
      });
    }
  }

  addStep(data) {
    this.steps.push({
      ...data,
      stats: {
        comparisons: this.comparisonsCount,
        swaps: this.swapsCount
      }
    });
  }
}

// Exporta globalmente no window
window.HeapsortSimulator = HeapsortSimulator;

