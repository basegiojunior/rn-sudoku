import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SelectorProps } from './Selector.types';
import styles from './Selector.style';
import ArrowSelector from './components/ArrowSelector';

export const Selector = <T extends unknown>(props: SelectorProps<T>) => {
  const [textSize, setTextSize] = useState(10000);
  const scrollRef = useRef<ScrollView>(null);
  const [indexSelected, setIndexSelected] = useState(
    props.items.findIndex(item => item === props.itemSelected) || 0,
  );

  function changeIndex(newIndex: number) {
    scrollRef?.current?.scrollTo({ x: textSize * newIndex });
    setIndexSelected(newIndex);
    props.onChange(props.items[newIndex]);
  }

  function onPressChevronLeft() {
    if (indexSelected > 0) {
      const newIndexSelected = indexSelected - 1;
      changeIndex(newIndexSelected);
    }
  }

  function onPressChevronRight() {
    if (indexSelected < 2) {
      const newIndexSelected = indexSelected + 1;
      changeIndex(newIndexSelected);
    }
  }

  return (
    <View style={styles.container}>
      <ArrowSelector
        onPress={onPressChevronLeft}
        direction="left"
        enable={indexSelected > 0}
      />

      <ScrollView
        onLayout={event => {
          setTextSize(event.nativeEvent.layout.width);
        }}
        style={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.scrollContent}
        ref={scrollRef}>
        {props.items.map((difficulty: any) => (
          <View
            key={difficulty}
            style={[styles.textContainer, { width: textSize }]}>
            <Text style={styles.text}>{props.translateItem(difficulty)}</Text>
          </View>
        ))}
      </ScrollView>

      <ArrowSelector
        onPress={onPressChevronRight}
        direction="right"
        enable={indexSelected < props.items.length - 1}
      />
    </View>
  );
};
