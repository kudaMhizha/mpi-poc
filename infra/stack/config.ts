import { Config } from "@pulumi/pulumi";

const config = new Config();

/// Cloudfront config
const errorDocument = config.get("errorDocument") ?? "error.html";
const indexDocument = config.get("indexDocument") ?? "index.html";