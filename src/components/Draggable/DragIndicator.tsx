import { DRAG_INDICATOR } from './constants';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export const DragIndicator = ({ ...props }) => {
  return (
    <DragIndicatorIcon
      id={DRAG_INDICATOR}
      style={{
        fontSize: '24px',
        cursor: 'grab',
        display: 'flex',
        alignSelf: 'flex-end',
        right: 0,
        zIndex: 75,
      }}
      color={'secondary'}
      {...props}
    />
  );
};
