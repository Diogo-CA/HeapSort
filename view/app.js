/**
 * app.js
 * Gerenciador da SPA do Heapsort: Renderização SVG da Árvore, Array Linear,
 * Destaque de Código C, Controles Interativos e Eventos de Teclado.
 */

// Código C original formatado com números de linhas para exibição sincronizada
const C_SOURCE_CODE = [
  { line: 1, text: '#include <stdio.h>' },
  { line: 2, text: '' },
  { line: 3, text: '#define SIZE 6' },
  { line: 4, text: '' },
  { line: 5, text: 'void constroiHeap(int v[], int tamanhoHeap, int pai);' },
  { line: 6, text: 'void printVetor(int v[]);' },
  { line: 7, text: '' },
  { line: 8, text: 'int main(){' },
  { line: 9, text: '    ' },
  { line: 10, text: '    int v[] = {1,2,3,4,5,6},' },
  { line: 11, text: '        tamanhoHeap = SIZE,' },
  { line: 12, text: '        pai = (tamanhoHeap-2)/2;' },
  { line: 13, text: '        ' },
  { line: 14, text: '    /* Construir MAXHEAP */' },
  { line: 15, text: '    for(; pai != -1; pai--){' },
  { line: 16, text: '        constroiHeap(v, tamanhoHeap, pai);' },
  { line: 17, text: '    }' },
  { line: 18, text: '    ' },
  { line: 19, text: '    /* Swaps e reconstrução da HEAP */' },
  { line: 20, text: '    while(tamanhoHeap > 1){' },
  { line: 21, text: '        ' },
  { line: 22, text: '        int aux = v[0];' },
  { line: 23, text: '        v[0] = v[tamanhoHeap-1];' },
  { line: 24, text: '        v[tamanhoHeap-1] = aux;' },
  { line: 25, text: '        tamanhoHeap--;' },
  { line: 26, text: '        constroiHeap(v, tamanhoHeap, 0);' },
  { line: 27, text: '    }' },
  { line: 28, text: '    ' },
  { line: 29, text: '    /* Exibir vetor ordenado */' },
  { line: 30, text: '    printVetor(v);' },
  { line: 31, text: '    return 0;' },
  { line: 32, text: '}' },
  { line: 33, text: '' },
  { line: 34, text: 'void constroiHeap(int v[], int tamanhoHeap, int pai){' },
  { line: 35, text: '    ' },
  { line: 36, text: '    int filhoEsq = pai*2+1,' },
  { line: 37, text: '        filhoDir = pai*2+2;' },
  { line: 38, text: '        ' },
  { line: 39, text: '    if(filhoDir < tamanhoHeap){' },
  { line: 40, text: '        if(v[filhoDir] > v[filhoEsq] && v[filhoDir] > v[pai]){' },
  { line: 41, text: '            /* SWAP com filho direita */' },
  { line: 42, text: '            int aux = v[pai];' },
  { line: 43, text: '            v[pai] = v[filhoDir];' },
  { line: 44, text: '            v[filhoDir] = aux;' },
  { line: 45, text: '            /* Desce a árvore */' },
  { line: 46, text: '            constroiHeap(v, tamanhoHeap, filhoDir);' },
  { line: 47, text: '        }' },
  { line: 48, text: '        else if(v[filhoEsq] >= v[filhoDir] && v[filhoEsq] > v[pai]){' },
  { line: 49, text: '            /* SWAP com filho esquerda */' },
  { line: 50, text: '            int aux = v[pai];' },
  { line: 51, text: '            v[pai] = v[filhoEsq];' },
  { line: 52, text: '            v[filhoEsq] = aux;' },
  { line: 53, text: '            /* Desce a árvore */' },
  { line: 54, text: '            constroiHeap(v, tamanhoHeap, filhoEsq);' },
  { line: 55, text: '        }' },
  { line: 56, text: '    }' },
  { line: 57, text: '    else if(filhoEsq < tamanhoHeap){' },
  { line: 58, text: '        if(v[filhoEsq] > v[pai]){' },
  { line: 59, text: '            /* SWAP com filho esquerda */' },
  { line: 60, text: '            int aux = v[pai];' },
  { line: 61, text: '            v[pai] = v[filhoEsq];' },
  { line: 62, text: '            v[filhoEsq] = aux;' },
  { line: 63, text: '            /* Desce a árvore */' },
  { line: 64, text: '            constroiHeap(v, tamanhoHeap, filhoEsq);' },
  { line: 65, text: '        }' },
  { line: 66, text: '    }' },
  { line: 67, text: '}' }
];

