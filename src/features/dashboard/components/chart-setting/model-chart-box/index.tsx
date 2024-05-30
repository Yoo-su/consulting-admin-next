'use client';

import { useState, useEffect, useMemo } from 'react';
import { Accordion, Stack, Typography, Button, styled } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

import { ChartData } from '@/features/dashboard/types/chart-data.type';

const StyledButton = styled(Button)({
  borderRadius: '0.5rem',
});

type ModelChartBoxProps = {
  selectedModel: number;
  modelChartData: ChartData[];
  modelLevels: number[];
};
const ModelChartBox = ({ selectedModel, modelChartData, modelLevels }: ModelChartBoxProps) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const displayingData = useMemo(() => {
    if (!selectedLevel) return [];
    const filtered = getLevelFilteredData(selectedLevel);
    return transformDataForChart(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelChartData, selectedLevel]);

  useEffect(() => {
    setSelectedLevel(modelLevels.length ? modelLevels[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelChartData]);

  function transformDataForChart(chartData: ChartData[]) {
    return chartData.map((data) => {
      return {
        id: data.label,
        value: data.percentage,
        label: data.chartLabel,
      };
    });
  }

  function getLevelFilteredData(level: number) {
    return modelChartData.filter((data) => data.level === level);
  }

  return (
    <Stack
      direction={'column'}
      spacing={2}
      alignItems={'center'}
      sx={{ p: 2, mt: 4, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
    >
      <Typography variant="body1">모델{selectedModel + 1}</Typography>

      <Stack direction={'row'} spacing={3}>
        {modelLevels.map((level) => (
          <StyledButton
            key={level}
            size="small"
            variant="outlined"
            onClick={() => {
              setSelectedLevel(level);
            }}
          >
            <Typography variant="body1" fontSize={14}>
              단계{level}
            </Typography>
          </StyledButton>
        ))}
      </Stack>

      <PieChart
        key={selectedModel}
        series={[
          {
            data: displayingData,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        width={400}
        height={200}
        margin={{ right: 200 }}
      />
    </Stack>
  );
};

export default ModelChartBox;
