'use client';

import {Buffer} from "buffer";

const encrypt = async (data: string|object) => {

    const PUBLIC_KEY = Buffer.from(process.env.NEXT_PUBLIC_PUBLIC_KEY as string, 'base64').toString('ascii');

    //next dynamic import to fix window object issue
    //https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-external-libraries
    const JSEncrypt = (await import('jsencrypt')).default;
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(PUBLIC_KEY);
    if (typeof data === 'object') {
        data = JSON.stringify(data);
    }
    const encrypted = jsEncrypt.encrypt(data);

    if (encrypted !== false) {
        return encrypted;
    }

    throw new Error('Failed to encrypt data');
}

export { encrypt }