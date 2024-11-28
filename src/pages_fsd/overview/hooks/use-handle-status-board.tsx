'use client';

import { useMemo } from 'react';

import { useStatusBoardStore } from '../models';
import { useGetConsultingAppStateAllQuery } from './use-get-consultingapp-state-all-query';
import { useGetConsultingAppStateQuery } from './use-get-consultingapp-state-query';

export const useHandleStatusBoard = () => {
  const { data: consultingAppStates, isLoading: isConsultingAppStatesLoading } =
    useGetConsultingAppStateQuery();
  const {
    data: consultingAppStatesAll,
    isLoading: isConsultingAppStatesAllLoading,
  } = useGetConsultingAppStateAllQuery();

  const { selectedServiceYear, selectedServiceType } = useStatusBoardStore();

  const filteredConsultingAppStates = useMemo(() => {
    return consultingAppStates
      ?.filter(
        (appState) => appState.serviceYear.toString() === selectedServiceYear
      )
      .filter((appState) => appState.serviceType === selectedServiceType);
  }, [
    selectedServiceYear,
    selectedServiceType,
    consultingAppStates,
    consultingAppStatesAll,
  ]);

  const filteredConsultingAppStatesAll = useMemo(() => {
    return (
      consultingAppStatesAll
        ?.filter(
          (appState) => appState.serviceYear.toString() === selectedServiceYear
        )
        .filter((appState) => appState.serviceType === selectedServiceType) ??
      []
    );
  }, [
    selectedServiceYear,
    selectedServiceType,
    consultingAppStates,
    consultingAppStatesAll,
  ]);

  const isStatesLoading = useMemo(
    () => isConsultingAppStatesAllLoading || isConsultingAppStatesLoading,
    [isConsultingAppStatesAllLoading, isConsultingAppStatesLoading]
  );

  const developers = useMemo(() => {
    return Array.from(
      new Set(
        filteredConsultingAppStatesAll?.map((appState) => appState.developer)
      )
    );
  }, [filteredConsultingAppStatesAll]);

  return {
    filteredConsultingAppStates,
    filteredConsultingAppStatesAll,
    isStatesLoading,
    developers,
  };
};
