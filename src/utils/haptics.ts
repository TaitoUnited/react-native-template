import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Determines whether to use haptic feedback.
 *
 * Haptic communication is a highly effective form of nonverbal communication in native applications.
 *
 * It is for example used to communicate clicks, selections, or the apperance of a toast message.
 */
const USE_HAPTICS = true;

export const HapticFeedback = {
  impactLight: 'impactLight',
  impactMedium: 'impactMedium',
  impactHeavy: 'impactHeavy',
  selection: 'selection',
  notificationSuccess: 'notificationSuccess',
  notificationWarning: 'notificationWarning',
  notificationError: 'notificationError',
} as const;

export type HapticFeedbackType =
  (typeof HapticFeedback)[keyof typeof HapticFeedback];

const createHapticHandler = (type: Haptics.ImpactFeedbackStyle) => {
  return () => Haptics.impactAsync(type);
};
const createNotificationFeedback = (type: Haptics.NotificationFeedbackType) => {
  return () => Haptics.notificationAsync(type);
};
// Function to trigger haptics based on the feedback type
const hapticToTrigger = (haptic: HapticFeedbackType) => {
  if (!USE_HAPTICS || Platform.OS === 'web') return () => {};

  switch (haptic) {
    case HapticFeedback.impactLight:
      return createHapticHandler(Haptics.ImpactFeedbackStyle.Light);
    case HapticFeedback.impactMedium:
      return createHapticHandler(Haptics.ImpactFeedbackStyle.Medium);
    case HapticFeedback.impactHeavy:
      return createHapticHandler(Haptics.ImpactFeedbackStyle.Heavy);
    case HapticFeedback.selection:
      return () => Haptics.selectionAsync();
    case HapticFeedback.notificationSuccess:
      return createNotificationFeedback(
        Haptics.NotificationFeedbackType.Success
      );
    case HapticFeedback.notificationWarning:
      return createNotificationFeedback(
        Haptics.NotificationFeedbackType.Warning
      );
    case HapticFeedback.notificationError:
      return createNotificationFeedback(Haptics.NotificationFeedbackType.Error);
    default:
      return () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};

export const haptics = {
  selection: hapticToTrigger(HapticFeedback.selection),
  impactLight: hapticToTrigger(HapticFeedback.impactLight),
  impactMedium: hapticToTrigger(HapticFeedback.impactMedium),
  impactHeavy: hapticToTrigger(HapticFeedback.impactHeavy),
  notificationSuccess: hapticToTrigger(HapticFeedback.notificationSuccess),
  notificationWarning: hapticToTrigger(HapticFeedback.notificationWarning),
  notificationError: hapticToTrigger(HapticFeedback.notificationError),
};
