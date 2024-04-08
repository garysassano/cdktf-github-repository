import { javascript } from "projen";
import { CdktfTypeScriptApp } from "projen-cdktf-app-ts";
const project = new CdktfTypeScriptApp({
  cdktfVersion: "0.20.7",
  defaultReleaseBranch: "main",
  depsUpgradeOptions: { workflow: false },
  devDeps: ["projen-cdktf-app-ts"],
  eslint: true,
  minNodeVersion: "20.11.1",
  name: "cdktf-github-repository",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "9.0.5",
  prettier: true,
  projenrcTs: true,

  terraformProviders: ["integrations/github@~> 6.2.1"],
});

// Generate CDKTF constructs after installing deps
project.tasks.tryFind("install")?.spawn(project.cdktfTasks.get);

project.synth();
