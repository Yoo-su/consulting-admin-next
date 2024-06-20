import { useState, useCallback, MouseEvent } from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Editor } from '@tiptap/react';
import {
  Title as TitleIcon,
  FormatBold as BoldIcon,
  StrikethroughS as StrikethroughIcon,
  FormatItalic as ItalicIcon,
  FormatListBulleted as ListIcon,
  FormatListNumbered as ListOrderedIcon,
  FormatSize as Heading2Icon,
  FormatUnderlined as UnderlineIcon,
  FormatQuote as QuoteIcon,
  FormatAlignLeft as AlignLeftIcon,
  FormatAlignCenter as AlignCenterIcon,
  FormatAlignRight as AlignRightIcon,
  FormatAlignJustify as AlignJustifyIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Code as CodeIcon,
  TableChart as TableIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

import TableMenu from './items/table-menu';
import ColorPicker from './items/color-picker';
import HeadingMenu from './items/heading-menu';

type ToolbarProps = {
  editor: Editor;
  content: string;
};
const Toolbar: React.FC<ToolbarProps> = ({ editor, content }) => {
  const [headingAnchorEl, setHeadingAnchorEl] = useState<null | HTMLElement>(null);
  const [tableAnchorEl, setTableAnchorEl] = useState<null | HTMLElement>(null);

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
      icon: <TitleIcon />,
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
      icon: <BoldIcon />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      name: 'italic',
      icon: <ItalicIcon />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      name: 'strike',
      icon: <StrikethroughIcon />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      name: 'underline',
      icon: <UnderlineIcon />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run(),
    },
    {
      name: 'link',
      icon: <LinkIcon />,
      //onClick: () => editor.chain().focus().setLink().run(),
      disabled: false,
      split: true,
    },
    // order
    {
      name: 'bulletList',
      icon: <ListIcon />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      disabled: !editor.can().chain().focus().toggleBulletList().run(),
    },
    {
      name: 'orderedList',
      icon: <ListOrderedIcon />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      split: true,
    },
    // alignment
    {
      name: 'align-left',
      icon: <AlignLeftIcon />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      disabled: false,
      active: { textAlign: 'left' },
      group: 'align',
    },
    {
      name: 'align-center',
      icon: <AlignCenterIcon />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      disabled: false,
      active: { textAlign: 'center' },
      group: 'align',
    },
    {
      name: 'align-right',
      icon: <AlignRightIcon />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      disabled: false,
      active: { textAlign: 'right' },
      group: 'align',
    },
    {
      name: 'align-justify',
      icon: <AlignJustifyIcon />,
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
      disabled: false,
      active: { textAlign: 'justify' },
      split: true,
      group: 'align',
    },
    {
      name: 'blockquote',
      icon: <QuoteIcon />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      disabled: false,
    },
    {
      name: 'codeBlock',
      icon: <CodeIcon />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      disabled: false,
      split: true,
    },
    {
      name: 'table',
      icon: <TableIcon />,
      /* onClick: () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
      }, */
      onMouseEnter: (event: MouseEvent<HTMLElement>) => {
        handleOpenTableMenu(event);
      },
      disabled: false,
      split: true,
    },
    {
      name: 'undo',
      icon: <UndoIcon />,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo(),
      default: true,
    },
    {
      name: 'redo',
      icon: <RedoIcon />,
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo(),
      split: true,
      default: true,
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
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {menus.map((menu, idx) => (
          <Tooltip title={menu.name} key={menu.name + idx}>
            <IconButton
              onClick={menu.onClick}
              disabled={menu.disabled}
              onMouseEnter={menu.onMouseEnter}
              color={editor.isActive(menu.name) ? 'primary' : 'default'}
            >
              {menu.icon}
            </IconButton>
          </Tooltip>
        ))}
        <ColorPicker editor={editor} />
      </Box>
      <TableMenu editor={editor} anchorEl={tableAnchorEl} onClose={handleCloseTableMenu} />
      <HeadingMenu editor={editor} anchorEl={headingAnchorEl} onClose={handleCloseHeadingMenu} />
      {content.length && (
        <Button
          onClick={() => {
            console.log(content);
          }}
        >
          test
        </Button>
      )}
    </Box>
  );
};

export default Toolbar;
