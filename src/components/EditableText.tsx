import { Box, TextareaAutosize, Typography } from '@mui/material';
import { useState } from 'react';

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
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(children);

  const editClose = () => {
    setIsEditing(false);
    updateText(id, text);
  };

  const editOpen = () => {
    setIsEditing(true);
  };

  return (
    <Box position={'relative'} width={width}>
      {isEditing ? (
        <TextareaAutosize
          style={{
            padding: 4,
            outline: 0,
            borderRadius: 4,
            resize: 'none',
            border: '1px solid lightgray',
          }}
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          onBlur={editClose}
        />
      ) : (
        <Typography style={{ wordWrap: 'break-word' }} onClick={editOpen}>
          {text.length ? text : 'Пусто'}
        </Typography>
      )}
    </Box>
  );
};
