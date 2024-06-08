package backupstatus

import (
	"io/ioutil"
	"log"
	"strings"

	"../../utils"
)

// enum é uma tipagem das constantes do status de backup
type Enum int

const (
	// empty - nenhum backup encontrado
	EMPTY Enum = iota

	// backuped - há backup disponível
	BACKUPED

	// outdated - o backup disponível possui uma versão diferente da versão do spotify
	OUTDATED
)

// obtém os status de retornos da pasta de backup
func Get(spotifyPath, backupPath, backupVersion string) Enum {
	fileList, err := ioutil.ReadDir(backupPath)

	if err != nil {
		log.Fatal(err)
	}

	if len(fileList) == 0 {
		return EMPTY
	}

	spaCount := 0

	for _, file := range fileList {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".spa") {
			spaCount++
		}
	}

	if spaCount > 0 {
		spotifyVersion := utils.GetSpotifyVersion(spotifyPath)

		if backupVersion != spotifyVersion {
			return OUTDATED
		}

		return BACKUPED
	}

	return EMPTY
}