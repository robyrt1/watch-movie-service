// Em algum lugar do seu serviço NestJS (ex: s3.service.ts)
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
    private readonly s3Client = new S3Client({
        region: 'us-east-1',
    });

    async getPresignedUploadUrl(fileName: string, fileType: string): Promise<string> {
        const bucketName = 'watch-brasil-movie-uploads';
        const key = `videos/${Date.now()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: fileType,
        });

        const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 600 });

        return signedUrl;
    }
}

export const S3_SERVICE = 's3Service'