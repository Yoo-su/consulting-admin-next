'use client';

import { Stack, SxProps, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { memo } from 'react';

import { CHART_COLORS } from '../constants';
import { useModelChartBox } from '../hooks';
import { ChartData } from '../models';
import { SelectLevelButton } from './select-level-button';

type ModelChartBoxProps = {
  modelNum: number;
  modelLevels: number[];
  modelChartData: ChartData[];
};
export const ModelChartBox = memo(
  ({ modelNum, modelLevels, modelChartData }: ModelChartBoxProps) => {
    const theme = useTheme();
    const { selectedLevel, chartData, handleSelectLevel } = useModelChartBox(
      modelLevels,
      modelChartData
    );

    return (
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        sx={chartBoxStyle}
      >
        <Stack direction="row" spacing={3}>
          {modelLevels.map((level) => (
            <SelectLevelButton
              key={level}
              level={level}
              isSelected={selectedLevel === level}
              handleClick={handleSelectLevel}
            />
          ))}
        </Stack>

        <PieChart
          key={`model-${modelNum}-level-${selectedLevel}-chart`}
          colors={CHART_COLORS}
          series={[
            {
              data: chartData,
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          slotProps={{
            legend: {
              labelStyle: {
                fontFamily: theme.typography.body1.fontFamily,
              },
            },
          }}
          width={400}
          height={200}
          margin={{ right: 200 }}
        />
      </Stack>
    );
  }
);

ModelChartBox.displayName = 'ModelChartBox';

const chartBoxStyle: SxProps = {
  py: 4,
  mt: 4,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
};
