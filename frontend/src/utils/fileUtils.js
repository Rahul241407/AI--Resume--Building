// fileUtils.js

export const dataURLtoFile = (dataurl, filename) => {
  if (!dataurl || typeof dataurl !== "string") {
    throw new Error("Invalid dataURL");
  }

  const arr = dataurl.split(',');

  if (arr.length < 2) {
    throw new Error("Malformed dataURL");
  }

  const mimeMatch = arr[0].match(/:(.*?);/);

  if (!mimeMatch) {
    throw new Error("Invalid MIME type in dataURL");
  }

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};