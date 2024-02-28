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
    <Box display={'flex'}>
      <CardStyles {...props}>
        <Box>{children}</Box>
      </CardStyles>
    </Box>
  );
};
