import { Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useCard } from '../store';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

const CardStyles = styled(Box)(() => ({
  backgroundColor: deepPurple[300],
  borderRadius: 2,
  overflow: 'hidden',
  padding: 2,
}));

function useDragger(ref: MutableRefObject<HTMLDivElement | null>) {
  const isClicked = useRef<boolean>(false);
  const {
    changeCoords,
    card: { coords },
  } = useCard();

  const coordsRef = useRef({
    startX: coords.startX,
    startY: coords.startY,
    lastX: coords.lastX,
    lastY: coords.lastY,
  });

  const setIsClicked = useCallback((value: boolean) => {
    isClicked.current = value;
  }, []);

  useEffect(() => {
    const target = ref.current;
    if (!target) throw new Error("Element with given ref doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error('target element must have a parent');

    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      coordsRef.current.startX = e.clientX;
      coordsRef.current.startY = e.clientY;
    };
    const onMouseUp = (e: MouseEvent) => {
      setIsClicked(false);
      coordsRef.current.lastX = target.offsetLeft;
      coordsRef.current.lastY = target.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;
      const nextX = e.clientX - coordsRef.current.startX + coordsRef.current.lastX;
      const nextY = e.clientY - coordsRef.current.startY + coordsRef.current.lastY;
      changeCoords({
        ...coordsRef.current,
        nextX,
        nextY,
      });
    };

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };

    return cleanup;
  }, [ref.current]);

  return {
    state: { isClicked: isClicked.current, coords },
    functions: { setIsClicked },
  };
}

export const DraggableCard = ({ children, ...props }) => {
  const ref = useRef(null);
  const {
    state: { isClicked, coords },
    functions: { setIsClicked },
  } = useDragger(ref);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'inline-block',
        zIndex: isClicked ? 50 : 1,
        userSelect: 'none',
        position: 'absolute',
        left: `${coords.nextX}px`,
        top: `${coords.nextY}px`,
      }}>
      <Box sx={{ display: 'flex' }}>
        <CardStyles {...props}>
          <Box>{children}</Box>
        </CardStyles>
        <Box
          style={{ cursor: 'grab', paddingLeft: 4, alignSelf: 'flex-end' }}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}>
          <DragIndicatorIcon color={'secondary'} />
        </Box>
      </Box>
    </Box>
  );
};
