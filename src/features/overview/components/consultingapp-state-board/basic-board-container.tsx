import { BoardType } from '../../models';
import BasicBoard from './boards/basic-board';
import BasicBoardAll from './boards/basic-board-all';

type BasicBoardContainerProps = {
  boardType: BoardType;
};

const BasicBoardContainer = ({ boardType }: BasicBoardContainerProps) => {
  return boardType === 'mainUser' ? <BasicBoard /> : <BasicBoardAll />;
};

export default BasicBoardContainer;
