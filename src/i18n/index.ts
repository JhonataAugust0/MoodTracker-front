import { createI18n } from 'vue-i18n'
import en from './locales/en'
import pt from './locales/pt'

export default createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: {
    en,
    pt
  }
})