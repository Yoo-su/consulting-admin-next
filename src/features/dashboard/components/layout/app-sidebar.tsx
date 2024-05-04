'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import UnivSelect from '@/shared/components/selects/univ';
import ServiceSelect from '@/shared/components/selects/service';
import { sideNavItems1, sideNavItems2, sideNavItems3 } from './side-nav-items';
import { NavItemType } from '../../types/nav-item.type';
import { isNavItemActive } from '../../services/is-nav-item-active';

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: { xs: 'none', lg: 'flex' },
        bgcolor: '#fff',
        color: '#343A40',
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
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component="div" sx={{ display: 'inline-flex', justifyContent: 'center' }}>
          <Typography variant="h5" fontWeight={'bold'}>
            입학상담앱 관리자
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            borderRadius: '12px',
            display: 'flex',
          }}
        >
          <Box sx={{ flex: '1 1 auto' }}>
            <UnivSelect />
            <ServiceSelect />
          </Box>
        </Box>
      </Stack>
      <Divider />
      <Stack
        direction="column"
        sx={{
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
          {renderNavItems({ items: sideNavItems1, pathname })}
        </Box>
        <Divider sx={{ marginTop: '12px' }} />
        <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
          {renderNavItems({ items: sideNavItems2, pathname })}
        </Box>
        <Divider sx={{ marginTop: '12px' }} />
        <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
          {renderNavItems({ items: sideNavItems3, pathname })}
        </Box>
      </Stack>
    </Box>
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
            bgcolor: '#E0F3FF',
            color: '#5B64DA',
          }),
          '&:hover': {
            bgcolor: '#E0F3FF',
            color: '#5B64DA',
          },
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

export default AppSidebar;
