# Crash reporting and debug logs

For setting up sentry, see the relevant part in root [README.md](../README.md).

### Sentry logging

Log in to (sentry)(https://sentry.io/auth/login). Go to your project.

There, you can view errors thrown by your app. See stacktraces and breadcrumbs, e.g. data logged by sentry before the error occurred, these might include information such as network capability change events, battery events or app backgrounding.

Each error entry will also show detailed logs to the phone's state such as memory available, battery level, battery temperature, and much more.

You can search for the issues from the feed by different filters.

To send custom logs, you can use `Sentry.captureMessage("message")`. To manually send an error that you have for example caught, you can use `Sentry.captureException(error)`.

See further info: https://docs.sentry.io/platforms/react-native/

# Android crash reporting

In Google Play Console, you can find reports of crashes in a section called Monitor and improve (Finnish: Seuraa ja paranna) > Android Vitals. These may give further insight to your app crashes, but they are grouped and not as individualized data as what Sentry will offer.

# IOS crash reporting

TODO

