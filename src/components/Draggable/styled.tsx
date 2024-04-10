import { Box, styled } from '@mui/material';

export const StyledBox = styled(Box)(() => ({
  display: 'flex',
  userSelect: 'none',
  position: 'absolute',
  '& .css-159ivpg-MuiSvgIcon-root': {
    opacity: 0,
    transition: 'opacity .2s ease-in-out',
  },
  '&:hover .css-159ivpg-MuiSvgIcon-root': {
    opacity: 1,
  },
}));
