import { Trans, t } from '@lingui/macro';
import { differenceInDays } from 'date-fns';
import * as ExpoStoreReview from 'expo-store-review';
import { useEffect, useState } from 'react';

import ImprovementForm from '~components/store-review/ImprovementForm';
import {
  BottomSheet,
  FillButton,
  OutlineButton,
  Stack,
  Text,
} from '~components/uikit';
import { styled } from '~styles';
import storage from '~utils/storage';

import { showToast } from '../common/Toaster';

const DAYS_TO_WAIT_BEFORE_ASKING_AGAIN = 7;
const DAYS_BETWEEN_REVIEWS = 365;

export default function StoreReview() {
  const [open, setOpen] = useState(false);
  const [improvementRequest, setImprovementRequest] = useState(false);

  useEffect(() => {
    const persistedHasReviewed = storage.getNumber('@app/last-review-done');
    const getReviewDate = async () => {
      try {
        if (await ExpoStoreReview.hasAction()) {
          const persistedLastAsked = storage.getNumber(
            '@app/last-requested-review'
          );
          if (persistedLastAsked) {
            const differenceInDaysValue = differenceInDays(
              new Date(),
              new Date(persistedLastAsked)
            );
            // Check if the difference is a week or more
            const isWeekOrMoreOld =
              differenceInDaysValue >= DAYS_TO_WAIT_BEFORE_ASKING_AGAIN;

            if (!isWeekOrMoreOld) {
              setOpen(true);
              updateLastAsked();
            }
          } else {
            setOpen(true);
            updateLastAsked();
          }
        }
      } catch (error) {
        console.log('> Error checking if review is available: ', error);
      }
    };

    // Check if the user has already reviewed the app in the last year
    if (
      persistedHasReviewed &&
      differenceInDays(new Date(), new Date(persistedHasReviewed)) >=
        DAYS_BETWEEN_REVIEWS
    ) {
      setTimeout(() => {
        getReviewDate();
      }, 10000); // Wait for 10 seconds before asking for review (To be removed once we implement it in a strategic place)
    }
  }, []);

  const updateLastAsked = () => {
    storage.set('@app/last-requested-review', new Date().getTime());
  };

  async function requestReview() {
    try {
      if (await ExpoStoreReview.hasAction()) {
        await ExpoStoreReview.requestReview();
        storage.set('@app/last-review-done', new Date().getTime());
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
      <FeedbackWrapper axis="y" spacing="regular" align="center">
        <Text variant="headingS">
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
        onSheetChange={(index) => {
          // Close the bottom sheet when the user swipes down
          if (index === -1) {
            setOpen(false);
          }
        }}
      >
        {improvementRequest ? (
          <ImprovementForm
            onDone={() => setOpen(false)}
            onCancel={() => setImprovementRequest(false)}
          />
        ) : (
          <Feedback />
        )}
      </BottomSheet>
    )
  );
}

const FeedbackWrapper = styled(Stack, {
  width: '100%',
  paddingHorizontal: '$regular',
});
