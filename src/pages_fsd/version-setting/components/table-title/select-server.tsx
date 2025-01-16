import { MenuItem, TextField } from '@mui/material';

import { SelectClass, VERSION_SERVER } from '../../constants';
import { VersionServer } from '../../models';

type SelectServerProps = {
  setServerType: React.Dispatch<React.SetStateAction<VersionServer>>;
};

export const SelectServer = ({ setServerType }: SelectServerProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServerType(
      VERSION_SERVER.find((server) => server.value === event.target.value)!
    );
  };
  return (
    <TextField
      size="small"
      select
      defaultValue={'testDb'}
      onChange={handleChange}
      sx={SelectClass}
      variant="standard"
    >
      {VERSION_SERVER.map((server) => (
        <MenuItem key={server.value as string} value={server.value as string}>
          {server.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
