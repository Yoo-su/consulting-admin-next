'use client';

import {
  Code as CodeIcon,
  FormatAlignCenter as AlignCenterIcon,
  FormatAlignJustify as AlignJustifyIcon,
  FormatAlignLeft as AlignLeftIcon,
  FormatAlignRight as AlignRightIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatListBulleted as ListIcon,
  FormatListNumbered as ListOrderedIcon,
  FormatQuote as QuoteIcon,
  FormatSize as Heading2Icon,
  FormatUnderlined as UnderlineIcon,
  Html as HtmlIcon,
  Link as LinkIcon,
  Redo as RedoIcon,
  StrikethroughS as StrikethroughIcon,
  TableChart as TableIcon,
  Title as TitleIcon,
  Undo as UndoIcon,
} from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Editor } from '@tiptap/react';
import { MouseEvent, useCallback, useState } from 'react';

import { ColorPicker, HeadingMenu, HtmlEditDialog, TableMenu } from './items';

type ToolbarProps = {
  editor: Editor;
};

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const theme = useTheme();
  const downlg = useMediaQuery(theme.breakpoints.down('lg'));
  const [headingAnchorEl, setHeadingAnchorEl] = useState<null | HTMLElement>(null);
  const [tableAnchorEl, setTableAnchorEl] = useState<null | HTMLElement>(null);
  const [isHtmlDialogOpen, setIsHtmlDialogOpen] = useState(false);

  const handleOpenHtmlDialog = () => {
    setIsHtmlDialogOpen(true);
  };

  const handleCloseHtmlDialog = () => {
    setIsHtmlDialogOpen(false);
  };

  const handleOpenHeadingMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setHeadingAnchorEl(event.currentTarget);
  }, []);
  const handleCloseHeadingMenu = () => {
    setHeadingAnchorEl(null);
  };
  const handleOpenTableMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setTableAnchorEl(event.currentTarget);
  }, []);
  const handleCloseTableMenu = () => {
    setTableAnchorEl(null);
  };

  const menus = [
    {
      name: 'heading',
      icon: <TitleIcon fontSize="inherit" />,
      onClick: handleOpenHeadingMenu,
      isActive:
        editor.isActive('heading', { level: 1 }) ||
        editor.isActive('heading', { level: 2 }) ||
        editor.isActive('heading', { level: 3 }) ||
        editor.isActive('heading', { level: 4 }) ||
        editor.isActive('heading', { level: 5 }) ||
        editor.isActive('heading', { level: 6 }),
      disabled: false,
      split: true,
    },
    {
      name: 'bold',
      icon: <BoldIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      name: 'italic',
      icon: <ItalicIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      name: 'strike',
      icon: <StrikethroughIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      name: 'underline',
      icon: <UnderlineIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run(),
    },
    {
      name: 'link',
      icon: <LinkIcon fontSize="inherit" />,
      //onClick: () => editor.chain().focus().setLink().run(),
      disabled: false,
      split: true,
    },
    // order
    {
      name: 'bulletList',
      icon: <ListIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      disabled: !editor.can().chain().focus().toggleBulletList().run(),
    },
    {
      name: 'orderedList',
      icon: <ListOrderedIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      split: true,
    },
    // alignment
    {
      name: 'align-left',
      icon: <AlignLeftIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      disabled: false,
      active: { textAlign: 'left' },
      group: 'align',
    },
    {
      name: 'align-center',
      icon: <AlignCenterIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      disabled: false,
      active: { textAlign: 'center' },
      group: 'align',
    },
    {
      name: 'align-right',
      icon: <AlignRightIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      disabled: false,
      active: { textAlign: 'right' },
      group: 'align',
    },
    {
      name: 'align-justify',
      icon: <AlignJustifyIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
      disabled: false,
      active: { textAlign: 'justify' },
      split: true,
      group: 'align',
    },
    {
      name: 'blockquote',
      icon: <QuoteIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      disabled: false,
    },
    {
      name: 'codeBlock',
      icon: <CodeIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      disabled: false,
      split: true,
    },
    {
      name: 'table',
      icon: <TableIcon fontSize="inherit" />,
      onMouseEnter: (event: MouseEvent<HTMLElement>) => {
        handleOpenTableMenu(event);
      },
      disabled: false,
      split: true,
    },
    {
      name: 'undo',
      icon: <UndoIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo(),
      default: true,
    },
    {
      name: 'redo',
      icon: <RedoIcon fontSize="inherit" />,
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo(),
      split: true,
      default: true,
    },
    {
      name: 'editHtml',
      icon: <HtmlIcon fontSize="inherit" />,
      onClick: handleOpenHtmlDialog,
      disabled: false,
      split: true,
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        borderRadius: '0 1rem 0 0',
        //border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 3px 8px -3px rgb(0 0 0 / 0.1), 0 3px 3px -4px rgb(0 0 0 / 0.1)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: downlg ? '0.3rem' : '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        {menus.map((menu, idx) => (
          <Tooltip title={menu.name} key={menu.name + idx}>
            <span>
              <IconButton
                size={downlg ? 'small' : 'medium'}
                onClick={menu.onClick}
                disabled={menu.disabled}
                onMouseEnter={menu.onMouseEnter}
                color={editor.isActive(menu.name) ? 'primary' : 'default'}
              >
                {menu.icon}
              </IconButton>
            </span>
          </Tooltip>
        ))}
        <ColorPicker editor={editor} downlg={downlg} />
      </Box>
      <TableMenu editor={editor} anchorEl={tableAnchorEl} onClose={handleCloseTableMenu} />
      <HeadingMenu editor={editor} anchorEl={headingAnchorEl} onClose={handleCloseHeadingMenu} />
      <HtmlEditDialog editor={editor} open={isHtmlDialogOpen} onClose={handleCloseHtmlDialog} />
    </Box>
  );
};
