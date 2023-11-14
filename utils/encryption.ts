//"use client";

import { JSEncrypt } from "jsencrypt";

type encryptProps = {
  contents: string | object;
  domain: string | null;
};

// const encrypt = async (data: encryptProps) => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   console.log(`Encrypt Domain: ${data.domain}`);
//
//   const domain = data.domain ?? "";
//   let PUBLIC_KEY = AppSettings[domain].serverPublicKey;
//   PUBLIC_KEY = Buffer.from(PUBLIC_KEY as string, 'base64').toString('ascii');
//
//  // if (data.domain != null) {
//   //}
//
//   //const CONFIG_KEY = "NEXT_PUBLIC_SERVER_PUBLIC_KEY_" + data.domain;
//   //console.log(CONFIG_KEY);
//   //const PUBLIC_KEY = process.env[CONFIG_KEY]!;
//
//   //const PUBLIC_KEY = Buffer.from(process.env.NEXT_PUBLIC_PUBLIC_KEY as string, 'base64').toString('ascii');
//   //const PUBLIC_KEY = process.env.SERVER_PUBLIC_KEY as string;
//   console.log(PUBLIC_KEY);
//
//   //next dynamic import to fix window object issue
//   //https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-external-libraries
//   const JSEncrypt = (await import("jsencrypt")).default;
//   const jsEncrypt = new JSEncrypt();
//   jsEncrypt.setPublicKey(PUBLIC_KEY);
//   let dataToEncrypt = "";
//   if (typeof data.contents === "object") {
//     dataToEncrypt = JSON.stringify(data.contents);
//   }
//   const encrypted = jsEncrypt.encrypt(dataToEncrypt);
//
//   if (encrypted !== false) {
//     return encrypted;
//   }
//
//   throw new Error("Failed to encrypt data");
// };

const encrypt = async (data: string | object, publicKey: string) => {
  // const PUBLIC_KEY =
  //   "-----BEGIN PUBLIC KEY-----\n" +
  //   "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Mz6POOhliMvYXbea5ol\n" +
  //   "sBqcKDWZzVdbg/UDxj/14uLt4pxB6ftiwK9TmwBmrA3KM0y7M/ywWkd70Y3dTOHt\n" +
  //   "WY4AXSXHGDCX0L3BNIqDMTu3TRTzywt/srEkm/nI8LDZo3Gi/3d2ArS4PA7jJH/h\n" +
  //   "oJ1W/YpkAVKS8iZNzYlDtxgEiRn0pQJrJT9Kh45i+g97nI9bsUq26s+r1tfwaGBu\n" +
  //   "S1siXVMePZiDTotj/nqtrdsLsNFzoIB2OwlLzolEYN9x3wYY4wQrkOgiTsO9VQZ/\n" +
  //   "8qVqcr4ODSAoNaYs40bwrI+S8kWm+WAenmvsCgA6HsEqrC1JtIj5dXnhZxcV/xZK\n" +
  //   "MwIDAQAB\n" +
  //   "-----END PUBLIC KEY-----";
  const PUBLIC_KEY = Buffer.from(publicKey as string, "base64").toString(
    "ascii",
  );
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(PUBLIC_KEY);
  let dataToEncrypt = "";
  if (typeof data === "object") {
    dataToEncrypt = JSON.stringify(data);
  }
  const encrypted = jsEncrypt.encrypt(dataToEncrypt);

  if (encrypted !== false) {
    return encrypted;
  }

  throw new Error("Failed to encrypt data");
};

export { encrypt };
