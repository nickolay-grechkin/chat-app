import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

const REGION = 'eu-central-1';

const client = new S3Client({region: REGION});

export const uploadFile = async (fileName?: string, buffer?: any, mimetype?: string) => {
	const command = new PutObjectCommand({
		Bucket: 'chat-app-999',
		Key: fileName,
		Body: buffer,
		ContentType: mimetype,
	});

	try {
		const response = await client.send(command);
		console.log(response);
	} catch (err) {
		console.error(err);
	}

	return getSignedUrl(client, new GetObjectCommand({Bucket: 'chat-app-999', Key: fileName}));
};
