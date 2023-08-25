"use client";

import { useEffect, useState } from "react";
import { createHelia } from "helia";
import { dagJson } from "@helia/dag-json";

const Helia = () => {
  const [helia, setHelia] = useState<any>("");

  const initHelia = async () => {
    const helia = await createHelia();
    const d = dagJson(helia);
    setHelia(d);
  };
  const onFileUpload = async (e: any) => {
    const file = e.target.files[0];
    // setFileName(file.name);
    try {
      console.log(`adding ${file.name} to ipfs....`);

      const cid = await helia.add(
        { content: file },
        {
          cidVersion: 1,
          hashAlg: "sha2-256",
        }
      );
      const url = `https://ipfs.infura.io/ipfs/${cid}`;
      console.log("cid: ", cid);

      console.log("helia url: ", url);
      //   setImageURL(url);
    } catch (e) {
      console.error("Error uploading file: ", e);
    }
  };

  useEffect(() => {
    initHelia();
  }, []);

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

export default Helia;
