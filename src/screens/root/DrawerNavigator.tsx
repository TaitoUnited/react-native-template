import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useDefaultDrawerScreenOptions } from '~screens/utils';
import { Icon } from '~components/uikit';
import { IconName } from '~components/uikit/Icon';
import type { DrawersParamList } from '~screens/types';

import HomeNavigator from '~screens/drawer/home';
import QrScannerNavigator from '~screens/drawer/qr-scanner';
import TimerNavigator from '~screens/drawer/timer';
import BluetoothNavigator from '~screens/drawer/bluetooth';
import MapsNavigator from '~screens/drawer/maps';
import PaymentNavigator from '~screens/drawer/payment';
import FileUploadNavigator from '~screens/drawer/file-upload';
import MessagingNavigator from '~screens/drawer/messaging';
import FrisbeeNavigator from '~screens/drawer/frisbee';

const Drawer = createDrawerNavigator();

type DrawersList = {
  title: keyof DrawersParamList;
  name: string;
  iconFilled: IconName;
  iconOutlined: IconName;
  screen: () => JSX.Element;
}[];

const drawers: DrawersList = [
  {
    title: 'HomeDrawers',
    name: 'Home',
    iconFilled: 'homeFilled',
    iconOutlined: 'homeOutlined',
    screen: HomeNavigator,
  },
  {
    title: 'TimerDrawers',
    name: 'Timer',
    iconFilled: 'stopwatchFilled',
    iconOutlined: 'stopwatchOutlined',
    screen: TimerNavigator,
  },
  {
    title: 'QrScannerDrawers',
    name: 'QrScanner',
    iconFilled: 'qrCode',
    iconOutlined: 'qrCode',
    screen: QrScannerNavigator,
  },
  {
    title: 'BluetoothDrawers',
    name: 'Bluetooth',
    iconFilled: 'bluetoothFilled',
    iconOutlined: 'bluetoothOutlined',
    screen: BluetoothNavigator,
  },
  {
    title: 'MapsDrawers',
    name: 'Maps',
    iconFilled: 'mapPinFilled',
    iconOutlined: 'mapPinOutlined',
    screen: MapsNavigator,
  },
  {
    title: 'PaymentDrawers',
    name: 'Payment',
    iconFilled: 'creditCardFilled',
    iconOutlined: 'creditCardOutlined',
    screen: PaymentNavigator,
  },
  {
    title: 'FileUploadDrawers',
    name: 'FileUpload',
    iconFilled: 'folderArrowDownFilled',
    iconOutlined: 'folderArrowDownOutlined',
    screen: FileUploadNavigator,
  },
  {
    title: 'MessagingDrawers',
    name: 'Messaging',
    iconFilled: 'envelopeFilled',
    iconOutlined: 'envelopeOutlined',
    screen: MessagingNavigator,
  },
  {
    title: 'FrisbeeDrawers',
    name: 'Frisbee',
    iconFilled: 'trophyFilled',
    iconOutlined: 'trophyOutlined',
    screen: FrisbeeNavigator,
  },
];

export default function DrawerNavigator() {
  const screenOptions = useDefaultDrawerScreenOptions();

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      initialRouteName="HomeDrawers"
    >
      {drawers.map(({ title, name, iconFilled, iconOutlined, screen }) => (
        <Drawer.Screen
          key={title}
          name={title}
          component={screen}
          options={{
            headerTitle: name,
            drawerIcon: ({ focused }) => (
              <Icon name={focused ? iconFilled : iconOutlined} />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
