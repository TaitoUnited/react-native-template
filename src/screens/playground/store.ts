import create from 'zustand';
import { DevSettings } from 'react-native';

type Store = {
  playgroundVisible: boolean;
  setPlaygroundVisible: (visible: boolean) => void;
};

const store = create<Store>((set) => ({
  playgroundVisible: false,
  setPlaygroundVisible: (visible: boolean) => {
    set({ playgroundVisible: visible });
  },
}));

DevSettings.addMenuItem('Open Playground', () =>
  store.setState({ playgroundVisible: true })
);

export const usePlaygroundStore = store;
