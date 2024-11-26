import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import { MouseEvent, useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';

import ContentLoadingSkeleton from '@/shared/components/ui/loadings/loading-skeleton';
import SaveDataButton from '@/shared/components/ui/save-data-button';

import { VersionListParams } from '../apis';
import { useGetVersionList, useUpdateVersionListMutation } from '../hooks';
import { CurTBLVersion, VersionServer } from '../models';
import VersionListBodyData from './version-list-body-data';
import VersionListTableHead from './version-list-table-head';

export type VersionListTableProps = {
  serviceID: string;
  type: VersionServer;
};

const VersionListTable = ({ serviceID, type }: VersionListTableProps) => {
  const {
    isLoading,
    testVersionList,
    setTestVersionList,
    realVersionList,
    setRealVersionList,
    execute,
  } = useGetVersionList();
  const { mutateAsync } = useUpdateVersionListMutation();
  const [editedList, dispatch] = useReducer(reducer, []);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    execute(serviceID);
  }, [serviceID]);

  useEffect(() => {
    if (type.label === '테스트') {
      dispatch({ type: 'SET_STATE', payload: testVersionList });
    }
    if (type.label === '리얼') {
      dispatch({ type: 'SET_STATE', payload: realVersionList });
    }
  }, [type, isLoading]);

  useEffect(() => {
    const currentVersionList =
      type.label === '테스트' ? testVersionList : realVersionList;
    const isUpdated =
      JSON.stringify(editedList) !== JSON.stringify(currentVersionList);
    setIsEdited(isUpdated);
  }, [editedList]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const [tableName, arrowDirection] = event.currentTarget.id.split('-');
    // 전부 업데이트
    if (tableName === 'all') {
      if (arrowDirection === 'up') {
        dispatch({ type: 'ADD_ALL_VERSION' });
      } else {
        dispatch({ type: 'SUB_ALL_VERSION' });
      }
    } else {
      // 특정 테이블만 업데이트
      const targetIndex = editedList.findIndex(
        (version) => version.TableName === tableName
      );
      if (arrowDirection === 'up') {
        dispatch({ type: 'ADD_VERSION', payload: targetIndex });
      } else {
        dispatch({ type: 'SUB_VERSION', payload: targetIndex });
      }
    }
  };

  const handleDataSaveBtnClick = () => {
    const updateList = editedList.map((version: CurTBLVersion) => ({
      TableName: version.TableName,
      Version: version.Version,
    }));
    const updateParam: VersionListParams = {
      server: type.value,
      tables: updateList,
    };
    toast.promise(
      mutateAsync({ serviceID, params: updateParam }).then(() => {
        if (type.label === '테스트') {
          setTestVersionList(editedList);
        }
        if (type.label === '리얼') {
          setRealVersionList(editedList);
        }
        setIsEdited(false);
      }),
      {
        loading: (
          <Typography variant="body2">
            버전 정보를 업데이트하는 중입니다...
          </Typography>
        ),
        success: (
          <Typography variant="body2">버전 정보 업데이트 완료!</Typography>
        ),
        error: (
          <Typography variant="body2">
            버전 정보 업데이트 중 문제가 발생했습니다
          </Typography>
        ),
      }
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ContentLoadingSkeleton
          isTitle={false}
          width={'500px'}
          height={'700px'}
        />
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '500px' }}>
        <Table aria-label="service-list-table">
          <TableHead>
            <VersionListTableHead handleClick={handleClick} />
          </TableHead>
          <TableBody sx={TableBodyClass}>
            <VersionListBodyData
              editedList={editedList}
              handleClick={handleClick}
            />
          </TableBody>
        </Table>
      </TableContainer>
      {isEdited && <SaveDataButton handleBtnClick={handleDataSaveBtnClick} />}
    </>
  );
};

export default VersionListTable;

export const ArrowButtonClass = {
  borderRadius: '.2rem',
  width: '1.3em',
  height: '1.3em',
  '&:hover': {
    backgroundColor: '#E0E0E0',
  },
};

const TableBodyClass = {
  '& .MuiTableRow-root': {
    '&:nth-of-type(odd)': {
      backgroundColor: '#FDFDFD',
    },
  },
};

export const TableCellClass = {
  padding: '8px 10px',
};

type ActionType =
  | { type: 'SET_STATE'; payload: CurTBLVersion[] }
  | { type: 'ADD_VERSION' | 'SUB_VERSION'; payload: number }
  | { type: 'ADD_ALL_VERSION' | 'SUB_ALL_VERSION' };

const reducer = (state: CurTBLVersion[], action: ActionType) => {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'ADD_VERSION':
      return state.map((version, idx) => {
        if (idx === action.payload) {
          return { ...version, Version: version.Version + 1 };
        }
        return { ...version };
      });
    case 'SUB_VERSION':
      return state.map((version, idx) => {
        if (idx === action.payload && version.Version > 0) {
          return { ...version, Version: version.Version - 1 };
        }
        return { ...version };
      });
    case 'ADD_ALL_VERSION':
      return state.map((version) => ({
        ...version,
        Version: version.Version + 1,
      }));
    case 'SUB_ALL_VERSION':
      return state.map((version) => {
        if (version.Version > 0) {
          return { ...version, Version: version.Version - 1 };
        }
        return { ...version };
      });
    default:
      return state;
  }
};
