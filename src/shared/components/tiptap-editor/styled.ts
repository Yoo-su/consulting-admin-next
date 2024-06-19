import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const TiptapContainer = styled(Stack)(({ theme }) => ({
  '.tiptap': {
    ':first-child': {
      marginTop: 0,
    },

    /* List styles */
    'ul, ol': {
      padding: '0 1rem',
    },

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '0.75rem', // Adjust as needed
    fontSize: '16px',
    fontWeight: '500',
    outline: 'none',
    padding: '1rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    height: '500px',
    overflow: 'scroll',

    blockquote: {
      borderLeft: '3px solid rgba(13, 13, 13, 0.1)',
      paddingLeft: '1rem',
    },

    pre: {
      background: '#0d0d0d',
      borderRadius: '0.5rem',
      color: '#fff',
      margin: '1.5rem 0',
      padding: '0.75rem 1rem',

      code: {
        background: 'none',
        color: 'inherit',
        fontSize: '0.8rem',
        padding: '0',
      },
      '.hljs-comment, .hljs-quote': {
        color: '#616161',
      },

      '.hljs-variable, .hljs-template-variable, .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-selector-id, .hljs-selector-class':
        {
          color: '#f98181',
        },

      '.hljs-number, .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal, .hljs-type, .hljs-params': {
        color: '#fbbc88',
      },

      '.hljs-string, .hljs-symbol, .hljs-bullet': {
        color: '#b9f18d',
      },

      '.hljs-title, .hljs-section': {
        color: '#faf594',
      },

      '.hljs-keyword, .hljs-selector-tag': {
        color: '#70cff8',
      },

      '.hljs-emphasis': {
        fontStyle: 'italic',
      },

      '.hljs-strong': {
        fontWeight: 700,
      },
    },

    table: {
      borderCollapse: 'collapse',
      margin: 0,
      overflow: 'hidden',
      tableLayout: 'fixed',
      width: '100%',

      'td, th': {
        border: '2px solid #ced4da',
        boxSizing: 'border-box',
        minWidth: '1em',
        padding: '3px 5px',
        position: 'relative',
        verticalAlign: 'top',

        '& > *': {
          marginBottom: 0,
        },
      },

      th: {
        backgroundColor: '#f1f3f5',
        fontWeight: 'bold',
        textAlign: 'left',
      },

      '.selectedCell:after': {
        background: 'rgba(200, 200, 255, 0.4)',
        content: '""',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 2,
      },

      '.column-resize-handle': {
        backgroundColor: '#adf',
        bottom: '-2px',
        pointerEvents: 'none',
        position: 'absolute',
        right: '-2px',
        top: 0,
        width: '4px',
      },
    },

    '.tableWrapper': {
      margin: '1.5rem 0',
      overflowX: 'auto',
    },

    '.resize-cursor': {
      cursor: 'ew-resize, col-resize',
    },
  },
  hr: {
    border: 'none',
    borderTop: '1px solid rgba(0,0,0,0.1)',
    margin: '2rem 0',
  },
}));
