import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RoutesList {
  Board = 'Board',
  Home = 'Home',
}

export type MainParamList = {
  [RoutesList.Board]: undefined;
  [RoutesList.Home]: undefined;
};

export type MainNavigationProps = NativeStackNavigationProp<MainParamList>;
