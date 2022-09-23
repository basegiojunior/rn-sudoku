import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import { ArrowSelectorProps } from './ArrowSelector.types';
import ChevronLeft from 'src/assets/chevron-left.svg';
import ChevronRight from 'src/assets/chevron-right.svg';

export const ArrowSelector: React.FC<ArrowSelectorProps> = props => {
  const Chevron = useMemo(
    () => (props.direction === 'left' ? ChevronLeft : ChevronRight),
    [props.direction],
  );

  return (
    <Pressable onPress={props.onPress}>
      <Chevron
        fill={props.enable ? '#131313' : '#9e9e9e'}
        height={30}
        width={30}
      />
    </Pressable>
  );
};
