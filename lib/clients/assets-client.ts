import { S3Client } from '@aws-sdk/client-s3';

const isOffline = process.env.ASSETS_OFFLINE === 'true';

export const createAssetsClient = () =>
  new S3Client({
    ...(isOffline && { endpoint: 'http://localhost:4569' }),
    // forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });
