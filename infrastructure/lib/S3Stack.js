import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as sst from "@serverless-stack/resources";

export default class S3Stack extends sst.Stack {
  // public reference to the s3 bucket
  bucket;
  constructor(scope, id, props) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, "Uploads", {
      cors: [
        {
          maxAge: 3000,
          allowedHeaders: ["*"],
          allowedOrigins: ["*"],
          allowedMethods: ["GET", "POST", "PUT", "DELETE", "HEAD"],
        },
      ],
    });

    // export value
    new cdk.CfnOutput(this, "AttachmentsBucketName", {
      value: this.bucket.bucketName,
    });
  }
}
