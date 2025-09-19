# Script específico para renomear a pasta products (1)
$productsPath = ".\src\app\products (1)"

# Verificar se a pasta existe
if (Test-Path -Path $productsPath) {
    # Primeiro, tentar mover o conteúdo para uma nova pasta
    $newProductsPath = ".\src\app\products"
    
    # Criar a nova pasta se não existir
    if (-not (Test-Path -Path $newProductsPath)) {
        New-Item -Path $newProductsPath -ItemType Directory -Force
        Write-Host "Criada nova pasta: $newProductsPath"
    }
    
    # Copiar todos os itens da pasta antiga para a nova
    Get-ChildItem -Path $productsPath -Recurse | ForEach-Object {
        $relativePath = $_.FullName.Substring($productsPath.Length + 1)
        $newPath = Join-Path -Path $newProductsPath -ChildPath $relativePath
        
        # Criar diretório de destino se for um arquivo
        if (-not $_.PSIsContainer) {
            $newDir = Split-Path -Path $newPath -Parent
            if (-not (Test-Path -Path $newDir)) {
                New-Item -Path $newDir -ItemType Directory -Force | Out-Null
            }
            
            # Copiar o arquivo
            Copy-Item -Path $_.FullName -Destination $newPath -Force
            Write-Host "Copiado: $($_.FullName) -> $newPath"
        }
        elseif (-not (Test-Path -Path $newPath)) {
            # Criar diretório se não existir
            New-Item -Path $newPath -ItemType Directory -Force | Out-Null
            Write-Host "Criado diretório: $newPath"
        }
    }
    
    # Renomear arquivos com (1) na nova pasta
    Get-ChildItem -Path $newProductsPath -Recurse | ForEach-Object {
        if ($_.Name -match "\(1\)") {
            $newName = $_.Name -replace "\s*\(1\)\s*", ""
            $newName = $newName -replace "\s+\.", "."
            $newItemPath = Join-Path -Path (Split-Path -Path $_.FullName -Parent) -ChildPath $newName
            
            try {
                Rename-Item -Path $_.FullName -NewName $newName -Force
                Write-Host "Renomeado: $($_.FullName) -> $newItemPath"
            }
            catch {
                Write-Host "Erro ao renomear $($_.FullName): $_"
            }
        }
    }
    
    Write-Host "Processo concluído!"
}
else {
    Write-Host "Pasta $productsPath não encontrada."
}