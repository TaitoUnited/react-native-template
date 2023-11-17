import { useEffect, useState } from 'react';
import * as ExpoStoreReview from 'expo-store-review';
import { Trans, t } from '@lingui/macro';
import { differenceInSeconds } from 'date-fns';

import { showToast } from './Toaster';

import ImprovementForm from '~components/store-review/ImprovementForm';
import {
  BottomSheet,
  FillButton,
  OutlineButton,
  Stack,
  Text,
} from '~components/uikit';
import storage from '~utils/storage';
import { styled } from '~styles';

const DAYS_TO_WAIT_BEFORE_ASKING_AGAIN = 7 * 24 * 60 * 60; // 7 days

export default function StoreReview() {
  const [open, setOpen] = useState<boolean>(false);
  const [improvementRequest, setImprovementRequest] = useState<boolean>(false);

  useEffect(() => {
    const persistedHasReviewed = storage.getBoolean('@app/review-done');
    const getReviewDate = async () => {
      if (await ExpoStoreReview.hasAction()) {
        const persistedLastAsked = storage.getNumber(
          '@app/review-last-requested'
        );
        if (persistedLastAsked) {
          const differenceInDaysValue = differenceInSeconds(
            new Date(),
            new Date(persistedLastAsked)
          );
          // Check if the difference is a week or more
          const isWeekOrMoreOld =
            differenceInDaysValue >= DAYS_TO_WAIT_BEFORE_ASKING_AGAIN;

          if (isWeekOrMoreOld) {
            setOpen(true);
            updateLastAsked();
          }
        } else {
          updateLastAsked();
        }
      }
    };

    if (!persistedHasReviewed) {
      setTimeout(() => {
        getReviewDate();
      }, 10000); // Wait for 10 seconds before asking for review (To be removed once we implement it in a strategic place)
    }
  }, []);

  const updateLastAsked = () => {
    storage.set('@app/review-last-requested', new Date().getTime());
  };

  async function requestReview() {
    try {
      if (await ExpoStoreReview.hasAction()) {
        await ExpoStoreReview.requestReview();
        storage.set('@app/review-done', true);
      }
    } catch (error) {
      console.log('> Error requesting review: ', error);
      showToast({
        title: t`An error occurred while requesting review`,
        subtitle: t`Sorry about the inconvenience`,
        type: 'error',
      });
    } finally {
      setOpen(false);
    }
  }

  function Feedback() {
    return (
      <FeedbackWrapper axis="y" spacing="normal" align="center">
        <Text variant="title3">
          <Trans>Enjoying the app?</Trans>
        </Text>
        <FillButton
          variant="primary"
          onPress={requestReview}
          icon="heartFilled"
          iconSide="start"
          style={{ width: '75%' }}
        >
          <Trans>Loving it</Trans>
        </FillButton>
        <OutlineButton
          variant="neutral"
          onPress={() => setImprovementRequest(true)}
          style={{ width: '75%' }}
        >
          <Trans>Could be better</Trans>
        </OutlineButton>
      </FeedbackWrapper>
    );
  }

  return (
    open && (
      <BottomSheet
        initialIndex={improvementRequest ? 1 : 0}
        snapPoints={['25%', '35%']}
        keyboardBehavior="fillParent"
        onSheetChanges={(index) => {
          // Close the bottom sheet when the user swipes down
          if (index === -1) {
            setOpen(false);
          }
        }}
      >
        {!improvementRequest && <Feedback />}
        {improvementRequest && (
          <ImprovementForm
            setOpen={setOpen}
            setImprovementRequest={setImprovementRequest}
          />
        )}
      </BottomSheet>
    )
  );
}

const FeedbackWrapper = styled(Stack, {
  width: '100%',
  paddingHorizontal: '$normal',
  marginTop: -20,
});
