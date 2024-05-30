'use client';

import { useMemo, useState, SyntheticEvent } from 'react';
import Stack from '@mui/material/Stack';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import Typography from '@mui/material/Typography';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';

import ModelLevelTable from './model-level-table';
import { useUnivService } from '../../hooks/context/use-univ-service';
import { useChartSetting } from '../../hooks/context/use-chart-setting';
import { getGroupedData } from '../overview/consultingapp-state-board/services/get-grouped-data';
import ModelChartBox from './model-chart-box';

const ChartSettingBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const { chartData, setChartData } = useChartSetting();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const apiRef = useTreeViewApiRef();

  const groupedByModelNum = useMemo(() => {
    const modelNums = Array.from(new Set(chartData.map((item) => item.modelNum)));
    return getGroupedData(chartData, 'modelNum', modelNums);
  }, [chartData]);

  const modelNumbers = useMemo(() => Object.keys(groupedByModelNum), [groupedByModelNum]);

  const handleModelSelectionToggle = (event: SyntheticEvent, itemId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedModel(itemId);
    }
  };

  const getModelLevels = (modelNumber: number) => {
    return Array.from(new Set(groupedByModelNum[Number(modelNumber)].map((item) => item.level)));
  };

  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        p: 2,
      }}
    >
      <Typography variant="h6">{`${currentUniv?.univName}(${currentService?.serviceID}) 차트 데이터 설정`}</Typography>
      {!!selectedModel && (
        <ModelChartBox
          selectedModel={Number(selectedModel)}
          modelChartData={groupedByModelNum[Number(selectedModel)]}
          modelLevels={getModelLevels(Number(selectedModel))}
        />
      )}

      <SimpleTreeView
        sx={{ mt: 4 }}
        onItemSelectionToggle={handleModelSelectionToggle}
        apiRef={apiRef}
        expandedItems={[selectedModel!]}
      >
        {modelNumbers.map((mn) => {
          const modelLevels = getModelLevels(Number(mn));
          return (
            <TreeItem2 key={`model-${mn}`} itemId={mn} label={`모델 ${Number(mn) + 1}`}>
              {modelLevels.map((ml) => {
                const filterByLevel = groupedByModelNum[Number(mn)].filter((item) => item.level === ml);
                return <ModelLevelTable key={`model-${mn}-level-${ml}-table`} chartData={filterByLevel} />;
              })}
            </TreeItem2>
          );
        })}
      </SimpleTreeView>
    </Stack>
  );
};

export default ChartSettingBox;
