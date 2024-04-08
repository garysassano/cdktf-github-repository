import { App } from "cdktf";
import { MyStack } from "./stacks/my-stack";

const app = new App();

new MyStack(app, "cdktf-github-repository-dev");

app.synth();
