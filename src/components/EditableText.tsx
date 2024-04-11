import { Box, TextareaAutosize, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../hooks';

export const EditableText = ({
  children,
  id,
  updateText,
  width = 180,
}: {
  children: string;
  id: string;
  updateText: (id: string, text: string) => void;
  width?: number;
}) => {
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

  return (
    <Box position={'relative'} width={width}>
      {isEditMode ? (
        <TextareaAutosize
          style={{
            width: '300px',
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
      ) : (
        <Typography style={{ wordWrap: 'break-word', width: '300px' }} onClick={editOpen}>
          {text.length ? text : 'Пусто'}
        </Typography>
      )}
    </Box>
  );
};
