import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          access: 'Accessible',
          aed_layers: 'AEDs',
          aed_247: '24/7',
          aed_day: 'only available during opening hours',
          aed_by_opening_hours: 'currently available AEDs',
          base_layer: 'Base Layer',
          cancel: 'Cancel',
          close: 'Close',
          contact_support: 'Contact Support',
          default_error: 'An error occured. Please try again or contact our support.',
          defikarte_titel: 'The AED Map of Switzerland',
          description: 'Description',
          environment_info: 'You are using propably a non production deployment. Environment name:',
          error_api:
            'An error occured while sending the request. Try again, or contact our support if error occures again and again. Errormessage: <1>{{errorMsg}}</1>',
          error_api_title: 'Request was not successful!',
          error_description: 'Max length allowed is 200.',
          error_location: 'Location is required, max length is 200.',
          error_openinghours: 'The entered opening hours does not match the pattern needed.',
          error_operatorphone: 'Not a valid phonenumber.',
          error_pos: 'Position is required. Select position on the map.',
          error_reporter: 'Reporter is required.',
          indoor: 'Indoor',
          in_partnership_with: 'In partnership with',
          layer_settings: 'Layer settings',
          level: 'Level',
          location: 'Location',
          openinghours: 'Opening hours',
          operator: 'Operator',
          operatorphone: 'Operators phone',
          osm_swiss: 'OSM Switzerland',
          osm_common: 'OSM',
          placeholder_description: 'i.e.: while Store is open',
          placeholder_level: '6',
          placeholder_location: 'Schoolhouse Zurich West, near entrance',
          placeholder_operator: 'Municipality, association, private person',
          placeholder_operatorphone: '+41 79 000 00 00',
          placeholder_openinghours: '24/7 or Mo-Fr: 08:00-17:00',
          placeholder_reporter: 'John Doe',
          position: 'Position',
          reporter: 'Reporter',
          satellite: 'Satellite',
          select: 'Confirm position',
          start: 'Create new AED',
          step_one: '1. Select position',
          step_success: 'AED successful created!',
          step_two: '2. Add informationen',
          submit: 'Create',
          swisstopo: 'Swisstopo',
          thanks: 'Thank you for your support! The AED will appear in the next hours on the map.',
          title: 'Report AED',
          try_again: 'Try again',
        },
      },
      de: {
        translation: {
          access: 'Zugänglich',
          aed_layers: 'Defibrillatoren',
          aed_247: '24/7',
          aed_day: 'nur zu Öffnungszeiten vefügbar',
          aed_by_opening_hours: 'aktuell verfügbare AEDs',
          base_layer: 'Basiskarte',
          cancel: 'Abbrechen',
          close: 'Schliessen',
          contact_support: 'Support kontaktieren',
          default_error:
            'Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere unseren Support.',
          defikarte_titel: 'Die Defikarte der Schweiz',
          description: 'Beschreibung',
          environment_info:
            'Dies ist möglicherweise keine produktive Version der Webseite. Versionsname:',
          error_api:
            'Es ist ein Fehler beim Erstellen des Defibrillators aufgetreten. Versuche es noch einmal,  bitte kontaktiere bei wiederholtem Fehler unseren Support. Fehlermeldung: <1>{{errorMsg}}</1>',
          error_api_title: 'Defibrillator konnte nicht gemeldet werden!',
          error_description: 'Die maximale Länge beträgt 200 Zeichen',
          error_location: 'Der Standort wird benötigt, maximale Länge 200 Zeichen',
          error_openinghours:
            'Die eingegebenen Öffnungzeiten entsprechen nicht dem geforderten Format.',
          error_operatorphone: 'Der Wert muss eine gültige Telefonummer sein.',
          error_pos: 'Die Position ist erforderlich. Wähle die Position auf der Karte aus.',
          error_reporter: 'Der Melder ist erforderlich.',
          indoor: 'Im Gebäude',
          in_partnership_with: 'In Partnerschaft mit',
          layer_settings: 'Karteneinstellungen',
          level: 'Stockwerk in Nummern',
          location: 'Standort',
          openinghours: 'Öffnungszeiten',
          operator: 'Betreiber',
          operatorphone: 'Telefon (im internationalen Format +41 XX)',
          osm_swiss: 'OSM Schweiz',
          osm_common: 'OSM',
          placeholder_description: 'z.B.: während Öffnungszeiten verfügbar',
          placeholder_level: '0',
          placeholder_location: 'Schulhaus Zürich West, neben Eingang',
          placeholder_operator: 'Gemeinde, Verein, Privatperson',
          placeholder_operatorphone: '+41 79 000 00 00',
          placeholder_openinghours: '24/7 oder Mo-Fr: 08:00-17:00',
          placeholder_reporter: 'Max Mustermann',
          position: 'Koordinaten',
          reporter: 'Melder',
          satellite: 'Satellit',
          select: 'Position bestätigen',
          select_position: 'Position auswählen',
          start: 'Neuer Defibrillator erfassen',
          step_one: '1. Position auswählen',
          step_success: 'Defibrillator erfolgreich erfasst!',
          step_two: '2. Informationen erfassen',
          submit: 'Meldung absenden',
          swisstopo: 'Swisstopo',
          thanks:
            'Besten Dank für deine Unterstützung! Der Defibrillator wird innerhalb der nächsten Stunden auf der Karte erscheinen.',
          title: 'Defibrillator melden',
          try_again: 'Erneut versuchen',
        },
      },
    },
  });

export default i18n;
