import { IconName } from '~components/uikit/Icon';

type Cards = {
  title: string;
  icon: IconName;
  text: string;
}[];

export const features: Cards = [
  {
    // TODO! Add react native aria to project and uikit components
    title: 'Accessibility',
    icon: 'fullBody',
    text: 'Good accessibility is a something that should be expected from every app. The building blocks for creating accessible components are provided by React Aria. This template has pre-built UI kit components, such as Button, Text, TextInput, etc., that have accessibility baked into them. You can use and extend this UI kit to fit your needs.',
  },
  {
    title: 'Authentication',
    icon: 'logout',
    text: 'Practically every app needs to have a way to log in the user. This template provides a barebones authentication setup that should be extended to have a real way to log in the user either with a cookie or JWT based authentication method.',
  },
  {
    title: 'Dark Mode',
    icon: 'lightningOutline',
    text: "Having dark mode support is a common ask from users nowadays. This template has a ready-to-use theming setup with light and dark themes that can be easily modified to conform to the client's branding. Try to toggle the theme in the top right corner.",
  },
  {
    title: 'Design System',
    icon: 'pencil',
    text: 'A minimal design system provides a set of UI kit components that adhere to certain design principles backed by a set of design tokens. This template defines a comprehensive set of design tokens for things like colors, typography, spacing, etc. in a globally available theme object. Additionally, the design system incorporates a UI kit that is browsable in Storybook.',
  },
  {
    title: 'Internationalization',
    icon: 'languageGlobe',
    text: 'Most apps will require internationalization at some point in their lifetime. This template the necessary setup for multiple languages that are loaded lazily once selected. Try changing the language in the top right corner.',
  },
  {
    title: 'Route Preloading',
    icon: 'sortVertical',
    text: "Speed is one of the most important aspects of a good UX. This template introduces a pattern for preloading route's data and code-split code in order to make page transitions feel instant.",
  },
  {
    title: 'Skeleton Placeholders',
    icon: 'paperclip',
    text: 'Spinners, so many spinners, everywhere. Traditional Single-Page-Applications usually show spinners while loading data for a given page. Instead of showing simple spinners this template offers a way to implement skeleton placeholders for pages with a cool shimmering effect.',
  },
  {
    title: 'Splash Screen',
    icon: 'fullBody',
    text: 'No one likes looking at a blank screen. This template implements a traditional Single-Page-Application which means that the initial JS bundle has to downloaded before the app can render. A nice looking splash screen can be shown until the app is ready to render making the app loading UX more pleasant.',
  },
];
