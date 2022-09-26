import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import { ArrowSelectorProps } from './ArrowSelector.types';
import ChevronLeft from 'src/assets/chevron-left.svg';
import ChevronRight from 'src/assets/chevron-right.svg';
import { colors } from 'src/styles/colors';

export const ArrowSelector: React.FC<ArrowSelectorProps> = props => {
  const Chevron = useMemo(
    () => (props.direction === 'left' ? ChevronLeft : ChevronRight),
    [props.direction],
  );

  return (
    <Pressable onPress={props.onPress}>
      <Chevron
        fill={props.enable ? colors.black[900] : colors.black[300]}
        height={30}
        width={30}
      />
    </Pressable>
  );
};
