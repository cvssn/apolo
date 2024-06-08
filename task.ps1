function Build {
    # windows
    go build -o "./bin/apolo.exe" "./src/apolo.go"
}

function BuildAll {
    go build -o "./bin/apolo.exe" "./src/apolo.go"
}