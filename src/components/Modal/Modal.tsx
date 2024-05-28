import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import ModalWindow from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import { StyledModal } from './Modal.styled';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  cloneElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  styled?: Record<string, any>;
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

export const Modal = ({ children, isOpen, onClose, styled, ...props }: ModalProps) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      {...props}>
      <ModalWindow
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}>
        <Fade in={open}>
          <Box sx={styled ?? StyledModal}>{children}</Box>
        </Fade>
      </ModalWindow>
    </div>
  );
};
