import fsSync from "fs";
import path from "path";
import { readMDX, serializeBaseData } from "./index";

const fs = fsSync.promises;
const projectsFolder = path.join(process.cwd(), "content/projects");
const readProject = readMDX(projectsFolder);

export async function getProjectIds() {
  const fileNames = await fs.readdir(projectsFolder);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.mdx$/, "");
  });
}

export async function getProjects() {
  const ids = await getProjectIds();
  const projects = await Promise.all(ids.map(readProject));
  return projects.sort((a, b) => a.data.index - b.data.index);
}

export async function getProject(id) {
  const projects = await getProjects();
  const index = projects.findIndex(({ data }) => data.id == id);
  if (index == -1) {
    return;
  }

  const data = projects[index].data;
  const content = projects[index].content;

  const before =
    projects[index - 1]?.data.id || projects[projects.length - 1]?.data.id;
  const after = projects[index + 1]?.data.id || projects[0]?.data.id;

  let baseData = await serializeBaseData({ data, content });

  return {
    ...baseData,
    before,
    after,
  };
}
