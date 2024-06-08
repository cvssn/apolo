package utils

import (
	"log"
	"os"
)

// printwarning - printa uma mensagem de alerta
func PrintWarning(text string) {
	log.Println("\x1B[33mwarning\033[0m", text)
}

// printerror - printa uma mensagem de erro
func PrintError(text string) {
	log.Println("\x1B[31merror\033[0m", text)
}

// printsuccess - printa uma mensagem de sucesso
func PrintSuccess(text string) {
	log.Println("\x1B[32msuccess\033[0m", text)
}

// printinfo - printa uma mensagem informativa
func PrintInfo(text string) {
	log.Println("\x1B[34minfo\033[0m", text)
}

// printgreen - printa uma mensagem verde
func PrintGreen(text string) {
	log.Println("\x1B[32m" + text + "\033[0m")
}

// printred - printa uma mensagem vermelha
func PrintRed(text string) {
	log.Println("\x1B[31m" + text + "\033[0m")
}

// printbold - printa uma mensagem em negrito
func PrintBold(text string) {
	log.Println("\x1B[1m" + text + "\033[0m")
}

// fatal - printa uma mensagem fatal e deixa o processo
func Fatal(err error) {
	log.Println("\x1B[31mfatal\033[0m", err)
	
	os.Exit(1)
}