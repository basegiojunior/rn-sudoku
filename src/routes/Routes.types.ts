import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RoutesList {
  Board = 'Board',
}

export type MainParamList = {
  [RoutesList.Board]: undefined;
};

export type MainNavigationProps = NativeStackNavigationProp<MainParamList>;
