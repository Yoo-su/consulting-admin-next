import { useCallback, useState } from 'react';

export const useHandleHoverState = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const setHoverStateTrue = useCallback(() => {
    setIsHovered(true);
  }, []);

  const setHoverStateFalse = useCallback(() => {
    setIsHovered(false);
  }, []);

  return { isHovered, setHoverStateFalse, setHoverStateTrue };
};
