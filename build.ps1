# Script para fazer build da documentação Sphinx
# Uso: .\build.ps1

Write-Host "Building Sprite Render Tool documentation..." -ForegroundColor Green
Write-Host ""

# Navegar para pasta docs
Set-Location docs

# Fazer build
python -m sphinx -b html . _build/html

# Verificar resultado
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Build successful!" -ForegroundColor Green
    Write-Host "HTML files are in: docs\_build\html" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To view locally, run:" -ForegroundColor Yellow
    Write-Host "  cd docs\_build\html" -ForegroundColor White
    Write-Host "  python -m http.server 8000" -ForegroundColor White
    Write-Host "  Then open: http://localhost:8000" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "✗ Build failed! Check errors above." -ForegroundColor Red
    exit 1
}

# Voltar para raiz
Set-Location ..

