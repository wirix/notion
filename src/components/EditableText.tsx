import { Box, TextareaAutosize, Typography } from '@mui/material';
import { useState } from 'react';

export const EditableText = ({
  children,
  id,
  updateStore,
}: {
  children: string;
  id: string;
  updateStore: (id: string, field: { text: string }) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(children);

  const editClose = () => {
    setIsEditing(false);
    updateStore(id, { text });
  };

  const editOpen = () => {
    setIsEditing(true);
  };

  return (
    <Box position={'relative'}>
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
