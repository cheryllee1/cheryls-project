import { Injectable, Req, Res } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
  AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  });

  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;

    await this.s3_upload(
      file.buffer,
      this.AWS_BUCKET_NAME || "",
      originalname,
      file.mimetype
    );
  }

  async s3_upload(file: any, bucket: string, name: any, mimetype: any) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: "public-read",
      ContentType: mimetype,
      ContentDisposition: "inline",
      CreateBucketConfiguration: {
        LocationConstraint: "ap-southeast-1",
      },
    };

    console.log(params);

    try {
      let s3Response = await this.s3.upload(params).promise();

      console.log(s3Response);
    } catch (e) {
      console.log(e);
    }
  }
}
