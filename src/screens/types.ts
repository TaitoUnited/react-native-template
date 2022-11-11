import type { UnionToIntersection } from 'type-fest';
import type { StackScreenProps } from '@react-navigation/stack';
import type { NavigatorScreenParams } from '@react-navigation/native';

type AuthedNavigation = {
  AuthedStack: Navigator<{
    HomeStack: Navigator<{
      Home: undefined;
    }>;
    SearchStack: Navigator<{
      Search: undefined;
    }>;
    ProfileStack: Navigator<{
      Profile: undefined;
    }>;
    SettingsStack: Navigator<{
      Settings: undefined;
    }>;
  }>;
  PlaygroundStack: Navigator<{
    Playground: undefined;
    Buttons: undefined;
    DesignSystem: undefined;
    Icons: undefined;
    Inputs: undefined;
    Layout: undefined;
    Toast: undefined;
  }>;
};

type UnauthedNavigation = {
  UnauthedStack: Navigator<{
    Landing: undefined;
    Login: undefined;
    Signup: undefined;
  }>;
};

type AppNavigation = UnauthedNavigation & AuthedNavigation;

// --------------------------------- Exports ----------------------------------

export type ParamList = UnionToIntersection<GetParamList<AppNavigation>>;

// Use this in your screen components to get the navigation props typed correctly
export type ScreenProps<T extends keyof ParamList> = StackScreenProps<
  ParamList,
  T
>;

// This ensures that the `useNavigation` hook returns the correct type
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends ParamList {}
  }
}

// ------------------------- Helpers (do not modify) --------------------------
type Screen<Params extends Record<string, any>> = {
  type: 'screen';
  params: Params;
};

type Navigator<
  Children extends Record<string, undefined | Screen<any> | Navigator<any>>
> = {
  type: 'navigator';
  children: Children;
  params: NavigatorScreenParams<any>; // TODO: fix `any` here
};

// eslint-disable-next-line @typescript-eslint/ban-types
type GetParamList<T, K = keyof T, P = {}> = K extends keyof T
  ? T[K] extends Screen<infer Params>
    ? P & Record<K, Params>
    : T[K] extends Navigator<infer Children>
    ? P & Record<K, T[K]['params']> & GetParamList<Children, keyof Children, P>
    : T[K] extends Record<string, any>
    ? P & Record<K, T[K]>
    : P & Record<K, undefined>
  : never;
