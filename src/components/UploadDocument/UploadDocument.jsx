import { useState } from "react";
import UploadButton from "./uploadButton";
import UploadDialog from "./uploadDialog";

export default function UploadDocument({ onChanged }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UploadButton setOpen={setOpen} />
      <UploadDialog open={open} setOpen={setOpen} onUpload={onChanged} />
    </>
  );
}