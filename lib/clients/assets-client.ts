import { S3Client } from '@aws-sdk/client-s3';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_OFFLINE } from '../config';
const isOffline = BUCKET_OFFLINE === 'true';

export const createAssetsClient = () =>
  new S3Client({
    ...(isOffline && { endpoint: 'http://localhost:4569' }),
    forcePathStyle: true,
    credentials: {
      accessKeyId: isOffline ? 'S3RVER' : AWS_ACCESS_KEY_ID,
      secretAccessKey: isOffline ? 'S3RVER' : AWS_SECRET_ACCESS_KEY,
    },
  });
