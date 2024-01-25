import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { deplyWeb } from "./stack/web";

const web = deplyWeb()

export const bucketName = web.bucketId;
export const cdnURL = web.cdnURL;
