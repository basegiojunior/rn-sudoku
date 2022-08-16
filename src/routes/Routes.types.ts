import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RoutesList {
  Home = 'Home',
}

export type MainParamList = {
  [RoutesList.Home]: undefined;
};

export type MainNavigationProps = NativeStackNavigationProp<MainParamList>;
