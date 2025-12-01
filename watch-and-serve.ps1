# Script para rebuild automático quando arquivos mudarem (usando sphinx-autobuild)
# Uso: .\watch-and-serve.ps1
# 
# Nota: Requer sphinx-autobuild instalado:
#   pip install sphinx-autobuild

Write-Host "Starting auto-rebuild server..." -ForegroundColor Green
Write-Host "This will rebuild automatically when you save files." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Verificar se sphinx-autobuild está instalado
$autobuildCheck = python -c "import sphinx_autobuild" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ sphinx-autobuild not found!" -ForegroundColor Yellow
    Write-Host "Installing sphinx-autobuild..." -ForegroundColor Cyan
    pip install sphinx-autobuild
    Write-Host ""
}

# Navegar para pasta docs
Set-Location docs

# Iniciar sphinx-autobuild
# Ele faz rebuild automático e abre o navegador
# Usando python -m para evitar problemas de PATH no Windows
python -m sphinx_autobuild . _build/html --host 127.0.0.1 --port 8000 --open-browser

