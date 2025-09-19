# Script para remover a pasta products (1) após copiar seu conteúdo

# Verificar se a pasta products (1) existe
$oldProductsPath = ".\src\app\products (1)"
$newProductsPath = ".\src\app\products"

if (Test-Path -Path $oldProductsPath) {
    # Verificar se a pasta [handle] existe dentro de products (1)
    $oldHandlePath = Join-Path -Path $oldProductsPath -ChildPath "[handle]"
    $newHandlePath = Join-Path -Path $newProductsPath -ChildPath "[handle]"
    
    if (Test-Path -Path $oldHandlePath) {
        # Garantir que a pasta de destino existe
        if (-not (Test-Path -Path $newHandlePath)) {
            New-Item -Path $newHandlePath -ItemType Directory -Force | Out-Null
            Write-Host "Criada pasta: $newHandlePath"
        }
        
        # Copiar todos os arquivos de [handle] para a nova localização
        Get-ChildItem -Path $oldHandlePath -File | ForEach-Object {
            $newFileName = $_.Name -replace "\s*\(1\)\s*", ""
            $newFileName = $newFileName -replace "\s+\.", "."
            $destPath = Join-Path -Path $newHandlePath -ChildPath $newFileName
            
            Copy-Item -Path $_.FullName -Destination $destPath -Force
            Write-Host "Copiado: $($_.FullName) -> $destPath"
        }
    }
    
    # Copiar outros arquivos na raiz de products (1)
    Get-ChildItem -Path $oldProductsPath -File | ForEach-Object {
        $newFileName = $_.Name -replace "\s*\(1\)\s*", ""
        $newFileName = $newFileName -replace "\s+\.", "."
        $destPath = Join-Path -Path $newProductsPath -ChildPath $newFileName
        
        Copy-Item -Path $_.FullName -Destination $destPath -Force
        Write-Host "Copiado: $($_.FullName) -> $destPath"
    }
    
    # Tentar remover a pasta products (1)
    try {
        Remove-Item -Path $oldProductsPath -Recurse -Force -ErrorAction Stop
        Write-Host "Removida pasta: $oldProductsPath"
    }
    catch {
        Write-Host "Não foi possível remover a pasta $oldProductsPath"
        Write-Host "Tentando remover arquivos individualmente..."
        
        # Tentar remover arquivos individualmente
        Get-ChildItem -Path $oldProductsPath -Recurse -File | ForEach-Object {
            try {
                Remove-Item -Path $_.FullName -Force -ErrorAction Stop
                Write-Host "Removido arquivo: $($_.FullName)"
            }
            catch {
                Write-Host "Não foi possível remover o arquivo $($_.FullName)"
            }
        }
    }
}
else {
    Write-Host "Pasta $oldProductsPath não encontrada."
}

Write-Host "Processo concluído!"