# Script para renomear especificamente a pasta products (1) e seus arquivos
$productsPath = ".\src\app\products (1)"

if (Test-Path -Path $productsPath) {
    # Primeiro, renomear os arquivos dentro da pasta [handle] (1)
    $handlePath = Join-Path -Path $productsPath -ChildPath "[handle] (1)"
    if (Test-Path -Path $handlePath) {
        $pagePath = Join-Path -Path $handlePath -ChildPath "page (1).tsx"
        if (Test-Path -Path $pagePath) {
            $newPagePath = Join-Path -Path $handlePath -ChildPath "page.tsx"
            try {
                Rename-Item -Path $pagePath -NewName "page.tsx" -Force
                Write-Host "Renomeado: $pagePath -> $newPagePath"
            }
            catch {
                Write-Host "Erro ao renomear $pagePath`: $_"
            }
        }
        
        # Renomear a pasta [handle] (1)
        $newHandlePath = Join-Path -Path $productsPath -ChildPath "[handle]"
        try {
            Rename-Item -Path $handlePath -NewName "[handle]" -Force
            Write-Host "Renomeado: $handlePath -> $newHandlePath"
        }
        catch {
            Write-Host "Erro ao renomear $handlePath`: $_"
        }
    }
    
    # Renomear a pasta products (1)
    $newProductsPath = ".\src\app\products"
    try {
        Rename-Item -Path $productsPath -NewName "products" -Force
        Write-Host "Renomeado: $productsPath -> $newProductsPath"
    }
    catch {
        Write-Host "Erro ao renomear $productsPath`: $_"
    }
}
else {
    Write-Host "Pasta $productsPath não encontrada."
}

Write-Host "Processo concluído!"