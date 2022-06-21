import React, { useRef } from 'react';
import { ScrollView, Animated, SafeAreaView, Dimensions } from 'react-native';
import { Stack, Text } from '~components/uikit';
import { Icon, IconName } from '~components/uikit/Icon';
import { Card } from '~components/uikit/Card';
import { styled } from '~styles/styled';

const OFFSET = 40;
const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 2;
const ITEM_HEIGHT = 200;

type Cards = {
  title: string;
  icon: IconName;
  text: string;
}[];

// Based on https://chanonroy.medium.com/building-a-netflix-style-card-carousel-in-react-native-649afcd8d78e
export default function CardCarousel({ cards }: { cards: Cards }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        horizontal={true}
        decelerationRate={'normal'}
        snapToInterval={ITEM_WIDTH}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        disableIntervalMomentum
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={12}
      >
        {cards.map((item, idx) => {
          const inputRange = [
            (idx - 1) * ITEM_WIDTH,
            idx * ITEM_WIDTH,
            (idx + 1) * ITEM_WIDTH,
          ];

          const translate = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          });

          return (
            <Animated.View
              key={idx}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginLeft: idx === 0 ? OFFSET : undefined,
                marginRight: idx === cards.length - 1 ? OFFSET : undefined,
                opacity,
                transform: [{ scale: translate }],
              }}
            >
              <CarouselCard
                onPress={() => console.log(`Card ${item.title} Pressed`)}
              >
                <Stack justify="start" spacing="small" axis="y" align="start">
                  <Stack
                    justify="start"
                    spacing="small"
                    axis="x"
                    align="center"
                  >
                    <Icon name={item.icon} />
                    <Text variant="title3">{item.title}</Text>
                  </Stack>
                  <Text variant="bodySmall">{item.text}</Text>
                </Stack>
              </CarouselCard>
            </Animated.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const CarouselCard = styled(Card, {
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT,
  overflow: 'hidden',
  elevation: 0,
  backgroundColor: '$surface',
  padding: 20,
});
