import { Box, styled } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const CardStyles = styled(Box)(() => ({
  backgroundColor: deepPurple[300],
  borderRadius: 2,
  overflow: 'hidden',
  padding: 2,
}));

export const Card = ({ children, ...props }) => {
  return (
    <CardStyles {...props}>
      <Box>{children}</Box>
    </CardStyles>
  );
};
