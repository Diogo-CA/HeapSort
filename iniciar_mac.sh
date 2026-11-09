#!/usr/bin/env bash
# Script para iniciar no macOS ou Linux com 1 clique
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR/view" || exit 1

if command -v python3 &>/dev/null; then
    echo "Iniciando servidor local com Python na porta 3000..."
    (sleep 1 && open "http://localhost:3000" 2>/dev/null || xdg-open "http://localhost:3000" 2>/dev/null) &
    python3 -m http.server 3000
else
    echo "Abrindo index.html diretamente no navegador..."
    open index.html 2>/dev/null || xdg-open index.html 2>/dev/null
fi
