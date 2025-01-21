import { Typography } from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { useSharedStore } from '@/shared/models';

import { Condition } from '../models';
import { getNewCondition } from '../utils';
import {
  useDetailPageSettingMutation,
  useGetDetailPageDataQuery,
} from './tanstack';

// region - types
type UseConditionPopoverReturn = {
  isConditionChanged: boolean;
  currentConditions: Condition[];
  originalConditions: Condition[];
  setCurrentConditions: Dispatch<SetStateAction<Condition[]>>;
  setOriginalConditions: Dispatch<SetStateAction<Condition[]>>;
  handleSaveConditionChanges: () => void;
  handleAddConditionRow: () => void;
  handleChangeConditionRow: (
    idx: number,
    columnType: 'dataType' | 'eqValue' | 'value' | 'logic',
    newData: string | number
  ) => void;
  handleDeleteConditionRow: (idx: number) => void;
};
type UseConditionPopoverProps = {
  rowNumber: number;
  conditions: Condition[];
};
type UseConditionPopover = ({
  rowNumber,
  conditions,
}: UseConditionPopoverProps) => UseConditionPopoverReturn;
// region - types end

export const useConditionPopover: UseConditionPopover = ({
  rowNumber,
  conditions,
}: UseConditionPopoverProps) => {
  const _return = useRef({} as UseConditionPopoverReturn);
  const currentService = useSharedStore((state) => state.currentService);
  const serviceID = currentService?.serviceID ?? '';
  const { data: detailPageDatas } = useGetDetailPageDataQuery(serviceID);
  const { setDetailPageData } = useDetailPageSettingMutation();
  const [currentConditions, setCurrentConditions] =
    useState<Condition[]>(conditions);
  const [originalConditions, setOriginalConditions] =
    useState<Condition[]>(conditions);

  // 표시조건 변경 여부
  const isConditionChanged = useMemo(() => {
    const sortedCurrentCondition = [...currentConditions].sort(
        (a, b) => a.idx - b.idx
      ),
      sortedOriginalCondition = [...originalConditions].sort(
        (a, b) => a.idx - b.idx
      );
    return (
      JSON.stringify(sortedCurrentCondition) !==
      JSON.stringify(sortedOriginalCondition)
    );
  }, [currentConditions, originalConditions]);

  // 특정 행 Condition 변경
  const handleUpdateCondition = useCallback(
    (newCondition: string) => {
      const newDetailPageData = (detailPageDatas ?? []).map((item) => {
        if (item.rowNum !== rowNumber) return item;
        return {
          ...item,
          condition: newCondition,
        };
      });
      setDetailPageData(newDetailPageData);
    },
    [detailPageDatas, rowNumber]
  );

  // 표시조건 변경내용 저장
  const handleSaveConditionChanges = useCallback(() => {
    handleUpdateCondition(JSON.stringify(currentConditions));
    setOriginalConditions([...currentConditions]);
  }, [currentConditions]);

  // 표시조건 행 추가
  const handleAddConditionRow = useCallback(() => {
    const maxConditionIdx = Math.max(
      ...Array.from(currentConditions, (item) => item.idx)
    );
    const newIdx = currentConditions.length ? maxConditionIdx + 1 : 0;
    const logic = currentConditions.length ? 'and' : '';
    const newRow = getNewCondition(newIdx, logic);

    setCurrentConditions([...currentConditions, newRow]);
  }, [currentConditions]);

  // 표시조건 행 내용 변경 처리
  const handleChangeConditionRow = useCallback(
    (
      idx: number,
      columnType: 'dataType' | 'eqValue' | 'value' | 'logic',
      newData: string | number
    ) => {
      const newCondition = currentConditions.map((item) => {
        if (item.idx !== idx) return item;
        return {
          ...item,
          [columnType]: newData,
        };
      });
      setCurrentConditions(newCondition);
    },
    [currentConditions]
  );

  // 표시조건 행 삭제
  const handleDeleteConditionRow = useCallback(
    (idx: number) => {
      const isChainedRow = idx === 0 && currentConditions.length > 1;
      if (isChainedRow) {
        toast.error(
          <Typography variant="body2">
            연결된 조건이 있어 삭제 불가합니다
          </Typography>
        );
        return;
      }

      const newCondition = [...currentConditions].filter(
        (item) => item.idx !== idx
      );
      setCurrentConditions(newCondition);
    },
    [currentConditions]
  );

  _return.current = {
    isConditionChanged,
    currentConditions,
    originalConditions,
    setOriginalConditions,
    setCurrentConditions,
    handleChangeConditionRow,
    handleAddConditionRow,
    handleSaveConditionChanges,
    handleDeleteConditionRow,
  };
  return _return.current;
};
