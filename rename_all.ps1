$rootPath = $PSScriptRoot

# Função para renomear arquivos e pastas recursivamente
function Rename-AllItems {
    param (
        [string]$path
    )
    
    # Obter todos os itens no diretório
    $items = Get-ChildItem -Path $path -Force
    
    # Processar cada item
    foreach ($item in $items) {
        # Verificar se o nome contém "(1)"
        if ($item.Name -match "\(1\)") {
            $newName = $item.Name -replace "\(1\)", ""
            Write-Host "Renomeando: $($item.FullName) -> $newName"
            Rename-Item -Path $item.FullName -NewName $newName -Force
        }
        
        # Se for um diretório, processar recursivamente
        if (Test-Path -Path $item.FullName -PathType Container) {
            Rename-AllItems -path $item.FullName
        }
    }
}

# Iniciar o processo
Write-Host "Iniciando renomeação recursiva..."
Rename-AllItems -path $rootPath
Write-Host "Processo concluído!"