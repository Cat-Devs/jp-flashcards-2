import { GetObjectCommand } from '@aws-sdk/client-s3';
import { createAssetsClient } from '../clients/assets-client';

export const getImage = async (bucketName: string, objectName: string) => {
  try {
    const client = createAssetsClient();
    const getObjectResult = await client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      })
    );

    if (!getObjectResult.Body) {
      throw new Error(`${objectName} empty Body`);
    }

    const bodyStream = getObjectResult.Body;
    const bodyAsString = await bodyStream.transformToString('base64');
    return bodyAsString;
  } catch (error) {
    console.error(
      `Error 'GetObjectCommand' in 'getImage' with 'bucketName': '${bucketName}' and 'objectName': '${objectName}':`,
      (error as Error)?.message || error
    );
  }
};
