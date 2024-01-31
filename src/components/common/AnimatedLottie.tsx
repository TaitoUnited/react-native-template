import LottieView from 'lottie-react-native';
import { styled } from '~styles';

export default function AnimatedLottie({ animation }: { animation: any }) {
  return (
    <Wrapper>
      <LottieView
        autoPlay
        loop
        source={animation}
        style={{ width: '100%', height: '100%' }}
      />
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  height: 500,
});
