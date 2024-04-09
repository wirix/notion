import { Box, Button as ButtonMui, ButtonProps as ButtonPropsMui } from '@mui/material';

interface ButtonProps extends ButtonPropsMui {}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ButtonMui
        sx={{
          alignSelf: 'center',
          justifySelf: 'center',
        }}
        {...props}>
        {children}
      </ButtonMui>
    </Box>
  );
};
