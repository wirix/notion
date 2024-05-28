import { Box, TextareaAutosize, Typography } from '@mui/material';
import { ComponentProps, useRef, useState } from 'react';
import { useOutsideClick } from '../hooks';

interface EditableTextProps extends ComponentProps<typeof Box> {
  children: string;
  id: string;
  updateText: (id: string, text: string) => void;
  width?: number;
}

export const EditableText = ({
  children,
  id,
  updateText,
  width = 180,
  ...props
}: EditableTextProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(children);
  const elementRef = useRef(null);

  useOutsideClick({
    elementRef,
    onOutsideClick: () => {
      setIsEditMode(false);
      updateText(id, text);
    },
  });

  const editOpen = () => {
    setIsEditMode(true);
  };

  if (isEditMode) {
    return (
      <Box position={'relative'} width={width} {...props}>
        <TextareaAutosize
          style={{
            width: `${width}px`,
            padding: 4,
            outline: 0,
            borderRadius: 4,
            resize: 'none',
            border: '1px solid lightgray',
          }}
          ref={elementRef}
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
    );
  } else {
    return (
      <Box position={'relative'} width={width} {...props}>
        <Typography
          style={{ wordWrap: 'break-word', width: `${width}px`, color: '#151111' }}
          onClick={editOpen}>
          {text.length ? text : 'Пусто'}
        </Typography>
      </Box>
    );
  }
};
