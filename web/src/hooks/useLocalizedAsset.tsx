import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useLocalizedAsset = () => {
  const { i18n } = useTranslation();

  /**
   * Returns the localized asset path by replacing '/en/' with the current language.
   * @param {string} assetPath - The asset path containing '/en/'
   * @returns {string} - The localized asset path
   */
  const getLocalizedAsset = useCallback(
    (assetPath: string) => {
      const currentLanguage = i18n.resolvedLanguage;
      // Replace '/en/' or '_en.' or '-en.' with the current language
      // Handles svg, png, jpg, etc.
      const localizedAssetPath = assetPath
        .replace(/([/_-])en([._])/g, `$1${currentLanguage}$2`)
        .replace(/([/_-])en\//g, `$1${currentLanguage}/`)
        .replace(/-en-(?=[^-]*$)/, `-${currentLanguage}-`);

      console.log(
        'getLocalizedAsset currentLanguage',
        currentLanguage,
        assetPath,
        localizedAssetPath
      );
      return localizedAssetPath;
    },
    [i18n.resolvedLanguage]
  );

  return { a: getLocalizedAsset };
};
