# Script para fazer build e iniciar servidor local automaticamente
# Uso: .\build-and-serve.ps1

Write-Host "Building Sprite Render Tool documentation..." -ForegroundColor Green
Write-Host ""

# Navegar para pasta docs
Set-Location docs

# Fazer build
python -m sphinx -b html . _build/html

# Verificar resultado
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Build successful! Starting server..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Server starting at: http://localhost:8000" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    # Navegar para pasta de build e iniciar servidor
    Set-Location _build\html
    python -m http.server 8000
} else {
    Write-Host ""
    Write-Host "✗ Build failed! Check errors above." -ForegroundColor Red
    Set-Location ..
    exit 1
}

