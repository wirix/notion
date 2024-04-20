import { Box } from '@mui/material';

export const NextTasks = ({ ...props }) => {
  return (
    <Box {...props}>
      <h3 style={{ fontWeight: '500' }}>Ближайшие задачи:</h3>
    </Box>
  );
};
