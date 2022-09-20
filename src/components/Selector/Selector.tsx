import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SelectorProps } from './Selector.types';
import styles from './Selector.style';
import { DifficultyLevels } from 'src/model/cell';
import ArrowSelector from './components/ArrowSelector';

export const Selector: React.FC<SelectorProps> = props => {
  const [textSize, setTextSize] = useState(10000);
  const scrollRef = useRef<ScrollView>(null);

  function scrollToDifficulty(dififculty: number) {
    scrollRef?.current?.scrollTo({ x: textSize * dififculty });
  }

  useEffect(() => {
    scrollToDifficulty(props.itemIndexSelected);
  }, [props.itemIndexSelected]);

  return (
    <View style={styles.container}>
      <ArrowSelector
        onPress={props.onPressLeft}
        direction="left"
        enable={props.itemIndexSelected > 0}
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
        {props.items.map(difficulty => (
          <View
            key={difficulty}
            style={[styles.textContainer, { width: textSize }]}>
            <Text style={styles.text}>{difficulty}</Text>
          </View>
        ))}
      </ScrollView>

      <ArrowSelector
        onPress={props.onPressRight}
        direction="right"
        enable={props.itemIndexSelected < props.items.length - 1}
      />
    </View>
  );
};
