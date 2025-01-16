'use client';

import { Box, Paper, Table, TableContainer, Typography } from '@mui/material';
import { MouseEvent, useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';

import { ContentLoadingSkeleton, SaveDataButton } from '@/shared/components';

import { VersionListParams } from '../apis';
import { useGetVersionList, useUpdateVersionListMutation } from '../hooks';
import { CurTBLVersion, VersionServer } from '../models';
import { reducer } from '../services';
import { VersionListBodyData } from './version-list-body-data';
import { VersionListTableHead } from './version-list-table-head';

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

  useEffect(
    function initListData() {
      execute(serviceID);
    },
    [serviceID]
  );

  useEffect(
    function getTestOrReal() {
      dispatch({ type: 'SET_STATE', payload: currentVersionList });
    },
    [type, isLoading]
  );

  useEffect(
    function getEditStatus() {
      const isUpdated =
        JSON.stringify(editedList) !== JSON.stringify(currentVersionList);
      setIsEdited(isUpdated);
    },
    [editedList]
  );

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
          <VersionListTableHead dispatch={dispatch} />
          <VersionListBodyData editedList={editedList} dispatch={dispatch} />
        </Table>
      </TableContainer>
      {isEdited && <SaveDataButton handleBtnClick={handleDataSaveBtnClick} />}
    </>
  );
};
