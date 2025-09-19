# Script para renomear arquivos e pastas com "(1)" no nome
function Rename-ItemsWithRetry {
    param (
        [string]$Path
    )

    # Obter todos os itens no caminho atual
    $items = Get-ChildItem -Path $Path -Force -ErrorAction SilentlyContinue

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
            
            # Tentar renomear com retry
            $maxRetries = 3
            $retryCount = 0
            $success = $false
            
            while (-not $success -and $retryCount -lt $maxRetries) {
                try {
                    Rename-Item -Path $oldPath -NewName $newName -Force -ErrorAction Stop
                    Write-Host "Renomeado: $oldPath -> $newPath"
                    $success = $true
                }
                catch {
                    $retryCount++
                    Write-Host "Tentativa $retryCount - Erro ao renomear $oldPath"
                    Start-Sleep -Seconds 1
                }
            }
        }
        
        # Se for um diretório, processar recursivamente
        if ($item.PSIsContainer -and (Test-Path -Path $item.FullName)) {
            Rename-ItemsWithRetry -Path $item.FullName
        }
    }
}

# Iniciar o processo a partir do diretório atual
$rootPath = Get-Location
Write-Host "Iniciando renomeação recursiva a partir de: $rootPath"
Rename-ItemsWithRetry -Path $rootPath

Write-Host "Processo concluído!"