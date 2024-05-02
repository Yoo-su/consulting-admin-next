"use client";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ProfileIcon from "@mui/icons-material/AccountBox";
import SignoutIcon from "@mui/icons-material/ExitToApp";
import { useUser } from "@/features/auth/hooks/use-user";

export type UserPopoverProps = {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
};

const UserPopover = ({ anchorEl, onClose, open }: UserPopoverProps) => {
  const { user, setUser } = useUser();

  const signout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: "240px" } } }}
    >
      <Box sx={{ p: "16px 20px " }}>
        <Typography variant="subtitle1">
          {user?.name} / {user?.role === "developer" ? "개발자" : "운영자"}
        </Typography>
        <Typography variant="subtitle2">{user?.userID}</Typography>
        <Typography color="text.secondary" variant="body2">
          suhyun0871@jinhakapply.com
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
      >
        <MenuItem component={RouterLink} href="/" onClick={onClose}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={signout}>
          <ListItemIcon>
            <SignoutIcon />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default UserPopover;
