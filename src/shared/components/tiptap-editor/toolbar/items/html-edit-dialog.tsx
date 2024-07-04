import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Editor } from '@tiptap/react';

type HtmlEditDialogProps = {
  editor: Editor;
  open: boolean;
  onClose: () => void;
};

const HtmlEditDialog: React.FC<HtmlEditDialogProps> = ({ editor, open, onClose }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (open) {
      setHtml(editor.getHTML());
    }
  }, [open, editor]);

  const handleSave = () => {
    editor.commands.setContent(html);
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

export default HtmlEditDialog;