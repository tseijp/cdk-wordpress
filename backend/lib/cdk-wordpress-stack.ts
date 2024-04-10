/**
 * CDK アプリケーションのメインスタック
 * (スタックとは、関連する 1 つ以上の AWS リソースを定義したもの)
 */

import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { readFileSync } from "fs";

export class CdkWordpressStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Add vpc
    const vpc = new ec2.Vpc(this, "CdkWordPressMyVPC", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"), // The Provider to use to allocate IPv4 Space to your VPC.
    });

    // Add ec2 instance
    const webServer1 = new ec2.Instance(this, "CdkWordPressMyWebServer1", {
      // VPC to launch the instance in.
      vpc,
      // Type of instance to launch.
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.SMALL
      ),
      // AMI to launch.
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2, // What generation of Amazon Linux to use.
      }),
      // Where to place the instance within the VPC.
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });

    const script = readFileSync("./lib/resources/user-data.sh", "utf8");

    // Add command to the startup script of the instance.
    webServer1.addUserData(script);

    // Allows specify security group connections for the instance.
    webServer1.connections.allowFromAnyIpv4(ec2.Port.tcp(80));

    // output instance public ip address
    new CfnOutput(this, "WordpressServer1MyPublicIPAddress", {
      value: `http://${webServer1.instancePublicIp}`,
    });
  }
}
