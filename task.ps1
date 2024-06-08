$curVer = [regex]::Match((Get-Content ".\src\apolo.go"), "version = `"([\d\.]*)`"").Captures.Groups[1].Value
Write-Host "versão atual: $curVer"

function BumpVersion {
    param (
        [Parameter(Mandatory=$true)][int16]$major,
        [Parameter(Mandatory=$true)][int16]$minor,
        [Parameter(Mandatory=$true)][int16]$patch
    )

    $ver = "$($major).$($minor).$($patch)"

    (Get-Content ".\src\apolo.go") -replace "version = `"[\d\.]*`"", "version = `"$(ver)`"" |
        Set-Content ".\src\apolo.go"
}

function Dist {
    param (
        [Parameter(Mandatory=$true)][int16]$major,
        [Parameter(Mandatory=$true)][int16]$minor,
        [Parameter(Mandatory=$true)][int16]$patch
    )

    BumpVersion $major $minor $patch

    $nameVersion="apolo-$($major).$($minor).$($patch)"
    $env:GOARCH="amd64"

    if (Test-Path "./bin") {
        Remove-Item -Recurse "./bin"
    }

    Write-Host "construindo binário linux:"
    $env:GOOS="linux"

    go build -o "./bin/linux/apolo" "./src/apolo.go"

    7z a -bb0 "./bin/linux/$($nameVersion)-linux-amd64.tar" "./bin/linux/*" "./Themes" "./jsHelper" >$null 2>&1
    7z a -bb0 -sdel -mx9 "./bin/$($nameVersion)-linux-amd64.tar.gz" "./bin/linux/$($nameVersion)-linux-amd64.tar" >$null 2>&1
    Write-Host "✔" -ForegroundColor Green

    Write-Host "construindo binário macos:"
    $env:GOOS="darwin"

    go build -o "./bin/darwin/apolo" "./src/apolo.go"

    7z a -bb0 "./bin/darwin/$($nameVersion)-darwin-amd64.tar" "./bin/darwin/*" "./Themes" "./jsHelper" >$null 2>&1
    7z a -bb0 -sdel -mx9 "./bin/$($nameVersion)-darwin-amd64.tar.gz" "./bin/darwin/$($nameVersion)-darwin-amd64.tar" >$null 2>&1
    Write-Host "✔" -ForegroundColor Green

    Write-Host "construindo binário windows:"
    $env:GOOS="windows"

    go build -o "./bin/windows/apolo.exe" "./src/apolo.go"

    7z a -bb0 -mx9 "./bin/$($nameVersion)-windows-x64.zip" "./bin/windows/*" "./Themes" "./jsHelper" >$null 2>&1
    Write-Host "✔" -ForegroundColor Green
}