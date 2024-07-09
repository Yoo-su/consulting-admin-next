'use client';

import { useEffect } from 'react';
import { useEditor, AnyExtension, EditorOptions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import HardBreak from '@tiptap/extension-hard-break';
import TipTapTypography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    codeBlock: false,
    hardBreak: false,
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),
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
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
    defaultLanguage: 'javascript',
  }),
];

export type UseTextEditorInputProps = {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
} & Partial<EditorOptions>;

export const useTextEditor = ({ placeholder, onChange, value, ...editorOptions }: UseTextEditorInputProps) => {
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
      onChange(html);
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
    ...editorOptions,
  });

  // set initial value for editor even if it's already set (below)
  useEffect(() => {
    if (!(editor && value)) return;
    editor?.setOptions({
      editorProps: {},
    });
  }, [editor]);

  return editor;
};
