"use client";

import { useState } from "react";
import { create } from "ipfs-http-client";

const url: string | any = "https://ipfs.infura.io:5001/api/v0";
const client = create(url);

const UploadIpfs = () => {
  const [fileName, setFileName] = useState("");
  const [imageURL, setImageURL] = useState("");

  const onFileUpload = async (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);
    try {
      console.log(`adding ${file.name} to ipfs....`);

      const { cid } = await client.add(
        { content: file },
        {
          cidVersion: 1,
          hashAlg: "sha2-256",
        }
      );
      const url = `https://ipfs.infura.io/ipfs/${cid}`;

      console.log("ipfs url: ", url);
      setImageURL(url);
    } catch (e) {
      console.error("Error uploading file: ", e);
    }
  };

  return (
    <div>
      <label className="font-semibold text-red-500">Upload Photo</label>
      <input
        type="file"
        accept=".jpeg,.jpg,.png,.gif"
        onChange={onFileUpload}
      />
    </div>
  );
};

export default UploadIpfs;
