import * as pulumi from "@pulumi/pulumi";

export const STACK_NAME = pulumi.getStack()
export const PROJECT_NAME = pulumi.getProject()

export function getPrefix() {
  return `${STACK_NAME}-${PROJECT_NAME}`
}
