package backup

import (
	"os"
	"path/filepath"
	"strings"

	"../utils"
)

// inicializar backup da pasta dos apps de spotify para backuppath
func Start(apoloPath, backupPath string) error {
	appsFolder := filepath.Join(spotifyPath, "Apps")
	
	utils.RunCopy(appsFolder, backupPath, false, []string{"*.spa"})

	return nil
}

// extrair todos os arquivos spa de backuppath para extractpath
// e chamar `callback` para cada app extraído com sucesso
func Extract(backupPath, extractPath string, callback func(finishedApp string, err error)) {
	filepath.Walk(backupPath, func(appPath string, info os.FileInfo, err error) error {
		if !info.IsDir() && strings.HasSuffix(info.Name(), ".spa") {
			appName := strings.Replace(info.Name(), ".spa", "", 1)
			appExtractToFolder := filepath.Join(extractPath, appName)

			err := utils.Unzip(appPath, appExtractToFolder)
			if err != nil {
				callback("", err)
			} else {
				callback(appName, nil)
			}
		}

		return nil
	})
}