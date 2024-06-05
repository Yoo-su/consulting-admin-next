import { BoardType } from '@/features/dashboard/contexts/consultingapp-state-context';
import BasicBoard from '../basic-board';
import BasicBoardAll from '../basic-board-all';

type BasicBoardContainerProps = {
  boardType: BoardType;
};

const BasicBoardContainer = ({ boardType }: BasicBoardContainerProps) => {
  return boardType === 'mainUser' ? <BasicBoard /> : <BasicBoardAll />;
};

export default BasicBoardContainer;
