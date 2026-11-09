# 🌲 Heapsort Interativo - Visualizador Didático (SPA)

Esta Single Page Application (SPA) foi desenvolvida para apresentações dinâmicas e intuitivas sobre o algoritmo **Heapsort**, conectando a teoria matemática, a visualização em árvore binária e o código em C (`heapsortcpp.c`).

---

## 🚀 Como Executar em Localhost

### No Windows:

#### Opção 1: Via Python (CMD ou PowerShell)
Abra o Prompt de Comando (CMD) ou PowerShell na pasta do projeto:
```cmd
cd view
python -m http.server 3000
```
*(ou caso use o launcher do Windows: `py -m http.server 3000`)*  
Depois acesse no navegador: **[http://localhost:3000](http://localhost:3000)**

#### Opção 2: Abrir direto pelo Terminal do Windows
- No **Prompt de Comando (CMD)**:
  ```cmd
  start view\index.html
  ```
- No **PowerShell**:
  ```powershell
  Start-Process view\index.html
  ```

#### Opção 3: Direto pelo Windows Explorer (Sem terminal)
Basta abrir a pasta `view` no Explorador de Arquivos e dar **dois cliques em `index.html`**.

#### Opção 4: Via Node.js (se instalado)
```cmd
npx serve view
```

---

### No macOS / Linux:

#### Opção 1: Via Python
```bash
cd "view"
python3 -m http.server 3000
```
Acesse: **[http://localhost:3000](http://localhost:3000)**

#### Opção 2: Abrir direto
```bash
open view/index.html
```

---

## 🎯 Principais Recursos para a Apresentação

1. **Visão Dual Sincronizada**:
   - **Árvore Binária Quase Completa (SVG)**: Mostra as conexões hierárquicas, nós destacados por papéis e animações de descida (*sift-down*).
   - **Vetor Linear de Memória (`v[]`)**: Mostra exatamente como os dados ficam salvos na memória física, com uma linha tracejada marcando o limite da heap ativa e os elementos já ordenados.

2. **Código C (`heapsortcpp.c`) em Tempo Real**:
   - O painel lateral mostra o código em C fornecido e **destaca a linha exata** sendo executada a cada micro-passo.
   - Pode ser ocultado ou mostrado com o botão **"💻 Código C"**.

3. **Passo a Passo com Narrativa Didática**:
   - A caixa superior traduz cada operação técnica para uma explicação clara em português (ex: *"Comparando o Pai [1] com seus Filhos [3] e [4]..."*).
   - O apresentador tem controle total: pode avançar (`Próximo ▶`), voltar (`◀ Anterior`) ou dar `Play` automático.

4. **Atalhos de Teclado (Para usar no slide/projetor sem mouse)**:
   - `Espaço`: Iniciar / Pausar reprodução automática
   - `Seta Direita` (`→`): Próximo passo
   - `Seta Esquerda` (`←`): Passo anterior
   - `Home`: Voltar ao início
   - `End`: Pular para o vetor ordenado
   - `R`: Reiniciar simulação
   - `Esc`: Fechar guia de teoria

5. **Exemplos Rápidos & Vetor Customizado**:
   - Botões pré-definidos: Vetor padrão do código `[1..6]`, Aleatório, Invertido (pior caso), Duplicados e 10 Elementos.
   - Campo para digitar qualquer sequência personalizada de números inteiros.

6. **Métricas em Tempo Real**:
   - Contador de Comparações
   - Contador de Trocas (Swaps)
   - Tamanho restante do Heap

7. **Modal de Teoria & Fórmulas**:
   - Botão **"📖 Teoria & Fórmulas"** para revisar com a turma a relação de índices (`2i+1`, `2i+2`, `⌊(i-1)/2⌋`) e a complexidade $O(n \log n)$ com espaço $O(1)$.

