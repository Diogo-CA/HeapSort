# 🎤 Roteiro de Apresentação em Grupo: Heapsort

Este roteiro foi estruturado para guiar o grupo durante a apresentação do trabalho, relacionando a teoria, a visualização prática na SPA e o código em C (`heapsortcpp.c`).

---

## 👥 Divisão Sugerida das Falas (3 a 4 Integrantes)

### 👤 Integrante 1: Introdução & Estrutura do Heap
- **O que falar:**
  - O **Heapsort** é um algoritmo de ordenação por comparação inventado por J. W. J. Williams em 1964.
  - Ele utiliza uma estrutura de dados chamada **Heap**, que é uma **Árvore Binária Quase Completa** mapeada diretamente dentro de um vetor contíguo na memória, sem precisar de nós com ponteiros (`malloc` / `struct`).
  - Mostrar as fórmulas matemáticas que mapeiam os nós no array:
    - Pai de $i$: $\lfloor (i - 1) / 2 \rfloor$
    - Filho Esquerdo: $2i + 1$
    - Filho Direito: $2i + 2$
  - Explicar a regra do **Max-Heap**: em qualquer nó, o valor do pai é maior ou igual ao de seus filhos ($v[\text{pai}] \ge v[\text{filhos}]$). Logo, o maior elemento de todo o vetor reside obrigatoriamente na raiz ($v[0]$).

---

### 👤 Integrante 2: Fase 1 – Construção do Max-Heap (Heapify)
- **O que mostrar na SPA:**
  - Iniciar com o exemplo padrão `[1, 2, 3, 4, 5, 6]` ou um aleatório.
  - Clicar em **"Próximo Passo"** e apontar no código a linha 12: `pai = (tamanhoHeap - 2) / 2`.
  - **Destaque Didático:** Por que começamos de `(n-2)/2`? Porque os nós depois dele são folhas e folhas já são heaps válidos por si só!
  - Avançar mostrando a função `constroiHeap` descendo na árvore (*sift-down*), comparando o pai com o maior de seus dois filhos e efetuando a troca (*swap*) quando o filho for maior.
  - Concluir mostrando a árvore inteira verde/equilibrada ao final da Fase 1, onde a raiz passa a ser o valor máximo.

---

### 👤 Integrante 3: Fase 2 – Extração e Ordenação
- **O que mostrar na SPA:**
  - Apontar no código o loop `while (tamanhoHeap > 1)`.
  - Mostrar os 3 micro-passos repetidos em cada rodada:
    1. **Troca:** Troca a raiz $v[0]$ (maior elemento) com $v[\text{tamanhoHeap} - 1]$ (última posição não ordenada).
    2. **Contração:** Reduz `tamanhoHeap--`, travando o elemento em definitivo (ele ganha cor verde no vetor e fica atrás da linha tracejada amarela).
    3. **Restauração:** Chama `constroiHeap(v, tamanhoHeap, 0)` na nova raiz que acabou de subir, fazendo-a descer até seu lugar devido.
  - Demonstrar que o processo se repete até que reste apenas 1 elemento, resultando no vetor perfeitamente ordenado!

---

### 👤 Integrante 4: Análise de Complexidade & Perguntas Frequentes
- **Complexidade de Tempo:**
  - **Construção do Heap (Fase 1):** $O(n)$
  - **Extração dos $n$ elementos (Fase 2):** $n \times O(\log n) = O(n \log n)$
  - **Total:** $O(n \log n)$ garantido no **Melhor, Médio e Pior caso**!
- **Complexidade de Espaço:**
  - $O(1)$ auxiliar (In-place), pois toda a ordenação ocorre dentro do próprio vetor de entrada.
- **Estabilidade:**
  - Não é estável (elementos de mesmo valor podem trocar de ordem relativa durante as descidas no heap).

---

## 🎯 Perguntas Clássicas que os Professores Adoram Fazer

1. **"Por que o Heapsort é melhor que o Quicksort no pior caso?"**
   - *Resposta:* O Quicksort pode degradar para $O(n^2)$ se a escolha do pivô for desfavorável (ex: vetor já ordenado ou invertido). Já o Heapsort garante estritamente $O(n \log n)$ em qualquer cenário.

2. **"Por que na prática o Quicksort ainda é muito usado se o Heapsort tem o mesmo $O(n \log n)$?"**
   - *Resposta:* O Heapsort pula posições na memória ao acessar filhos ($2i+1$ e $2i+2$), gerando menor localidade espacial de referência (*cache misses*). O Quicksort acessa a memória de forma mais linear e sequencial, aproveitando melhor o cache L1/L2 do processador.

3. **"Por que a construção do Max-Heap é $O(n)$ e não $O(n \log n)$?"**
   - *Resposta:* Porque a maioria dos nós está na base da árvore (folhas têm altura 0 e não descem nada; o penúltimo nível tem $n/4$ nós que descem no máximo 1 nível; etc.). A soma finita $\sum \frac{h}{2^h}$ converge para uma constante, resultando matematicamente em $O(n)$.
