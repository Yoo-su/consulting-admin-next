import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { Popover } from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';

import { PopoverAnchorOriginClass, PopoverTransformOriginClass, SquareRoundedIconClass } from '../../constants';
import { useFlutterSetting } from '../../hooks';
import { FormItemProps, HSV } from '../../models';
import { hexToHsv, hsvToHex } from '../../services';
import { ColorPopover } from './color-popover';

type FormColorPickerProps = {
  value: string;
  setTextValue: Dispatch<SetStateAction<string>>;
  RowIdx: number;
  InitialValue: string;
} & Pick<FormItemProps, 'path' | 'handleEdit'>;

export const FormColorPicker = ({
  value,
  setTextValue,
  RowIdx,
  path,
  handleEdit,
  InitialValue,
}: FormColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const [currentHsv, setCurrentHsv] = useState<HSV>(hexToHsv(value));
  const [hexText, setHexText] = useState<string>(value.replace('0xff', '').toUpperCase());
  const { addToEditedList } = useFlutterSetting();

  const handleColorChange = (_: MouseEvent<HTMLButtonElement>) => {
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
      <SquareRoundedIcon sx={SquareRoundedIconClass(`#${value.substring(4, 12)}`)} onClick={handleIconClick} />
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={PopoverAnchorOriginClass}
        transformOrigin={PopoverTransformOriginClass}
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
