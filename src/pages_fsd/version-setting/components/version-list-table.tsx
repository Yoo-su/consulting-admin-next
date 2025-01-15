'use client';

import { Box, Paper, Table, TableContainer, Typography } from '@mui/material';
import { MouseEvent, useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';

import { ContentLoadingSkeleton, SaveDataButton } from '@/shared/components';

import { VersionListParams } from '../apis';
import { useGetVersionList, useUpdateVersionListMutation } from '../hooks';
import { CurTBLVersion, VersionServer } from '../models';
import { VersionListBodyData } from './version-list-body-data';
import { VersionListTableHead } from './version-list-table-head';
import { reducer } from '../services';

export type VersionListTableProps = {
  serviceID: string;
  type: VersionServer;
};

export const VersionListTable = ({
  serviceID,
  type,
}: VersionListTableProps) => {
  const { isLoading, setVersionList, getCurrentVersionList, execute } =
    useGetVersionList();
  const { mutateAsync } = useUpdateVersionListMutation();
  const [editedList, dispatch] = useReducer(reducer, []);
  const [isEdited, setIsEdited] = useState(false);

  const currentVersionList = getCurrentVersionList(type.label);

  useEffect(() => {
    execute(serviceID);
  }, [serviceID]);

  useEffect(() => {
    dispatch({ type: 'SET_STATE', payload: currentVersionList });
  }, [type, isLoading]);

  useEffect(() => {
    const isUpdated =
      JSON.stringify(editedList) !== JSON.stringify(currentVersionList);
    setIsEdited(isUpdated);
  }, [editedList]);

  // 전부 업데이트
  const handleHeadClick = (event: MouseEvent<HTMLButtonElement>) => {
    const [_, arrowDirection] = event.currentTarget.id.split('-');
    const type =
      arrowDirection === 'up' ? 'ADD_ALL_VERSION' : 'SUB_ALL_VERSION';
    dispatch({ type });
  };

  // 특정 테이블만 업데이트
  const handleBodyClick = (event: MouseEvent<HTMLButtonElement>) => {
    const [tableName, arrowDirection] = event.currentTarget.id.split('-');
    const targetIndex = editedList.findIndex(
      (version) => version.TableName === tableName
    );
    const type = arrowDirection === 'up' ? 'ADD_VERSION' : 'SUB_VERSION';
    dispatch({ type, payload: targetIndex });
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
        setVersionList(type.label, editedList);

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
          <VersionListTableHead handleClick={handleHeadClick} />
          <VersionListBodyData
            editedList={editedList}
            handleClick={handleBodyClick}
          />
        </Table>
      </TableContainer>
      {isEdited && <SaveDataButton handleBtnClick={handleDataSaveBtnClick} />}
    </>
  );
};
