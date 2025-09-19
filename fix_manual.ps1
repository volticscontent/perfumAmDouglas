# Script para renomear manualmente os arquivos problemáticos

# Criar pasta products se não existir
if (-not (Test-Path -Path ".\src\app\products")) {
    New-Item -Path ".\src\app\products" -ItemType Directory -Force
    Write-Host "Pasta products criada"
}

# Criar pasta [handle] dentro de products
if (-not (Test-Path -Path ".\src\app\products\[handle]")) {
    New-Item -Path ".\src\app\products\[handle]" -ItemType Directory -Force
    Write-Host "Pasta [handle] criada"
}

# Copiar o arquivo page (1).tsx para a nova localização
$sourcePage = ".\src\app\products (1)\[handle]\page (1).tsx"
$destPage = ".\src\app\products\[handle]\page.tsx"

if (Test-Path -Path $sourcePage) {
    Copy-Item -Path $sourcePage -Destination $destPage -Force
    Write-Host "Arquivo page.tsx copiado com sucesso"
}
else {
    Write-Host "Arquivo source não encontrado: $sourcePage"
}

Write-Host "Processo concluído!"