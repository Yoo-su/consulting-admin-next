export const BasicFormTitleClass = (isEdited: boolean) => ({
  paddingBottom: '1px',
  backgroundColor: isEdited ? '#EEEEEE' : '',
});

export const BasicFormKoreanTitleClass = { color: '#757575' };

//#region CheckBox
export const CheckBoxClass = {
  '& .MuiButtonBase-root': {
    padding: '0 .3rem 0 .5rem',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
    paddingTop: '2px',
  },
  '& .MuiTypography-root': {
    fontSize: '.9rem',
    width: '100%',
  },
};
//#endregion CheckBox
//#region Boolean
export const BooleanFromGroupClass = {
  paddingLeft: '.5rem',
  '& .MuiFormControlLabel-label.Mui-disabled': {
    color: 'rgba(0, 0, 0, 0.77) !important',
  },
};

export const BooleanFormCheckBoxClass = (isDisabled: boolean) => ({
  color: isDisabled ? '#FAFAFA' : 'rgba(0, 0, 0, 0.87) !important',
});
//#endregion Boolean
//#region Map
export const MapTBLHeaderBorderClass = {
  border: '1px solid rgba(224, 224, 224, 1)',
  borderBottomColor: 'transparent',
  borderRadius: '1rem',
};
export const MapTBLHeaderCellClass = { fontWeight: 'bolder', width: '35%' };
export const MapTBLRowBorderClass = {
  border: '1px solid rgba(224, 224, 224, 1)',
  borderBottomColor: 'transparent',
  borderTopColor: 'transparent',
};
export const MapTBLTextFieldClass = {
  '& .MuiInputBase-root': {
    fontSize: '.9rem',
  },
  '& .MuiInputBase-input': {
    padding: '2px 4px',
  },
};

export const MapCreateNewButtonClass = {
  verticalAlign: 'middle',
  backgroundColor: '#616161',
  padding: '2px 0',
};

export const MapEditSaveButtonClass = { width: '.7em', height: '.7em' };
//#endregion Map
//#region Select
export const SelectFormClass = (isDisabled: boolean) => ({
  '& .MuiInputBase-root': {
    fontSize: '.9rem',
  },
  '& .Mui-disabled': {
    WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#FAFAFA',
  },
  '& .MuiSvgIcon-root': {
    display: isDisabled ? 'none' : 'block',
  },
});
//#endregion Select
//#region Text
export const TextFormClass = {
  '& .MuiInputBase-root': {
    fontSize: '.9rem',
  },
  '& .Mui-disabled': {
    WebkitTextFillColor: 'rgba(0, 0, 0, 0.87) !important',
    backgroundColor: '#FAFAFA',
  },
};
//#endregion Text
//#region color picker
export const ColorSquareClass = {
  width: '93px',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '5%',
  marginLeft: '1px',
  '& .MuiInputBase-input': { padding: 0 },
  '& .MuiInputAdornment-root': {
    marginRight: '1px',
    paddingBottom: '1px',
    paddingLeft: '1.5px',
  },
  '& .MuiTypography-root': {
    color: 'rgba(0, 0, 0, 0.84)',
  },
};
//#endregion colorpicker
