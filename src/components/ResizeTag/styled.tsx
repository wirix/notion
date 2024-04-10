import { Box, styled } from '@mui/material';

export const BoxStyled = styled(Box)(() => ({
  border: '1px solid transparent',
  transition: 'border .2s ease-in-out',
  borderRadius: '8px',
  overflow: 'auto',
  resize: 'horizontal',
  '&:hover': {
    border: '1px solid grey',
  },
}));
