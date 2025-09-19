$rootPath = $PSScriptRoot

# Obter todos os arquivos no diretório atual
$items = Get-ChildItem -Path $rootPath

foreach ($item in $items) {
    # Verificar se o nome contém espaço seguido de ponto
    if ($item.Name -match " \.") {
        # Criar novo nome removendo o espaço antes do ponto
        $newName = $item.Name -replace " \.", "."
        
        # Renomear o item
        Write-Host "Corrigindo: $($item.Name) -> $newName"
        Rename-Item -Path $item.FullName -NewName $newName -Force
    }
}

Write-Host "Correção de espaços concluída!"