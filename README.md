# apolo-cli

## requisitos

- [go](https://golang.org/dl/)

## clone

```bash
git clone https://github.com/vwts/apolo
```

## build

```bash
cd apolo

go build src/apolo.go
```

## uso

rode sem comandos uma vez para gerar o arquivo de configuração

```bash
apolo
```

então:

```bash
apolo backup
```

e finalmente:

```bash
apolo apply
```

após alterar o tema de cor, css, rode `apply` novamente

## em breve

- sass
- assistir as mudanças de arquivos de temas sendo aplicadas automaticamente
- injetar extensões para apps customizados
