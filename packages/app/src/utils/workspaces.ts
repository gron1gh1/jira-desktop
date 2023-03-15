import { getWorkspaces } from "workspace-tools";

export const workspaces = getWorkspaces(process.cwd()).reduce<
  Record<string, string>
>((acc, workspace) => {
  acc[workspace.name] = workspace.path;
  return acc;
}, {});
