$rootPath = $PSScriptRoot

# Função para corrigir espaços em branco nos nomes
function Fix-Spaces {
    param (
        [string]$path
    )
    
    # Obter todos os itens no diretório
    $items = Get-ChildItem -Path $path -Force
    
    # Processar cada item
    foreach ($item in $items) {
        # Verificar se o nome contém espaço seguido de ponto
        if ($item.Name -match " \.") {
            $newName = $item.Name -replace " \.", "."
            Write-Host "Corrigindo: $($item.FullName) -> $newName"
            Rename-Item -Path $item.FullName -NewName $newName -Force
        }
        
        # Se for um diretório, processar recursivamente
        if (Test-Path -Path $item.FullName -PathType Container) {
            Fix-Spaces -path $item.FullName
        }
    }
}

# Iniciar o processo
Write-Host "Iniciando correção de espaços..."
Fix-Spaces -path $rootPath
Write-Host "Processo concluído!"