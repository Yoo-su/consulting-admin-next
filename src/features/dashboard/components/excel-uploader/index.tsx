'use client';

import { useRef } from 'react';

const ExcelUploader = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    console.log(fileInputRef?.current?.value);
  };

  return (
    <>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleClick}>check</button>
    </>
  );
};

export default ExcelUploader;
