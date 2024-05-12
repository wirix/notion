import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { blueGrey, indigo, red } from '@mui/material/colors';
import { StatusTodoEnum } from '../../../store';
import { Typography } from '@mui/material';

export const StatusOption = ({
  status,
  id,
  updateStore,
  ...props
}: {
  status: StatusTodoEnum;
  id: string;
  updateStore: (id: string, field: { status: StatusTodoEnum }) => void;
}) => {
  return (
    <FormControl fullWidth sx={{ minWidth: 120 }} {...props}>
      <Select
        value={status}
        onChange={(e) => {
          updateStore(id, { status: e.target.value as StatusTodoEnum });
        }}
        label="Status"
        sx={{
          bgcolor: (status === 'queue' ? red : status === 'inProgress' ? indigo : blueGrey)['A100'],
          borderRadius: 2,
          padding: 0,
          textAlign: 'center',
          '& .MuiInputBase-input': {
            p: 0.5,
          },
        }}>
        <MenuItem value={StatusTodoEnum.queue}>
          <Typography color={'#151111'}>В очереди</Typography>
        </MenuItem>
        <MenuItem value={StatusTodoEnum.inProgress}>
          <Typography color={'#151111'}>В процессе</Typography>
        </MenuItem>
        <MenuItem value={StatusTodoEnum.completed}>
          <Typography color={'#151111'}>Выполнено</Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