class HeapsortApp {
  constructor() {
    this.currentArray = [1, 2, 3, 4, 5, 6];
    this.simulator = null;
    this.currentStepIdx = 0;
    this.isPlaying = false;
    this.playTimer = null;
    this.playSpeed = 900; // ms por passo
    this.soundEnabled = true;
    this.audioCtx = null;
    this.selectedNodeIdx = null;

    this.cacheDom();
    this.renderCodeLines();
    this.bindEvents();
    this.loadArray(this.currentArray);
  }

  cacheDom() {
    this.dom = {
      phaseIndicator: document.getElementById('phaseIndicator'),
      phaseLabel: document.getElementById('phaseLabel'),
      btnToggleSound: document.getElementById('btnToggleSound'),
      btnFullscreen: document.getElementById('btnFullscreen'),
      btnTheoryModal: document.getElementById('btnTheoryModal'),
      btnToggleCode: document.getElementById('btnToggleCode'),
      theoryModal: document.getElementById('theoryModal'),
      btnCloseModal: document.getElementById('btnCloseModal'),
      nodeInspectorCard: document.getElementById('nodeInspectorCard'),
      inspectorTitle: document.getElementById('inspectorTitle'),
      inspectorBody: document.getElementById('inspectorBody'),
      btnCloseInspector: document.getElementById('btnCloseInspector'),
      customInput: document.getElementById('customInput'),
      btnApplyCustom: document.getElementById('btnApplyCustom'),
      presetsButtons: document.querySelectorAll('.btn-chip'),
      metricComparisons: document.getElementById('metricComparisons'),
      metricSwaps: document.getElementById('metricSwaps'),
      metricHeapSize: document.getElementById('metricHeapSize'),
      stepCounterBadge: document.getElementById('stepCounterBadge'),
      stepTitle: document.getElementById('stepTitle'),
      explanationText: document.getElementById('explanationText'),
      treeSvg: document.getElementById('treeSvg'),
      arrayVisualizer: document.getElementById('arrayVisualizer'),
      codePanel: document.getElementById('codePanel'),
      codeLines: document.getElementById('codeLines'),
      btnFirst: document.getElementById('btnFirst'),
      btnPrev: document.getElementById('btnPrev'),
      btnPlay: document.getElementById('btnPlay'),
      btnNext: document.getElementById('btnNext'),
      btnLast: document.getElementById('btnLast'),
      btnReset: document.getElementById('btnReset'),
      timelineSlider: document.getElementById('timelineSlider'),
      sliderPercent: document.getElementById('sliderPercent'),
      speedSlider: document.getElementById('speedSlider'),
      speedValue: document.getElementById('speedValue'),
      mainLayout: document.getElementById('mainLayout')
    };
  }

