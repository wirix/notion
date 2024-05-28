import { green, orange, red } from '@mui/material/colors';
import { Button } from '.';
import { ButtonProps } from '@mui/material';
import cn from 'classnames';
import trash from '@mui/icons-material/RestoreFromTrash';
import left from '@mui/icons-material/ArrowLeft';
import right from '@mui/icons-material/ArrowRight';
import { ReactNode } from 'react';

const icons = {
  trash,
  left,
  right,
};

type Icons = keyof typeof icons;

interface ButtonIconProps extends ButtonProps {
  children?: ReactNode;
  icon: Icons;
  appearance: 'primary' | 'success' | 'warning' | 'danger';
}

export const ButtonIcon = ({
  children,
  icon,
  appearance,
  className,
  ...props
}: ButtonIconProps) => {
  const IconComp = icons[icon];

  return (
    <Button
      sx={{
        w: 25,
        color: cn({
          [red[600]]: appearance === 'danger',
          [orange[600]]: appearance === 'warning',
          [green[500]]: appearance === 'success',
          ['#151111']: appearance === 'primary',
        }),
        py: 1,
        className,
      }}
      {...props}>
      <IconComp sx={{ fontSize: '25px' }} />
      {children}
    </Button>
  );
};
