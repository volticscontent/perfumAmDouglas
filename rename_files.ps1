$rootPath = $PSScriptRoot

function Rename-ItemsWithoutParenthesis {
    param (
        [string]$path
    )
    
    # Obter todos os itens no diretório atual
    $items = Get-ChildItem -Path $path
    
    foreach ($item in $items) {
        # Verificar se o nome contém "(1)"
        if ($item.Name -match "\(1\)") {
            # Criar novo nome removendo "(1)"
            $newName = $item.Name -replace "\(1\)", ""
            
            # Caminho completo para o item
            $fullPath = $item.FullName
            
            # Caminho para o novo nome
            $newPath = Join-Path -Path (Split-Path -Path $fullPath -Parent) -ChildPath $newName
            
            # Renomear o item
            Write-Host "Renomeando: $($item.Name) -> $newName"
            Rename-Item -Path $fullPath -NewName $newName -Force
        }
        
        # Se for um diretório, processar recursivamente
        if ($item.PSIsContainer) {
            Rename-ItemsWithoutParenthesis -path $item.FullName
        }
    }
}

# Iniciar o processo de renomeação
Write-Host "Iniciando renomeação de arquivos e pastas..."
Rename-ItemsWithoutParenthesis -path $rootPath
Write-Host "Processo de renomeação concluído!"