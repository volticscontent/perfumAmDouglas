$rootPath = "c:\Users\GAMER\OneDrive\Área de Trabalho\Gustavo\perfume_alemanha (2)"
# Verificar se o caminho existe
if (-not (Test-Path -Path $rootPath)) {
    Write-Host "Caminho não encontrado. Tentando caminho alternativo..."
    $rootPath = $PSScriptRoot
    Write-Host "Usando caminho do script: $rootPath"
}

# Função para renomear arquivos e pastas
function Rename-Items {
    param (
        [string]$path
    )

    # Obter todos os itens (arquivos e pastas) no caminho atual
    $items = Get-ChildItem -Path $path -Force

    # Primeiro renomear arquivos
    foreach ($item in $items | Where-Object { !$_.PSIsContainer }) {
        $newName = $item.Name -replace " \(1\)", ""
        $newName = $newName -replace "\(1\)", ""
        
        if ($newName -ne $item.Name) {
            $newPath = Join-Path -Path $item.DirectoryName -ChildPath $newName
            Write-Host "Renomeando arquivo: $($item.FullName) -> $newPath"
            Rename-Item -Path $item.FullName -NewName $newName -Force
        }
    }

    # Depois processar pastas (de baixo para cima para evitar problemas com caminhos)
    foreach ($folder in $items | Where-Object { $_.PSIsContainer } | Sort-Object -Property FullName -Descending) {
        # Processar subpastas e arquivos primeiro
        Rename-Items -path $folder.FullName
        
        # Agora renomear a pasta atual
        $newName = $folder.Name -replace " \(1\)", ""
        $newName = $newName -replace "\(1\)", ""
        
        if ($newName -ne $folder.Name) {
            $newPath = Join-Path -Path $folder.DirectoryName -ChildPath $newName
            Write-Host "Renomeando pasta: $($folder.FullName) -> $newPath"
            Rename-Item -Path $folder.FullName -NewName $newName -Force
        }
    }
}

# Iniciar o processo de renomeação
Write-Host "Iniciando renomeação de arquivos e pastas..."
Rename-Items -path $rootPath
Write-Host "Processo de renomeação concluído!"