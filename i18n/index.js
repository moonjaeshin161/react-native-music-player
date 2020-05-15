import I18n from 'react-native-i18n';
import en from './locales/en';
import vi from './locales/vi';
import AsyncStorage from '@react-native-community/async-storage';

I18n.fallbacks = true;

export const getLanguage = async () => {
    let currentLanguage = await AsyncStorage.getItem('language');
    if (currentLanguage === null) {
        currentLanguage = 'vi'
    }
    return currentLanguage;
}

const setLanguage = async () => {
    const currentLanguage = await getLanguage();
    I18n.locale = currentLanguage;
}

setLanguage();

I18n.translations = {
    en,
    vi
};

export default I18n;