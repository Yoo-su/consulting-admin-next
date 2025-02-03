import styled from '@emotion/styled';

type DirectoryInputProps = {
  webkitdirectory?: string | boolean;
  directory?: string | boolean;
};

export const HiddenFileInput = styled('input')<DirectoryInputProps>({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
