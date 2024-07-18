import { Request } from "express";
import { Readable } from "stream";

export interface MulterRequest extends Request {
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    contentDisposition: null;
    contentEncoding: null;
    storageClass: string;
    serverSideEncryption: null;
    metadata: {
      fileName: string;
    };
    location: string;
    etag: string;
    versionId?: string;
    stream: Readable;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  };
}
