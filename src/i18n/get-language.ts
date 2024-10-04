import { en } from "./languages/en"
import { ptBR } from "./languages/pt-BR"

const languages = {
  en,
  "pt-BR": ptBR,
}

export function getLanguage(lang: string) {
  return languages[lang as keyof typeof languages] ?? languages.en
}
