import { useEffect, useState, MouseEvent } from 'react';
import { TableHead, TableContainer, Table, TableBody, Paper, Typography, Box } from '@mui/material';
import { useGetVersionList } from '@/features/dashboard/hooks/use-get-version-list';
import { CurTBLVersion } from '@/features/dashboard/types/service-version.type';
import { VersionServer } from '..';
import VersionListBodyData from '../version-list-body-data';
import VersionListTableHead from '../version-list-table-head';
import SaveDataButton from '@/shared/components/save-data-button';
import { VersionListParams } from '@/features/dashboard/apis/update-version-list';
import { useUpdateVersionListMutation } from '@/features/dashboard/hooks/tanstack/use-update-version-list-mutation';
import toast from 'react-hot-toast';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';

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
    editedList,
    setEditedList,
  } = useGetVersionList();
  const { mutateAsync } = useUpdateVersionListMutation();
  const [versionList, setVersionList] = useState<CurTBLVersion[]>([]);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    execute(serviceID);
  }, [serviceID]);

  useEffect(() => {
    if (type.label === '테스트') {
      setEditedList(testVersionList);
      setVersionList(testVersionList);
    }
    if (type.label === '리얼') {
      setEditedList(realVersionList);
      setVersionList(realVersionList);
    }
  }, [type, isLoading]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const tableName = event.currentTarget.id;
    let updatedList: CurTBLVersion[] | null = [];
    // 전부 업데이트
    if (tableName === 'all') {
      updatedList = editedList.map((version, index) => {
        if (version.Version === versionList[index].Version) {
          return { ...version, Version: version.Version + 1 };
        } else {
          return { ...version };
        }
      });
      // 변경사항이 없으면 업데이트하지 않음
      if (JSON.stringify(updatedList) === JSON.stringify(versionList)) return;
    } else {
      // 특정 테이블만 업데이트
      const targetIndex = editedList.findIndex((version) => version.TableName === tableName);
      updatedList = [
        ...editedList.slice(0, targetIndex),
        { ...editedList[targetIndex], Version: editedList[targetIndex].Version + 1 },
        ...editedList.slice(targetIndex + 1),
      ];
    }
    setIsEdited(true);
    setEditedList([...updatedList]);
  };

  const handleDataSaveBtnClick = () => {
    const updateList = editedList.map((version) => ({ TableName: version.TableName, Version: version.Version }));
    const updateParam: VersionListParams = { server: type.value, tables: updateList };
    toast.promise(
      mutateAsync({ serviceID, params: updateParam }).then(() => {
        const newList = [...editedList];
        setVersionList(newList);
        if (type.label === '테스트') {
          setTestVersionList(newList);
        }
        if (type.label === '리얼') {
          setRealVersionList(newList);
        }
        setIsEdited(false);
      }),
      {
        loading: <Typography variant="body2">버전 정보를 업데이트하는 중입니다...</Typography>,
        success: <Typography variant="body2">버전 정보 업데이트 완료!</Typography>,
        error: <Typography variant="body2">버전 정보 업데이트 중 문제가 발생했습니다</Typography>,
      }
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ContentLoadingSkeleton isTitle={false} width={'500px'} height={'700px'} />
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
            <VersionListBodyData editedList={editedList} versionList={versionList} handleClick={handleClick} />
          </TableBody>
        </Table>
      </TableContainer>
      {isEdited && <SaveDataButton handleBtnClick={handleDataSaveBtnClick} />}
    </>
  );
};

export default VersionListTable;

export const ArrowUpButtonClass = {
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
