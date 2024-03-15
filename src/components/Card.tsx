import Draggable from 'react-draggable';
import { Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { styled } from '@mui/system';

const CardStyles = styled(Box)(() => ({
  backgroundColor: deepPurple[300],
  borderRadius: 2,
  overflow: 'hidden',
  padding: 2,
}));

export const Card = ({ children, ...props }) => {
  return (
    <Draggable handle="strong">
      <Box style={{ display: 'inline-block' }}>
        <CardStyles {...props}>
          <Box>{children}</Box>
        </CardStyles>
        <strong>0</strong>
      </Box>
    </Draggable>
  );
};
