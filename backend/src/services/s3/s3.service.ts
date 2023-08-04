import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {type MulterFile} from '../../common/types/multer-file';

class S3 {
	private readonly bucketName: string;
	private readonly client: S3Client;

	constructor(region: string, bucketName: string) {
		this.client = new S3Client({region});
		this.bucketName = bucketName;
	}

	public async uploadFile(file: MulterFile) {
		const {originalname, mimetype, buffer} = file;

		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			Key: originalname,
			Body: buffer,
			ContentType: mimetype,
		});

		try {
			const response = await this.client.send(command);
			console.log(response);
		} catch (err) {
			console.error(err);
		}

		return getSignedUrl(this.client, new GetObjectCommand({Bucket: this.bucketName, Key: originalname}));
	}
}

export {S3};
