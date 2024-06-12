'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import UnivAutocomplete from './autocompletes/univ';
import ServiceAutocomplete from './autocompletes/service';
import { sideNavGroup } from './side-nav-items';
import { NavItemType } from '../../types/nav-item.type';
import { isNavItemActive } from '../../services/is-nav-item-active';
import { Accordion, AccordionDetails, AccordionSummary, Drawer } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type AppSideDrawerProps = {
  onClose?: () => void;
  open?: boolean;
};
const AppSideDrawer = ({ open, onClose }: AppSideDrawerProps) => {
  const pathname = usePathname();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#2C4059',
          color: '#fafafa',
          flexDirection: 'column',
          height: '100%',
          left: 0,
          maxWidth: '100%',
          position: 'fixed',
          scrollbarWidth: 'none',
          top: 0,
          width: 'var(--AppSidebar-width)',
          zIndex: 'var(--AppSidebar-zIndex)',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component="div" sx={{ display: 'inline-flex', justifyContent: 'center', whiteSpace: 'nowrap' }}>
          <Typography variant="h5">입학상담앱 관리자</Typography>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            borderRadius: '12px',
            display: 'flex',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <UnivAutocomplete />
            <ServiceAutocomplete />
          </Box>
        </Box>
      </Stack>
      {/* <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} /> */}
      <Stack
        direction="column"
        sx={{
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' },
          '& .MuiPaper-root': { margin: '0 !important' },
          '& .MuiAccordion-root::before': { opacity: '0' },
        }}
      >
        {sideNavGroup.map((group) => (
          <Accordion
            defaultExpanded={group.isExpanded ?? false}
            key={group.title}
            component="nav"
            sx={{
              bgcolor: 'transparent',
              boxShadow: 'none',
              color: 'inherit',
              '& .MuiAccordionSummary-root': { minHeight: '1rem !important', paddingTop: '0.2rem' },
              '& .MuiAccordionSummary-content': { margin: '0 !important' },
              '& .MuiAccordionDetails-root': { padding: '8px !important' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(255,255,255, 0.5)' }} />}
              aria-controls={`${group.title}-content`}
            >
              <Typography
                component="h6"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                }}
              >
                {group.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{renderNavItems({ items: group.items, pathname })}</AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Drawer>
  );
};

function renderNavItems({ items = [], pathname }: { items?: NavItemType[]; pathname: string }) {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemType): React.ReactNode[] => {
    const { navkey, ...item } = curr;

    acc.push(<NavItem key={navkey} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

type NavItemProps = Omit<NavItemType, 'navkey'> & {
  pathname: string;
};
const NavItem = ({ title, href, pathname, Icon }: NavItemProps) => {
  const active = isNavItemActive({ pathname, href });
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <li
      onClick={() => {
        handleClick(href);
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(active && {
            bgcolor: '#fafafa',
            color: '#2C4059',
          }),
          transition: 'all 0.1s linear',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            flex: '0 0 auto',
          }}
        >
          <Icon />
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
              lineHeight: '28px',
              ...(active && {
                fontWeight: 'bold',
              }),
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </li>
  );
};

export default AppSideDrawer;
