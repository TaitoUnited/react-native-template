// You can find more info about accessibility in React Native in the official documentation: https://reactnative.dev/docs/accessibilityinfo

import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Announces a message for accessibility using the screen reader.
 *
 * This function is typically used to inform the user about actions that occur without any user interaction,
 * such as a modal closing automatically or an alert showing up.
 *
 * @param options - The options for announcing the message.
 * @param options.message - The message to be announced.
 * @param options.queue - Specifies whether the announcement should be queued if there is already an ongoing announcement. Defaults to `false`.
 * @param options.delay - The delay (in milliseconds) before announcing the message. If specified, the announcement will be delayed by the specified amount. Defaults to `undefined`.
 */
export function announceForAccessibility({
  message,
  queue = false,
  delay,
}: {
  message: string;
  queue?: boolean;
  delay?: number;
}) {
  if (delay) {
    setTimeout(() => {
      AccessibilityInfo.announceForAccessibilityWithOptions(message, {
        queue,
      });
    }, delay);
  } else {
    AccessibilityInfo.announceForAccessibilityWithOptions(message, {
      queue,
    });
  }
}

/**
 * Checks if the screen reader is enabled.
 *
 * This can be used, for example, to prevent an automatic carousel from switching photos when the screen reader is on.
 *
 * @returns {boolean} - True if the screen reader is enabled, false otherwise.
 */
export function useIsScreenReaderEnabled() {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

  useEffect(() => {
    const getAccessibilityInfo = async () => {
      const screenReaderEnabled =
        await AccessibilityInfo.isScreenReaderEnabled();

      setIsScreenReaderEnabled(screenReaderEnabled);
    };

    getAccessibilityInfo();
  }, []);

  return isScreenReaderEnabled;
}
