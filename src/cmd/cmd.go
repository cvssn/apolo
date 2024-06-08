package cmd

import (
	"os"
	"path/filepath"
	"runtime"

	"../utils"
	"github.com/go-ini/ini"
)

var (
	apoloFolder             = getApoloFolder()
	rawFolder, themedFolder = getExtractFolder()
	backupFolder            = getBackupFolder()
	quiet                   bool
	spotifyPath             string
	cfg                     utils.Config
	settingSection          *ini.Section
	backupSection           *ini.Section
	featureSection          *ini.Section
)

// init
func Init(isQuiet bool) {
	quiet = isQuiet

	cfg = utils.ParseConfig(filepath.Join(apoloFolder, "config.ini"))
	
	settingSection = cfg.GetSection("Setting")
	backupSection = cfg.GetSection("Backup")
	featureSection = cfg.GetSection("AdditionalOptions")

	spotifyPath = settingSection.Key("spotify_path").String()

	if len(spotifyPath) == 0 {
		utils.PrintError(`por favor configure "spotify_path" em config.ini`)
		os.Exit(1)
	}

	if _, err := os.Stat(spotifyPath); err != nil {
		utils.PrintError(spotifyPath + ` não existe ou não é um caminho válido. por favor, defina "spotify_path" em config.ini para corrigir o diretório do spotify.`)
		os.Exit(1)
	}
}

// getconfigpath
func GetConfigPath() string {
	return cfg.GetPath()
}

// getspotifypath
func GetSpotifyPath() string {
	return spotifyPath
}

func getApoloFolder() string {
	home := "/"

	if runtime.GOOS == "windows" {
		home = os.Getenv("USERPROFILE")
	} else if runtime.GOOS == "linux" || runtime.GOOS == "darwin" {
		home = os.Getenv("HOME")
	}

	result := filepath.Join(home, ".apolo")

	utils.CheckExistAndCreate(result)

	return result
}

func getBackupFolder() string {
	dir := filepath.Join(apoloFolder, "Backup")
	utils.CheckExistAndCreate(dir)

	return dir
}

func getExtractFolder() (string, string) {
	dir := filepath.Join(apoloFolder, "Extracted")
	utils.CheckExistAndCreate(dir)

	raw := filepath.Join(dir, "Raw")
	utils.CheckExistAndCreate(raw)

	themed := filepath.Join(dir, "Themed")
	utils.CheckExistAndCreate(themed)

	return raw, themed
}

func getThemeFolder(themeName string) string {
	folder := filepath.Join(apoloFolder, "Themes", themeName)
	_, err := os.Stat(folder)

	if err == nil {
		return folder
	}

	folder = filepath.Join(utils.GetExecutableDir(), "Themes", themeName)
	_, err = os.Stat(folder)

	if err == nil {
		return folder
	}

	utils.PrintError(`tema "` + themeName + `" não encontrado`)
	os.Exit(1)

	return ""
}