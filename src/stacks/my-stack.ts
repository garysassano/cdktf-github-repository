// import path from "path";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { BranchProtection } from "../../.gen/providers/github/branch-protection";
import { GithubProvider } from "../../.gen/providers/github/provider";
import { Repository } from "../../.gen/providers/github/repository";

export class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GithubProvider(this, "GithubProvider");

    const sampleRepo = new Repository(this, "SampleRepo", {
      name: "sample-repo",
      visibility: "public",
      autoInit: true,
      allowAutoMerge: false,
      allowMergeCommit: false,
      allowRebaseMerge: false,
      allowSquashMerge: true,
      allowUpdateBranch: true,
      deleteBranchOnMerge: true,
      hasDiscussions: false,
      hasDownloads: true,
      hasIssues: true,
      hasProjects: true,
      hasWiki: true,
      squashMergeCommitMessage: "COMMIT_MESSAGES",
      squashMergeCommitTitle: "PR_TITLE",
      vulnerabilityAlerts: true,
    });

    new BranchProtection(this, "MainBranchProtection", {
      repositoryId: sampleRepo.nodeId,
      pattern: "main",
      allowsDeletions: false,
      allowsForcePushes: false,
      enforceAdmins: true,
      requireConversationResolution: true,
      requiredPullRequestReviews: [
        {
          dismissStaleReviews: true,
          requiredApprovingReviewCount: 1,
        },
      ],
      requiredStatusChecks: [
        {
          strict: true,
        },
      ],
    });
  }
}
