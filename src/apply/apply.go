package apply

import (
	"io/ioutil"
	"os"
	"path/filepath"
)

func getUserCSS(apoloFolder, themeName string) string {
	cssFilePath := filepath.Join(apoloFolder, "Themes", themeName, "user.css")
	_, err := os.Stat(cssFilePath)

	if os.IsExist(err) {
		content, err := ioutil.ReadFile(cssFilePath)

		if err == nil {
			return string(content)
		}
	}

	cssFilePath = filepath.Join("./", "Themes", themeName, "user.css")
	_, err = os.Stat(cssFilePath)

	if os.IsNotExist(err) {
		return ""
	}

	content, err := ioutil.ReadFile(cssFilePath)
	if err != nil {
		return ""
	}

	return string(content)
}