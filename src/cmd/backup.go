package cmd

import (
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"../backup"
	"../preprocess"
	"../status/backup"
	"../utils"
)

// backup
func Backup() {
	backupVersion := backupSection.Key("version").MustString("")
	curBackupStatus := backupstatus.Get(spotifyPath, backupFolder, backupVersion)

	if curBackupStatus != backupstatus.EMPTY {
		utils.PrintWarning("há backup disponível, limpe o backup atual primeiro!")
		ClearBackup()

		backupSection.Key("version").SetValue("")
		cfg.Write()
	}

	utils.PrintBold("recuperando arquivos do app:")

	if err := backup.Start(spotifyPath, backupFolder); err != nil {
		log.Fatal(err)
	}

	appList, err := ioutil.ReadDir(backupFolder)

	if err != nil {
		log.Fatal(err)
	}

	totalApp := len(appList)

	if totalApp > 0 {
		utils.PrintGreen("OK")
	} else {
		utils.PrintError("não é possível fazer backup dos arquivos do aplicativo. reinstale o spotify e tente novamente.")
		os.Exit(1)
	}

	utils.PrintBold("extraindo:")

	tracker := utils.NewTracker(totalApp)

	if quiet {
		tracker.Quiet()
	}

	backup.Extract(backupFolder, rawFolder, tracker.Update)
	tracker.Finish()

	preprocSec := cfg.GetSection("Preprocesses")

	tracker.Reset()

	utils.PrintBold("pré-processando:")

	preprocess.Start(
		rawFolder,

		preprocess.Flag{
			DisableSentry:  preprocSec.Key("disable_sentry").MustInt(0) == 1,
			DisableLogging: preprocSec.Key("disable_ui_logging").MustInt(0) == 1,
			RemoveRTL:      preprocSec.Key("remove_rtl_rule").MustInt(0) == 1,
			ExposeAPIs:     preprocSec.Key("expose_apis").MustInt(0) == 1,
		},

		tracker.Update,
	)

	tracker.Finish()

	utils.RunCopy(rawFolder, themedFolder, []string{"*.html", "*.js", "*.css"})

	tracker.Reset()

	preprocess.StartCSS(themedFolder, tracker.Update)
	tracker.Finish()

	backupSection.Key("version").SetValue(utils.GetSpotifyVersion(spotifyPath))
	cfg.Write()

	utils.PrintSuccess("está tudo pronto, você pode começar a se inscrever agora!")
}

// clearbackup
func ClearBackup() {
	if !quiet {
		if !utils.ReadAnswer("antes de limpar o backup, certifique-se de ter restaurado ou reinstalado o spotify ao estado original. continuar? [y/n]: ", false) {
			os.Exit(1)
		}
	}

	os.RemoveAll(backupFolder)
	os.RemoveAll(rawFolder)
	os.RemoveAll(themedFolder)

	backupSection.Key("version").SetValue("")
	cfg.Write()
}

// função restore
func Restore() {
	backupVersion := backupSection.Key("version").MustString("")
	curBackupStatus := backupstatus.Get(spotifyPath, backupFolder, backupVersion)

	if curBackupStatus == backupstatus.EMPTY {
		utils.PrintError(`você não fez backup.`)

		os.Exit(1)
	} else if curBackupStatus == backupstatus.OUTDATED {
		if !quiet {
			utils.PrintWarning("a versão do spotify e a versão de backup são incompatíveis.")

			if !utils.ReadAnswer("continuar restaurando mesmo assim? [y/n] ", false) {
				os.Exit(1)
			}
		}
	}

	appFolder := filepath.Join(spotifyPath, "Apps")

	os.RemoveAll(appFolder)
	utils.RunCopy(backupFolder, appFolder, []string{"*.spa"})

	utils.PrintSuccess("spotify foi restaurado.")
	utils.RestartSpotify(spotifyPath)
}