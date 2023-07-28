import { S3 } from "./s3.service";


const s3Client = new S3("eu-central-1", "chat-app-999");

export { s3Client };
