package spotifystatus

import (
	"io/ioutil"
	"log"
	"path/filepath"
	"strings"
)

// enum é uma tipagem das constantes do status do spotify
type Enum int

const (
	// stock - spotify está no estado original
	STOCK Enum = iota

	// invalid - pasta apps possui arquivos e diretórios mixados
	INVALID

	// applied - spotify está modificado
	APPLIED
)

// obtém os status de retornos da pasta apps do spotify
func Get(spotifyPath string) Enum {
	appsFolder := filepath.Join(spotifyPath, "Apps")
	fileList, err := ioutil.ReadDir(appsFolder)

	if err != nil {
		log.Fatal(err)
	}

	spaCount := 0
	dirCount := 0

	for _, file := range fileList {
		if file.IsDir() {
			dirCount++

			continue
		}

		if strings.HasSuffix(file.Name(), ".spa") {
			spaCount++
		}
	}

	totalFiles := len(fileList)
	
	if spaCount == totalFiles {
		return STOCK
	}

	if dirCount == totalFiles {
		return APPLIED
	}

	return INVALID
}