  // Síntese de Áudio com Web Audio API Nativa
  initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playSound(type) {
    if (!this.soundEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'compare') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'swap') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'victory') {
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, idx) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + idx * 0.1);
          g.gain.setValueAtTime(0.1, now + idx * 0.1);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.25);
          o.start(now + idx * 0.1);
          o.stop(now + idx * 0.1 + 0.25);
        });
      }
    } catch (e) {
      // Ignora erro de áudio caso bloqueado pelo navegador
    }
  }

  renderCodeLines() {
    this.dom.codeLines.innerHTML = C_SOURCE_CODE.map(item => {
      return `<div class="code-line-row" id="codeLine-${item.line}" data-line="${item.line}">
        <span class="code-num">${item.line}</span>
        <span class="code-text">${this.escapeHtml(item.text)}</span>
      </div>`;
    }).join('');
  }

  escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  bindEvents() {
    // Teclado (ideal para apresentações)
    window.addEventListener('keydown', (e) => {
      // Ignorar se o foco estiver no input de texto
      if (document.activeElement === this.dom.customInput) return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.nextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.prevStep();
      } else if (e.code === 'KeyR') {
        this.reset();
      } else if (e.code === 'Home') {
        this.goToStep(0);
      } else if (e.code === 'End') {
        this.goToStep(this.simulator.steps.length - 1);
      } else if (e.code === 'Escape') {
        this.closeModal();
        this.closeInspector();
      }
    });

    // Som
    this.dom.btnToggleSound.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      this.dom.btnToggleSound.textContent = this.soundEnabled ? '🔊 Som: Ligado' : '🔇 Som: Mudo';
      this.dom.btnToggleSound.classList.toggle('btn-muted', !this.soundEnabled);
    });

    // Tela Cheia
    this.dom.btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        this.dom.btnFullscreen.textContent = '🗗 Sair Tela Cheia';
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        this.dom.btnFullscreen.textContent = '⛶ Tela Cheia';
      }
    });

    // Fechar Inspetor de Nós
    this.dom.btnCloseInspector.addEventListener('click', () => this.closeInspector());

    // Controles de execução
    this.dom.btnPlay.addEventListener('click', () => this.togglePlay());
    this.dom.btnNext.addEventListener('click', () => this.nextStep());
    this.dom.btnPrev.addEventListener('click', () => this.prevStep());
    this.dom.btnFirst.addEventListener('click', () => this.goToStep(0));
    this.dom.btnLast.addEventListener('click', () => this.goToStep(this.simulator.steps.length - 1));
    this.dom.btnReset.addEventListener('click', () => this.reset());

    // Timeline Slider
    this.dom.timelineSlider.addEventListener('input', (e) => {
      this.pause();
      this.goToStep(parseInt(e.target.value, 10));
    });

    // Controle de Velocidade
    this.dom.speedSlider.addEventListener('input', (e) => {
      const raw = parseInt(e.target.value, 10);
      // Inverte: slider à direita = mais rápido (menor ms)
      this.playSpeed = 2400 - raw;
      if (this.playSpeed < 500) this.dom.speedValue.textContent = 'Rápido';
      else if (this.playSpeed < 1200) this.dom.speedValue.textContent = 'Normal';
      else this.dom.speedValue.textContent = 'Lento';

      if (this.isPlaying) {
        this.pause();
        this.play();
      }
    });

    // Entrada Customizada
    this.dom.btnApplyCustom.addEventListener('click', () => this.handleCustomInput());
    this.dom.customInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleCustomInput();
    });

    // Presets
    this.dom.presetsButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.presetsButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const presetKey = btn.dataset.preset;
        this.loadPreset(presetKey);
      });
    });

    // Alternar Painel de Código C
    this.dom.btnToggleCode.addEventListener('click', () => {
      this.dom.mainLayout.classList.toggle('hide-code');
      const isHidden = this.dom.mainLayout.classList.contains('hide-code');
      this.dom.btnToggleCode.textContent = isHidden ? '💻 Mostrar Código' : '💻 Código C';
    });

    // Modal de Teoria
    this.dom.btnTheoryModal.addEventListener('click', () => this.openModal());
    this.dom.btnCloseModal.addEventListener('click', () => this.closeModal());
    this.dom.theoryModal.addEventListener('click', (e) => {
      if (e.target === this.dom.theoryModal) this.closeModal();
    });

    // Redimensionamento de Janela (reajusta SVG da árvore)
    window.addEventListener('resize', () => {
      if (this.simulator && this.simulator.steps[this.currentStepIdx]) {
        this.renderStep(this.simulator.steps[this.currentStepIdx]);
      }
    });
  }

  loadPreset(key) {
    let arr = [];
    switch (key) {
      case 'original':
        arr = [1, 2, 3, 4, 5, 6];
        break;
      case 'random':
        arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 89) + 10);
        break;
      case 'reversed':
        arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        break;
      case 'duplicates':
        arr = [7, 3, 7, 2, 5, 3, 9, 2];
        break;
      case 'larger':
        arr = [15, 3, 28, 4, 1, 9, 12, 6, 7, 2];
        break;
      default:
        arr = [1, 2, 3, 4, 5, 6];
    }
    this.dom.customInput.value = arr.join(', ');
    this.loadArray(arr);
  }

  handleCustomInput() {
    const raw = this.dom.customInput.value.trim();
    if (!raw) return;

    const parts = raw.split(/[\s,]+/).filter(Boolean);
    const nums = parts.map(p => parseInt(p, 10));

    if (nums.some(n => isNaN(n))) {
      alert('Por favor, insira apenas números inteiros válidos separados por vírgula ou espaço.');
      return;
    }

    if (nums.length < 3) {
      alert('Insira no mínimo 3 números para visualizar a árvore do Heapsort.');
      return;
    }

    if (nums.length > 15) {
      alert('Para uma visualização clara e didática no projetor, sugerimos no máximo 15 elementos.');
      return;
    }

    this.dom.presetsButtons.forEach(b => b.classList.remove('active'));
    this.loadArray(nums);
  }

  loadArray(arr) {
    this.pause();
    this.currentArray = [...arr];
    this.simulator = new HeapsortSimulator(this.currentArray);
    this.currentStepIdx = 0;

    this.dom.timelineSlider.max = this.simulator.steps.length - 1;
    this.dom.timelineSlider.value = 0;

    this.renderCurrentStep();
  }

  reset() {
    this.pause();
    this.goToStep(0);
  }

  goToStep(index) {
    if (!this.simulator) return;
    this.currentStepIdx = Math.max(0, Math.min(index, this.simulator.steps.length - 1));
    this.dom.timelineSlider.value = this.currentStepIdx;
    this.renderCurrentStep();
  }

  nextStep() {
    if (!this.simulator) return;
    if (this.currentStepIdx < this.simulator.steps.length - 1) {
      this.goToStep(this.currentStepIdx + 1);
    } else {
      this.pause();
    }
  }

  prevStep() {
    if (!this.simulator) return;
    if (this.currentStepIdx > 0) {
      this.goToStep(this.currentStepIdx - 1);
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      if (this.currentStepIdx >= this.simulator.steps.length - 1) {
        this.goToStep(0);
      }
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    this.dom.btnPlay.innerHTML = '⏸ Pausar';
    this.dom.btnPlay.classList.add('btn-playing');

    this.playTimer = setInterval(() => {
      if (this.currentStepIdx < this.simulator.steps.length - 1) {
        this.nextStep();
      } else {
        this.pause();
      }
    }, this.playSpeed);
  }

  pause() {
    this.isPlaying = false;
    this.dom.btnPlay.innerHTML = '▶ Reproduzir';
    this.dom.btnPlay.classList.remove('btn-playing');
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }
  }

  openModal() {
    this.dom.theoryModal.classList.remove('hidden');
  }

  closeModal() {
    this.dom.theoryModal.classList.add('hidden');
  }

  closeInspector() {
    this.selectedNodeIdx = null;
    this.dom.nodeInspectorCard.classList.add('hidden');
  }

  inspectNode(idx) {
    if (!this.simulator) return;
    const step = this.simulator.steps[this.currentStepIdx];
    const { array, tamanhoHeap } = step;
    if (idx < 0 || idx >= array.length) return;

    this.selectedNodeIdx = idx;
    const val = array[idx];
    const parentIdx = idx > 0 ? Math.floor((idx - 1) / 2) : null;
    const leftIdx = idx * 2 + 1;
    const rightIdx = idx * 2 + 2;

    const inHeap = idx < tamanhoHeap;
    const parentVal = parentIdx !== null ? array[parentIdx] : null;
    const leftVal = leftIdx < array.length ? array[leftIdx] : null;
    const rightVal = rightIdx < array.length ? array[rightIdx] : null;

    let fulfillsMaxHeap = true;
    if (inHeap) {
      if (leftIdx < tamanhoHeap && leftVal > val) fulfillsMaxHeap = false;
      if (rightIdx < tamanhoHeap && rightVal > val) fulfillsMaxHeap = false;
    }

    this.dom.inspectorTitle.textContent = `Nó [${idx}] = ${val}`;
    this.dom.inspectorBody.innerHTML = `
      <div><strong>Status:</strong> ${inHeap ? 'Ativo na Heap' : 'Ordenado / Fora da Heap'}</div>
      <div><strong>Pai [⌊(${idx}-1)/2⌋]:</strong> ${parentIdx !== null ? `[${parentIdx}] = <strong>${parentVal}</strong>` : '<em>Nenhum (Raiz)</em>'}</div>
      <div><strong>Filho Esq [2×${idx}+1]:</strong> ${leftIdx < array.length ? `[${leftIdx}] = <strong>${leftVal}</strong> ${leftIdx >= tamanhoHeap ? '(fora da heap)' : ''}` : '<em>Nenhum</em>'}</div>
      <div><strong>Filho Dir [2×${idx}+2]:</strong> ${rightIdx < array.length ? `[${rightIdx}] = <strong>${rightVal}</strong> ${rightIdx >= tamanhoHeap ? '(fora da heap)' : ''}` : '<em>Nenhum</em>'}</div>
      <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid var(--border-color);">
        <strong>Propriedade Max-Heap:</strong><br>
        ${fulfillsMaxHeap ? '<span class="badge-check-ok">✔ Válida (Pai ≥ Filhos)</span>' : '<span class="badge-check-no">✖ Violação (Filho > Pai)</span>'}
      </div>
    `;
    this.dom.nodeInspectorCard.classList.remove('hidden');
  }

  renderCurrentStep() {
    if (!this.simulator || !this.simulator.steps.length) return;
    const step = this.simulator.steps[this.currentStepIdx];
    this.renderStep(step);
  }

  renderStep(step) {
    const totalSteps = this.simulator.steps.length;
    const percent = Math.round((this.currentStepIdx / (totalSteps - 1 || 1)) * 100);

    // Tocar som didático
    if (step.phase === 'FINISHED') {
      this.playSound('victory');
    } else if (step.swapping && step.swapping.length > 0) {
      this.playSound('swap');
    } else if (step.comparing && step.comparing.length > 0) {
      this.playSound('compare');
    }

    // 1. Atualizar Header & Badge de Fase
    this.updatePhaseIndicator(step.phase);

    // 2. Atualizar Métricas & Narrativa
    this.dom.stepCounterBadge.textContent = `Passo ${this.currentStepIdx + 1} de ${totalSteps}`;
    this.dom.stepTitle.textContent = step.title;
    this.dom.explanationText.innerHTML = step.explanation;

    this.dom.metricComparisons.textContent = step.stats.comparisons;
    this.dom.metricSwaps.textContent = step.stats.swaps;
    this.dom.metricHeapSize.textContent = step.tamanhoHeap > 0 ? `${step.tamanhoHeap} nós` : '0 (Finalizado)';

    this.dom.sliderPercent.textContent = `${percent}%`;

    // 3. Renderizar Vetor Linear
    this.renderArray(step);

    // 4. Renderizar Árvore SVG
    this.renderTree(step);

    // 5. Destacar Linha do Código C
    this.highlightCodeLine(step.codeLine);

    // Atualiza inspetor se um nó estiver selecionado
    if (this.selectedNodeIdx !== null) {
      this.inspectNode(this.selectedNodeIdx);
    }
  }

  updatePhaseIndicator(phase) {
    this.dom.phaseIndicator.className = 'phase-badge';
    if (phase === 'BUILD_HEAP') {
      this.dom.phaseIndicator.classList.add('phase-build');
      this.dom.phaseLabel.textContent = 'Fase 1: Construindo MAX-HEAP';
    } else if (phase === 'SORTING') {
      this.dom.phaseIndicator.classList.add('phase-sort');
      this.dom.phaseLabel.textContent = 'Fase 2: Extração & Reconstrução';
    } else if (phase === 'FINISHED') {
      this.dom.phaseIndicator.classList.add('phase-finished');
      this.dom.phaseLabel.textContent = 'Ordenação Concluída ✅';
    } else {
      this.dom.phaseIndicator.classList.add('phase-idle');
      this.dom.phaseLabel.textContent = 'Aguardando Início';
    }
  }

  renderArray(step) {
    const { array, tamanhoHeap, activeParent, activeLeft, activeRight, comparing, swapping, sortedIndices } = step;
    
    let html = '';
    array.forEach((val, idx) => {
      const isSorted = sortedIndices.includes(idx);
      const isComparing = comparing.includes(idx);
      const isSwapping = swapping.includes(idx);
      const isParent = activeParent === idx;
      const isLeft = activeLeft === idx;
      const isRight = activeRight === idx;
      const isInHeap = idx < tamanhoHeap;

      let classes = ['array-box'];
      if (isSorted) classes.push('box-sorted');
      else if (isSwapping) classes.push('box-swapping');
      else if (isComparing) classes.push('box-comparing');
      else if (isParent) classes.push('box-parent');
      else if (isLeft || isRight) classes.push('box-child');
      
      if (!isInHeap && !isSorted) classes.push('box-outside');

      // Tag explicativa sob o índice
      let roleTag = '';
      if (isSorted) roleTag = 'ORDENADO';
      else if (idx === 0 && isInHeap) roleTag = 'RAIZ (MAX)';
      else if (isParent) roleTag = 'PAI';
      else if (isLeft) roleTag = 'FILHO ESQ';
      else if (isRight) roleTag = 'FILHO DIR';

      html += `
        <div class="${classes.join(' ')}" data-index="${idx}">
          <div class="box-idx">[${idx}]</div>
          <div class="box-val">${val}</div>
          <div class="box-tag">${roleTag}</div>
        </div>
      `;

      // Insere linha divisória de fronteira do heap
      if (idx === tamanhoHeap - 1 && tamanhoHeap < array.length && tamanhoHeap > 0) {
        html += `<div class="heap-divider" title="Limite do Heap Ativo (índices 0 até ${tamanhoHeap - 1})"></div>`;
      }
    });

    this.dom.arrayVisualizer.innerHTML = html;

    // Clique para inspecionar nó
    this.dom.arrayVisualizer.querySelectorAll('.array-box').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.index, 10);
        this.inspectNode(idx);
      });
    });
  }

  renderTree(step) {
    const { array, tamanhoHeap, activeParent, activeLeft, activeRight, comparing, swapping, sortedIndices } = step;
    const svg = this.dom.treeSvg;
    svg.innerHTML = '';

    const width = svg.clientWidth || 700;
    const height = svg.clientHeight || 340;

    const n = array.length;
    if (n === 0) return;

    // Calcula níveis da árvore
    const totalLevels = Math.floor(Math.log2(n)) + 1;
    const levelHeight = (height - 60) / Math.max(totalLevels, 1);
    const nodeRadius = Math.min(22, Math.max(15, 260 / (1 << (totalLevels - 1))));

    // Calcula posições (x, y) de cada nó
    const positions = [];
    for (let i = 0; i < n; i++) {
      const level = Math.floor(Math.log2(i + 1));
      const posInLevel = i - ((1 << level) - 1);
      const totalInLevel = 1 << level;
      const x = ((posInLevel + 0.5) / totalInLevel) * width;
      const y = 35 + level * levelHeight;
      positions.push({ x, y });
    }

    // 1. Desenha arestas (linhas entre pai e filhos)
    for (let i = 1; i < n; i++) {
      const p = Math.floor((i - 1) / 2);
      const pPos = positions[p];
      const cPos = positions[i];

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pPos.x);
      line.setAttribute('y1', pPos.y);
      line.setAttribute('x2', cPos.x);
      line.setAttribute('y2', cPos.y);

      const isBothInHeap = p < tamanhoHeap && i < tamanhoHeap;
      const isComparingEdge = comparing.includes(p) && comparing.includes(i);
      const isSwappingEdge = swapping.includes(p) && swapping.includes(i);

      let edgeClass = 'tree-edge';
      if (isSwappingEdge) edgeClass += ' edge-swapping';
      else if (isComparingEdge) edgeClass += ' edge-comparing';
      else if (!isBothInHeap) edgeClass += ' edge-outside';

      line.setAttribute('class', edgeClass);
      svg.appendChild(line);
    }

    // 2. Desenha nós (círculos e textos)
    for (let i = 0; i < n; i++) {
      const pos = positions[i];
      const val = array[i];
      const isSorted = sortedIndices.includes(i);
      const isComparing = comparing.includes(i);
      const isSwapping = swapping.includes(i);
      const isParent = activeParent === i;
      const isLeft = activeLeft === i;
      const isRight = activeRight === i;
      const isInHeap = i < tamanhoHeap;

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      let nodeClass = 'tree-node';
      if (isSorted) nodeClass += ' node-sorted';
      else if (isSwapping) nodeClass += ' node-swapping';
      else if (isComparing) nodeClass += ' node-comparing';
      else if (isParent) nodeClass += ' node-parent';
      else if (isLeft || isRight) nodeClass += ' node-child';

      if (!isInHeap && !isSorted) nodeClass += ' node-outside';
      if (this.selectedNodeIdx === i) nodeClass += ' node-inspected';
      g.setAttribute('class', nodeClass);
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => this.inspectNode(i));

      // Círculo do nó
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.x);
      circle.setAttribute('cy', pos.y);
      circle.setAttribute('r', nodeRadius);
      g.appendChild(circle);

      // Texto do valor do nó
      const textVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textVal.setAttribute('x', pos.x);
      textVal.setAttribute('y', pos.y + 5);
      textVal.setAttribute('class', 'node-text-val');
      textVal.textContent = val;
      g.appendChild(textVal);

      // Badge com o índice [i] em cima do nó
      const textIdx = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textIdx.setAttribute('x', pos.x);
      textIdx.setAttribute('y', pos.y - nodeRadius - 5);
      textIdx.setAttribute('class', 'node-text-idx');
      textIdx.textContent = `[${i}]`;
      g.appendChild(textIdx);

      // Indicador L ou R sob os filhos
      if (isLeft || isRight) {
        const textRole = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textRole.setAttribute('x', pos.x);
        textRole.setAttribute('y', pos.y + nodeRadius + 14);
        textRole.setAttribute('class', 'node-role-badge');
        textRole.textContent = isLeft ? 'ESQ' : 'DIR';
        g.appendChild(textRole);
      }

      svg.appendChild(g);
    }
  }

  highlightCodeLine(lineNumber) {
    // Remove destaque anterior
    const prev = this.dom.codeLines.querySelector('.line-active');
    if (prev) prev.classList.remove('line-active');

    if (!lineNumber) return;

    const row = document.getElementById(`codeLine-${lineNumber}`);
    if (row) {
      row.classList.add('line-active');
      // Scroll suave para manter a linha no meio do painel
      row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

// Inicializa a aplicação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  window.heapsortApp = new HeapsortApp();
});

