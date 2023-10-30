import { S3Client } from '@aws-sdk/client-s3';

const isOffline = process.env.BUCKET_OFFLINE === 'true';

export const createAssetsClient = () =>
  new S3Client({
    ...(isOffline && { endpoint: 'http://localhost:4569' }),
    forcePathStyle: true,
    credentials: {
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
    },
  });
