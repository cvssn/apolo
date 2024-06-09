# apolo-cli

ferramenta commandline para customizar o cliente do spotify.
suporta windows, macos e linux.

**features:**

- alterar cores de toda a interface gráfica (ui)
- injetar css para customização avançada
- habilitar algumas features adicionais/escondidas
- remover componentes pesados para melhorar a performance

![mac_demo1](https://i.imgur.com/8njve9b.png)

## instalação

1. baixe o pacote correto para seu sistema operacional: https://github.com/vwts/apolo/releases
2. desempacote

#### windows

extraia o pacote zip.

para utilizar o apolo, você pode rodar `apolo.exe` diretamente com seu path,
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

## uso básico

rode com o comando uma vez para gerar o arquivo de configuração

```bash
apolo
```

certifique-se que o arquivo de configuração esteja criado com sucesso e que não haja erros, então rode:

```bash
apolo backup apply enable-devtool
```

por agora, depois de mudar algumas cores em `color.ini` ou no css em `user.css`, apenas rode:

```bash
apolo update
```

para atualizar seu tema.

no spotify, pressione <kbd>ctrl</kbd> <kbd>shift</kbd> <kbd>r</kbd> / <kbd>command</kbd> <kbd>shift</kbd> <kbd>r</kbd> para recarregar e receber atualização visual do seu tema.

## customização

#### arquivo de configuração

está localizado em:

**windows**: `%userprofile%\.apolo\config.ini`
**linux**: `~/.apolo/config.ini`
**macos**: `~/apolo_data/config.ini`

#### temas

há 2 locais no qual você pode colocar seus temas:

1. a pasta `Themes` no diretório home

**windows**: `%userprofile%\.apolo\Themes\`
**linux**: `~/.apolo/Themes/`
**macos**: `~/apolo_data/Themes`

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

- sass
- injetar extensões para apps customizados
