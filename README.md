# apolo-cli

## instalação

1. baixe o pacote correto para seu sistema operacional: https://github.com/vwts/apolo/releases
2. desempacote

#### windows

extraia o pacote zip. rode `apolo.exe` diretamente com seu path.
ou adicione opcionalmente esse diretório para o path de ambiente para então rodar `apolo` em qualquer lugar.

#### linux e macos

no terminal, rode os seguintes comandos:

```bash
cd ~/

mkdir apolo

cd apolo

tar xzf ~/Downloads/apolo-xxx.tar.gz
```

com `~/Downloads/apolo-xxx.tar.gz` é o path no qual o pacote será baixado.

opcionalmente, rode:

```bash
echo 'apolo=~/apolo/apolo' >> .bashrc
```

então você pode agora rodar `apolo` em qualquer lugar.

## uso

rode com o comando uma vez para gerar o arquivo de configuração

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

## customização

#### arquivo de configuração

está localizado em:

**windows**: `%userprofile%\.apolo\config.ini`
**linux e macos**: `~/.apolo/config.ini`

#### temas

há 2 locais no qual você pode colocar seus temas:

1. a pasta `Themes` no diretório home

**windows**: `%userprofile%\.apolo\Themes\`
**linux e macos**: `~/.apolo/Themes/`

2. a pasta `Themes` no diretório executável do apolo

se houver 2 temas com o mesmo nome, o tema no diretório inicial será priorizado.

## desenvolvimento

### requisitos

- [go](https://golang.org/dl/)

## clone

```bash
git clone https://github.com/vwts/apolo
```

### build

```bash
cd apolo

go build src/apolo.go
```

## em breve

- implementação de features adicionais
- sass
- assistir as mudanças de arquivos de temas sendo aplicadas automaticamente
- injetar extensões para apps customizados
