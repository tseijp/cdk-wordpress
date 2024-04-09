/**
 * CDK アプリケーションのメインスタック
 * (スタックとは、関連する 1 つ以上の AWS リソースを定義したもの)
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

export class CdkWordpressStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "CdkWordpressQueue", {
      visibilityTimeout: Duration.seconds(300),
    });

    const topic = new sns.Topic(this, "CdkWordpressTopic");

    topic.addSubscription(new subs.SqsSubscription(queue));
  }
}
*/

import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

export class CdkWordpressStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "CdkWordpressQueue", {
      visibilityTimeout: Duration.seconds(300),
    });

    const topic = new sns.Topic(this, "CdkWordpressTopic");

    topic.addSubscription(new subs.SqsSubscription(queue));
  }
}
