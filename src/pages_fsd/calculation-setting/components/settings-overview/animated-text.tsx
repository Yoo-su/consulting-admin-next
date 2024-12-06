import { animated, useSpring } from '@react-spring/web';

type AnimatedTextProps = {
  children: string; // children을 문자열로 제한
  delay?: number;
};

export const AnimatedText = ({ children, delay = 8 }: AnimatedTextProps) => {
  return (
    <>
      {children.split('').map((char, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const style = useSpring({
          opacity: 1,
          from: { opacity: 0 },
          delay: index * delay, // 각 문자의 딜레이 설정
        });

        return (
          <animated.span key={index} style={style}>
            {char === ' ' ? '\u00A0' : char}
          </animated.span>
        );
      })}
    </>
  );
};
