import { Box, styled } from '@mui/material';

export const StyledBox = styled(Box)(() => ({
  '& .css-w99l33-MuiSvgIcon-root': {
    opacity: 0,
    transition: 'opacity .2s ease-in-out',
  },
  '&:hover .css-w99l33-MuiSvgIcon-root': {
    opacity: 1,
  },
}));
