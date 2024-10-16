export const getFileNoFromEvent = (fullId: string) => {
  return parseInt(fullId.replace(/.*-/, ''));
};

export const removeFileExtention = (fileName: string) => {
  return fileName.replace(/\.[^.]*$/, '');
};
