import { sharedLang } from 'betfinio_app/locales/index';
import type { i18n } from 'i18next';
import * as i18 from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import czAcademy from './translations/cz/academy.json';
import enAcademy from './translations/en/academy.json';
import ruAcademy from './translations/ru/academy.json';

export const defaultNS = 'academy';

export const resources = {
	en: {
		academy: enAcademy,
		shared: sharedLang.en,
	},
	ru: {
		academy: ruAcademy,
		shared: sharedLang.ru,
	},
	cz: {
		academy: czAcademy,
		shared: sharedLang.cz,
	},
} as const;

const instance: i18n = i18.createInstance();
instance
	.use(initReactI18next)
	.use(ICU)
	.use(I18nextBrowserLanguageDetector)
	.init({
		resources,
		fallbackLng: 'en',
		defaultNS,
		interpolation: { escapeValue: false },
		react: { useSuspense: true },
	});

export default instance;
