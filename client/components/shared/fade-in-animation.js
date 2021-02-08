import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const FadeInAnimation = ({
  duration = 1500,
  delay = 200,
  children,
  ...delegated
}) => {
  return (
    <div style={{width: '100%'}}>
      <Wrapper
        {...delegated}
        style={{
          ...(delegated.style || {}),
          animationDuration: duration + 'ms',
          animationDelay: delay + 'ms',
        }}
      >
        {children}
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
  }
`;
export default FadeInAnimation;
