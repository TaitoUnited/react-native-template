import { Trans } from '@lingui/macro';
import { Linking, TouchableWithoutFeedback } from 'react-native';

import config from '~constants/config';
import { Checkbox, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

type Props = {
  accepted: boolean;
  onToggleAccepted: () => void;
};

export default function TermsOfService({ accepted, onToggleAccepted }: Props) {
  return (
    <Stack axis="x" spacing="xsmall">
      <Checkbox
        value="TermsOfService"
        label=""
        checked={accepted}
        onChange={onToggleAccepted}
      />
      <TextWrapper>
        <Text>
          <Trans>I accept</Trans>{' '}
          <TouchableWithoutFeedback onPress={openTermsOfService}>
            <Text variant="bodyBold">
              <Trans>the Terms of Service</Trans>
            </Text>
          </TouchableWithoutFeedback>{' '}
          <Trans>and have read</Trans>{' '}
          <TouchableWithoutFeedback onPress={openPrivacyPolicy}>
            <Text variant="bodyBold">
              <Trans>the Privacy Policy</Trans>
            </Text>
          </TouchableWithoutFeedback>
        </Text>
      </TextWrapper>
    </Stack>
  );
}
async function openTermsOfService() {
  try {
    await Linking.openURL(config.TERMS_OF_SERVICE_URL);
  } catch (error) {
    console.log('> Failed to open privacy policy url');
  }
}

async function openPrivacyPolicy() {
  try {
    await Linking.openURL(config.PRIVACY_POLICY_URL);
  } catch (error) {
    console.log('> Failed to open privacy policy url');
  }
}

const TextWrapper = styled('View', {
  flex: 1,
});
