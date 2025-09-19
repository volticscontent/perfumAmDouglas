# Script para renomear arquivos e pastas recursivamente, removendo "(1)" dos nomes
# e corrigindo espaços antes de pontos

function Rename-ItemsDeep {
    param (
        [string]$Path
    )

    # Obter todos os itens (arquivos e pastas) no caminho atual
    $items = Get-ChildItem -Path $Path -Force

    # Processar cada item
    foreach ($item in $items) {
        $oldName = $item.Name
        $newName = $oldName

        # Remover "(1)" do nome
        if ($newName -match "\(1\)") {
            $newName = $newName -replace "\s*\(1\)\s*", ""
            
            # Corrigir espaços antes de pontos
            $newName = $newName -replace "\s+\.", "."
            
            # Caminho completo para o item
            $oldPath = $item.FullName
            $newPath = Join-Path -Path (Split-Path -Path $oldPath -Parent) -ChildPath $newName
            
            # Renomear o item
            try {
                Rename-Item -Path $oldPath -NewName $newName -Force -ErrorAction Stop
                Write-Host "Renomeado: $oldPath -> $newPath"
            }
            catch {
                Write-Host "Erro ao renomear $oldPath`: $_"
            }
        }
        
        # Se for um diretório, processar recursivamente
        if ($item.PSIsContainer) {
            Rename-ItemsDeep -Path $item.FullName
        }
    }
}

# Iniciar o processo a partir do diretório atual
$rootPath = Get-Location
Write-Host "Iniciando renomeação recursiva a partir de: $rootPath"
Rename-ItemsDeep -Path $rootPath

Write-Host "Processo concluído!"