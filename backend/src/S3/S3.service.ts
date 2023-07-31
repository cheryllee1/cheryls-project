import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
  AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  });

  // https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html#bucket-policy-static-site
  async uploadFile(file: Express.Multer.File) {
    try {
      const { originalname } = file;

      const params = {
        Bucket: this.AWS_BUCKET_NAME || "",
        Key:
          Math.trunc(Math.random() * 10000).toString() + String(originalname),
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentDisposition: "inline",
        CreateBucketConfiguration: { LocationConstraint: "ap-southeast-1" },
      };

      const s3Response = await this.s3.upload(params).promise();

      return s3Response.Location;
    } catch (e) {
      console.log(e);
    }
  }
}
