import AWS from "aws-sdk";

import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

const REGION = "eu-central-1";

const client = new S3Client({ region: REGION });

export const uploadFile = async () => {
    const command = new PutObjectCommand({
        Bucket: "chat-app-bucket-333",
        Key: "hello-s3.txt",
        Body: "Hello S3!",
    });

    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
}
