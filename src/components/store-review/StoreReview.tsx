import { Trans, msg } from '@lingui/macro';
import { differenceInDays } from 'date-fns';
import * as ExpoStoreReview from 'expo-store-review';
import { useEffect, useState } from 'react';

import ImprovementForm from '~components/store-review/ImprovementForm';
import { BottomSheet, Button, Stack, Text } from '~components/uikit';
import { useI18n } from '~services/i18n';
import { styled } from '~styles';
import storage, { STORAGE_KEYS } from '~utils/storage';

import { showToast } from '../common/Toaster';

const DAYS_TO_WAIT_BEFORE_ASKING_AGAIN = 7;
const DAYS_BETWEEN_REVIEWS = 365;

export default function StoreReview() {
  const { _ } = useI18n();
  const [open, setOpen] = useState(false);
  const [improvementRequest, setImprovementRequest] = useState(false);

  useEffect(() => {
    const persistedHasReviewed = storage.getNumber(
      STORAGE_KEYS.APP_REVIEW_DONE
    );
    const getReviewDate = async () => {
      try {
        if (await ExpoStoreReview.hasAction()) {
          const persistedLastAsked = storage.getNumber(
            STORAGE_KEYS.APP_REVIEW_LAST_REQUESTED
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
    storage.set(STORAGE_KEYS.APP_REVIEW_LAST_REQUESTED, new Date().getTime());
  };

  async function requestReview() {
    try {
      if (await ExpoStoreReview.hasAction()) {
        await ExpoStoreReview.requestReview();
        storage.set(STORAGE_KEYS.APP_REVIEW_DONE, new Date().getTime());
      }
    } catch (error) {
      console.log('> Error requesting review: ', error);
      showToast({
        title: _(msg`An error occurred while requesting review`),
        subtitle: _(msg`Sorry about the inconvenience`),
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
        <Button
          variant="filled"
          onPress={requestReview}
          icon="heartFilled"
          style={{ width: '75%' }}
        >
          <Trans>Loving it</Trans>
        </Button>
        <Button
          variant="outlined"
          onPress={() => setImprovementRequest(true)}
          style={{ width: '75%' }}
        >
          <Trans>Could be better</Trans>
        </Button>
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
