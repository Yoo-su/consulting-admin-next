export const checkFileType = (file: File | null): boolean =>
  Boolean(file && (file.type === 'application/pdf' || file.type.startsWith('image/')));
