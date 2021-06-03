import fsSync from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const fs = fsSync.promises;
const projectsFolder = path.join(process.cwd(), "content/projects");

export async function getProjectIds() {
  const fileNames = await fs.readdir(projectsFolder);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.mdx$/, "");
  });
}

export async function getProjects() {
  const ids = await getProjectIds();
  return await Promise.all(ids.map(readProject));
}

async function readProject(id) {
  let fileName = path.join(projectsFolder, `${id}.mdx`);
  let file = await fs.readFile(fileName);
  return matter(file);
}

export async function getProject(id) {
  const projects = await getProjects();
  const index = projects.findIndex(({ data }) => data.id == id);
  const data = projects[index].data;
  const content = projects[index].content;

  const before =
    projects[index - 1]?.data.id || projects[projects.length - 1]?.data.id;
  const after = projects[index + 1]?.data.id || projects[0]?.data.id;

  let [source, summary, description] = await Promise.all([
    serialize(content),
    serialize(data.summary),
    serialize(data.description),
  ]);

  const componentNames = [/<Lottie/.test(content) ? "Lottie" : null].filter(
    Boolean
  );

  return {
    source,
    summary,
    description,
    componentNames,
    before,
    after,
  };
}
