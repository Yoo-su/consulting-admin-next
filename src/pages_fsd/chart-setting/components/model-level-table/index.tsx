'use client';

import { Paper, Stack, Table, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo } from 'react';

import { useModelLevelTable } from '../../hooks';
import { useChartSettingStore } from '../../models';
import { CancelEditTableButton } from './cancel-edit-table-button';
import { DeleteLevelButton } from './delete-level-button';
import { EnterEditModeButton } from './enter-edit-mode-button';
import { LevelTableTopBanner } from './level-table-top-banner';
import { SaveTableChangesButton } from './save-table-changes-button';
import { LevelTableBody } from './table-body';
import { LevelTableFooter } from './table-footer';
import { LevelTableHeader } from './table-header';

type ModelLevelTableProps = {
  modelNum: number;
  levelNum: number;
};

export const ModelLevelTable = memo(
  ({ modelNum, levelNum }: ModelLevelTableProps) => {
    const { isEditing } = useChartSettingStore();
    const {
      editMode,
      tempChartData,
      handleEnterEditMode,
      handleDeleteLevelRow,
      handleAddLevelRow,
      handleDeleteLevel,
      handleFieldChange,
      handleCancelEdit,
      handleSaveTableChanges,
    } = useModelLevelTable({
      modelNum,
      levelNum,
    });

    return (
      <Wrapper className={editMode ? 'editMode' : ''}>
        <LevelTableTopBanner level={levelNum}>
          <LevelTableTopBanner.Utils>
            {editMode ? (
              <>
                <SaveTableChangesButton
                  handleSaveTableChanges={handleSaveTableChanges}
                />
                <CancelEditTableButton handleCancelEdit={handleCancelEdit} />
              </>
            ) : (
              !isEditing && (
                <>
                  <EnterEditModeButton
                    handleEnterEditMode={handleEnterEditMode}
                  />

                  <DeleteLevelButton handleDeleteLevel={handleDeleteLevel} />
                </>
              )
            )}
          </LevelTableTopBanner.Utils>
        </LevelTableTopBanner>
        <TableContainer component={Paper} sx={{ mt: 0.1 }}>
          <Table size="small" aria-label="model-level-table">
            <LevelTableHeader />
            <LevelTableBody
              editMode={editMode}
              tableChartDatas={tempChartData}
              handleFieldChange={handleFieldChange}
              handleDeleteLevelRow={handleDeleteLevelRow}
            />
            {editMode && (
              <LevelTableFooter handleAddLevelRow={handleAddLevelRow} />
            )}
          </Table>
        </TableContainer>
      </Wrapper>
    );
  }
);
ModelLevelTable.displayName = 'ModelLevelTable';

const Wrapper = styled(Stack)(({ theme }) => ({
  margin: '1rem 0',
  transition: 'all 0.1s ease',
  '&.editMode': {
    filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))',
    padding: '0.5rem',
  },
}));
