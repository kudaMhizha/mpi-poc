import {Injectable} from '@nestjs/common';
import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UtilityService {
  async uploadFile(userInput: {
    fileName: string;
    fileType: string;
    buffer: string;
  }) {
    const s3 = new S3Client({region: 'eu-west-1'});
    const fileName = userInput?.fileName;
    const fileType = userInput?.fileType ?? 'Config';

    // TODO: Get current user company
    const getCurrentCompany = 'test-company-name';

    const key = `${getCurrentCompany}/${fileType}/${fileName}`;

    const params = {
      Bucket: process.env.AWS_S3_FILE_STORAGE_BUCKET || '',
      Key: key,
      Body: userInput?.buffer,
    };
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);

    const getSignedUrlCommand = new GetObjectCommand(params);

    const url = await getSignedUrl(s3, getSignedUrlCommand, {expiresIn: 3600}); // expires in 1 hr

    return {response, url, key};
  }
}
