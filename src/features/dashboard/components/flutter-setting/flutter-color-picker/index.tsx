import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { Popover } from '@mui/material';
import { hexToHsv, hsvToHex } from '@/features/dashboard/services/flutter-setting/color-utils';
import { HSV } from '../types/color-picker.types';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import ColorPopover from './color-popover';

type FlutterColorPickerProps = {
  value: string;
  setTextValue: Dispatch<SetStateAction<string>>;
  RowIdx: number;
  InitialValue: string;
} & Pick<FormItemProps, 'path' | 'handleEdit'>;

const FlutterColorPicker = ({
  value,
  setTextValue,
  RowIdx,
  path,
  handleEdit,
  InitialValue,
}: FlutterColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const [currentHsv, setCurrentHsv] = useState<HSV>(hexToHsv(value));
  const [hexText, setHexText] = useState<string>(value.replace('0xff', '').toUpperCase());
  const { addToEditedList } = useFlutterSetting();

  const handleColorChange = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    const value = `0xff${hsvToHex(currentHsv)}`;
    setTextValue(value);
    handleEdit(path, value);
    addToEditedList({ RowIdx, RowValue: value, InitialValue });
  };
  const handleClose = () => {
    setIsOpen(false);
    setCurrentHsv(hexToHsv(value));
  };
  const handleIconClick = (event: MouseEvent<SVGSVGElement>) => {
    setIsOpen(!isOpen);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setHexText(hsvToHex(currentHsv));
  }, [currentHsv]);

  return (
    <>
      <SquareRoundedIcon
        sx={{
          marginLeft: '-4px',
          paddingRight: '.5rem',
          paddingTop: '1px',
          '&:hover': {
            cursor: 'pointer',
          },
          color: `#${value.substring(4, 12)}`,
        }}
        onClick={handleIconClick}
      />
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClose}
      >
        <ColorPopover
          hexText={hexText}
          setHexText={setHexText}
          currentHsv={currentHsv}
          setCurrentHsv={setCurrentHsv}
          handleColorChange={handleColorChange}
        />
      </Popover>
    </>
  );
};

export default FlutterColorPicker;
