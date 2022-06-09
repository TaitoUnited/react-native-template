import { t } from '@lingui/macro';
import { useState } from 'react';
import { Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  languageOptions,
  localeValueToLabel,
} from '~components/settings/LanguageSelect';
import { PickerModal } from '~components/uikit';
import { Locale, useI18n } from '~services/i18n';
import { styled } from '~styles';
import * as icons from '~styles/tokens/icons';

// NOTE: Component is being used in landing page where dark mode cannot be supported atm.
// Therefore, we'll use fixed colors for now.
export function LanguageIconButton() {
  const [isOpen, setOpen] = useState(false);
  const { changeLocale, locale } = useI18n();

  const confirmLanguageChange = async (newLocale: Locale) => {
    if (newLocale === locale) return;
    const label = localeValueToLabel(newLocale);
    Alert.alert(
      t`Are you sure you want to change language to ${`"${label}"`}?`,
      t`Application will have to reload to apply changes`,
      [
        { text: t`Cancel`, style: 'cancel' },
        {
          text: t`Change language`,
          onPress: async () => await changeLocale(newLocale),
        },
      ],
    );
  };

  return (
    <>
      <Button onPress={() => setOpen(!isOpen)}>
        <SvgXml xml={icons.languageGlobe} width={24} height={24} color="#fff" />
      </Button>
      <PickerModal
        isVisible={isOpen}
        label={t`Change language`}
        onOptionSelect={(option) => confirmLanguageChange(option as Locale)}
        onClose={() => setOpen(false)}
        options={languageOptions}
        selected={locale}
      />
    </>
  );
}

// NOTE: use fixed border color to avoid border color change when changing light/dark mode
const Button = styled('TouchableOpacity', {
  flexCenter: 'row',
  borderRadius: '$medium',
  padding: '$small',
  borderWidth: 1,
  borderColor: '#fff',
});
