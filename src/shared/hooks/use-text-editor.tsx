'use client';

import { useEffect } from 'react';
import { Theme } from '@emotion/react';
import { css } from '@emotion/css';
import { useEditor, AnyExtension, EditorOptions, mergeAttributes } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import HardBreak from '@tiptap/extension-hard-break';
import TipTapTypography from '@tiptap/extension-typography';
import { useTheme } from '@mui/material';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Gapcursor from '@tiptap/extension-gapcursor';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';

const classes = {
  input: (theme: Theme) =>
    css({
      borderRadius: '0 0 6 6',
      border: '1px solid rgba(0,0,0,0.1)',
      borderTop: 'none',
      paddingLeft: 16,
      paddingRight: 16,
      minHeight: 150,
      '& p.is-editor-empty:first-child::before': {
        content: 'attr(data-placeholder)',
        float: 'left',
        height: 0,
        pointerEvents: 'none',
        color: 'rgba(0,0,0,0.3)',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '157.143%' /* 157.143% */,
      },
    }),
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),
  Document,
  Paragraph,
  Text,
  TipTapTypography,
  Underline,
  HardBreak.configure({
    keepMarks: false,
  }),
  Link.configure({
    protocols: [
      'https',
      'mailto',
      {
        scheme: 'tel',
        optionalSlashes: true,
      },
    ],
    HTMLAttributes: {
      // Change rel to different value
      // Allow search engines to follow links(remove nofollow)
      rel: 'noopener noreferrer',
      // Remove target entirely so links open in current tab
      target: null,
    },
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Gapcursor,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
    defaultLanguage: 'javascript',
  }),
];

export type UseTextEditorInputProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
} & Partial<EditorOptions>;

export const useTextEditor = ({ placeholder, onChange, value, ...editorOptions }: UseTextEditorInputProps) => {
  const theme = useTheme();

  const editor = useEditor({
    content: value,
    extensions: [
      Placeholder.configure({
        placeholder,
      }),
      ...extensions,
    ] as AnyExtension[],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
    ...editorOptions,
  });

  // set initial value for edition even if it's already set (below)
  useEffect(() => {
    if (!(editor && value)) return;
    editor?.setOptions({
      editable: true,
      editorProps: {
        attributes: {
          class: classes.input(theme),
        },
      },
    });
    editor.commands.setContent(value);
    // !important: to avoid update for each taping, the value should be excluded from the dependencies
  }, [editor]);

  return editor;
};
