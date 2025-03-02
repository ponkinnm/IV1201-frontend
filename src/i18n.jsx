import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import sv from './locales/sv.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language is English
	fallbackLng: 'en', 
    resources: {
        en: {
            HomePage: en.HomePage,
            SignInForm: en.SignInForm,
			ForgotPassword: en.ForgotPassword,
			LoggedInUser: en.LoggedInUser,
			ListApplicants: en.ListApplicants,
			ApplicantTable: en.ApplicantTable,
			ViewApplicant: en.ViewApplicant,
			ApplicationDetails: en.ApplicationDetails,
			Application: en.Application,
			ApplicationForm: en.ApplicationForm,
			NotFound: en.NotFound
        },
        sv: {
            HomePage: sv.HomePage,
            SignInForm: sv.SignInForm,
			ForgotPassword: sv.ForgotPassword,
			LoggedInUser: sv.LoggedInUser,
			ListApplicants: sv.ListApplicants,
			ApplicantTable: sv.ApplicantTable,
			ViewApplicant: sv.ViewApplicant,
			ApplicationDetails: sv.ApplicationDetails,
			Application: sv.Application,
			ApplicationForm: sv.ApplicationForm,
			NotFound: sv.NotFound
        },
    },
    interpolation: { escapeValue: false } //Allow translation containing html
  });
export default i18n;
