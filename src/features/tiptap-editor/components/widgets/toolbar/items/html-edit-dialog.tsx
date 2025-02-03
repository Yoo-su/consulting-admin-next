'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Editor } from '@tiptap/react';
import { FC, useEffect, useState } from 'react';

type HtmlEditDialogProps = {
  editor: Editor;
  open: boolean;
  onClose: () => void;
};

export const HtmlEditDialog: FC<HtmlEditDialogProps> = ({ editor, open, onClose }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (open) {
      setHtml(editor.getHTML());
    }
  }, [open, editor]);

  const handleSave = () => {
    editor.commands.setContent(html, true);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit HTML</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="HTML Content"
          type="text"
          fullWidth
          multiline
          rows={10}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
