import { Stack, Typography } from '@mui/material';
import {
  BasicFormKoreanTitleClass,
  BasicFormTitleClass,
  SUB_MENU_SETTING,
} from '../../constants';
import { FlutterRowInfo, FlutterSetting } from '../../models';
import { checkChildEdited, getSubMenuClass } from '../../services';

type BasicFormTitleProps = {
  item: FlutterRowInfo;
  filteredSettingList: FlutterSetting[];
};

export const BasicFormTitle = ({
  item,
  filteredSettingList,
}: BasicFormTitleProps) => {
  const { IsRequired, Type, Title, KoreanTitle, Description, level } = item;

  const isEdited = checkChildEdited(item, filteredSettingList, true);

  return (
    <Stack sx={getSubMenuClass(level, ['paddingTop'])}>
      <Stack direction={'row'} spacing={1} sx={BasicFormTitleClass(isEdited)}>
        <Typography
          variant={SUB_MENU_SETTING.variant[level]}
          sx={getSubMenuClass(level, ['fontWeight'])}
        >
          {/* {getRomanValues(index + 1, SUB_MENU_SETTING.indexType[level])}.*/}
          {Title}
          {IsRequired && '*'}
        </Typography>
        <Typography
          variant={SUB_MENU_SETTING.variant[level]}
          sx={BasicFormKoreanTitleClass}
        >
          {KoreanTitle}
        </Typography>
      </Stack>
      {Type !== 'boolean' && (
        <Typography variant={'caption'}>{Description}</Typography>
      )}
    </Stack>
  );
};
