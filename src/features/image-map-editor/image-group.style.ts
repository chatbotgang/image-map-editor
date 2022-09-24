import styled from 'styled-components';

interface StyledGroupProps {
  width: number;
}

export const Group = styled.div<StyledGroupProps>`
  width: ${({ width }) => `${width}px`};
  margin: 0 auto;
  padding: 40px 0;
`;

export const ImageBoundary = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
  
  [data-image-canvas] {
    cursor: crosshair;
  }
`;
