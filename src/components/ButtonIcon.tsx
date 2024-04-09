import { green, orange, red } from '@mui/material/colors';
import { Button } from '.';
import { ButtonProps } from '@mui/material';
import cn from 'classnames';
import trash from '@mui/icons-material/RestoreFromTrash';

const icons = {
  trash,
};

type Icons = keyof typeof icons;

interface ButtonIconProps extends ButtonProps {
  icon: Icons;
  appearance: 'success' | 'warning' | 'danger';
}

export const ButtonIcon = ({ children, icon, appearance, ...props }: ButtonIconProps) => {
  const IconComp = icons[icon];

  return (
    <Button
      sx={{
        color: cn({
          [red[600]]: appearance === 'danger',
          [orange[600]]: appearance === 'warning',
          [green[500]]: appearance === 'success',
        }),
      }}
      {...props}>
      <IconComp sx={{ fontSize: '25px' }} />
      {children}
    </Button>
  );
};
