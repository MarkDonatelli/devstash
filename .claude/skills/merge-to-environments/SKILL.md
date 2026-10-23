---
name: merge-to-environments
description: Merge a feature branch directly into selected develop, staging, or test branches for environment testing. Use for environment merge requests; excludes production merges into main.
---

# Merge to environments

Merge the same feature commit directly into each selected environment branch. These are independent destinations, not a promotion chain.

## Boundaries

- Allowed destinations: `develop`, `staging`, `test` only. Never merge into or push `main` with this skill.
- Use only requested destinations. “All testing environments” means all three. Ask which destinations if none are specified.
- Use the current feature branch unless another source is named. Ask for the source if currently on an environment branch, `main`, or a detached HEAD.
- State the source commit and destinations before execution. Existing authorization to merge is sufficient; do not ask again.
- Push only when explicitly requested or already authorized. A merge request alone authorizes local merges only. Pushes may trigger deployments.
- Preserve the feature branch. Never commit feature edits, delete branches, force-push, reset branches, or stash/discard changes automatically.

## Workflow

1. Read repository instructions. Inspect status, remotes, tracking branches, and existing Git operations. Stop for uncommitted changes or an unfinished operation and report them.
2. Fetch the relevant remote and resolve the source to one fixed commit for all destinations. Use tracking configuration to identify the remote; ask if ambiguous. Do not create missing destination branches without instruction.
3. Compare all selected destinations with their remote counterparts before merging. Fast-forward branches that are only behind. Stop for divergence or unexpected local-only commits rather than publishing unrelated work.
4. Run required checks on the source. For DevStash, run `npm run lint` and `npm run build`. Stop on failure. Report required browser checks that cannot be performed; never claim they passed.
5. Record each destination's starting commit, switch to it, and merge the fixed source commit using the established repository strategy. Otherwise use a regular ancestry-preserving merge, allowing fast-forward. Never substitute squash or rebase. Report already-included commits without creating another merge.
6. On conflict, abort only the merge started by this skill and stop. Leave earlier successful merges intact and report conflicting files and completed destinations. Do not guess resolutions.
7. Run required checks on each changed destination's merged result. Stop on failure, report the resulting local commit, and do not push it or silently roll it back.
8. If authorized to push, finish all selected merges and checks first. Push only selected destinations using explicit refspecs. Never use `--all`, `--mirror`, or force options. Stop on rejection and report it rather than overwriting remote work. Record successful pushes because multiple pushes can partially succeed.
9. Restore the original checkout when safe. Report source commit, destination commits, check results, local versus pushed status, and remaining environment testing. A successful push does not prove the deployment works.

## Examples

- “Merge this feature into develop.” → Local merge into develop only.
- “Merge and push this feature into staging and test.” → Merge, verify, and push those two branches only.
- “Merge and push this feature into all testing environments.” → Target develop, staging, and test.
- “Merge this into main.” → Explain production is outside this skill; do not perform it through this workflow.
