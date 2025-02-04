'use client';

import { useMemo } from 'react';

import { useBoardStore } from '../models';
import { useGetServiceDetailAllQuery } from './tanstack/use-get-service-detail-all-query';
import { useGetServiceDetailQuery } from './tanstack/use-get-service-detail-query';

export const useFilteredBoardData = () => {
  const { data: serviceDetail, isLoading: isServiceDetailLoading } = useGetServiceDetailQuery();
  const { data: serviceDetailAll, isLoading: isServiceDetailAllLoading } = useGetServiceDetailAllQuery();

  const { selectedServiceYear, selectedServiceType } = useBoardStore();

  // 서비스년도, 서비스 타입 필터링된 데이터
  const filteredServiceDetail = useMemo(() => {
    return serviceDetail
      ?.filter((detail) => detail.serviceYear.toString() === selectedServiceYear)
      .filter((detail) => detail.serviceType === selectedServiceType);
  }, [selectedServiceYear, selectedServiceType, serviceDetail]);

  // 서비스년도, 서비스 타입 필터링된 전체 개발자 데이터
  const filteredServiceDetailAll = useMemo(() => {
    return (
      serviceDetailAll
        ?.filter((detail) => detail.serviceYear.toString() === selectedServiceYear)
        .filter((detail) => detail.serviceType === selectedServiceType) ?? []
    );
  }, [selectedServiceYear, selectedServiceType, serviceDetailAll]);

  // 데이터 로딩상태
  const isLoading = isServiceDetailLoading || isServiceDetailAllLoading;

  // 개발자 목록
  const developers = useMemo(() => {
    return Array.from(new Set(filteredServiceDetailAll?.map((detail) => detail.developer)));
  }, [filteredServiceDetailAll]);

  return {
    filteredServiceDetail,
    filteredServiceDetailAll,
    isLoading,
    developers,
  };
};
