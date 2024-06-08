package cmd

import (
	"log"

	"../utils"
	"github.com/go-ini/ini"
)

// setdevtool habilita/desabilita o modo desenvolvedor do cliente spotify
func setDevTool(enable bool) {
	pref, prefFilePath, err := utils.GetPrefsCfg(spotifyPath)

	if err != nil {
		log.Fatal(err)
	}

	rootSection, err := pref.GetSection("")
	
	if err != nil {
		log.Fatal(err)
	}

	devTool := rootSection.Key("app.enable-developer-mode")

	if enable {
		devTool.SetValue("true")
	} else {
		devTool.SetValue("false")
	}

	ini.PrettyFormat = false

	if pref.SaveTo(prefFilePath) == nil {
		if enable {
			utils.PrintSuccess("devtool ativado! reinicie seu cliente spotify.")
		} else {
			utils.PrintSuccess("devtool desativado! reinicie seu cliente spotify.")
		}
	}
}