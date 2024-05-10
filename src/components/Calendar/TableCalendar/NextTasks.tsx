import { Typography } from '@mui/material';

export const NextTasks = ({ ...props }) => {
  return (
    <Typography variant="h5" fontWeight={500} {...props}>
      Ближайшие задачи:
    </Typography>
  );
};
