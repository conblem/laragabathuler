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
  let projects = await Promise.all(ids.map(readProject));
  return projects.map(({ data }) => data);
}

async function readProject(id) {
  let fileName = path.join(projectsFolder, `${id}.mdx`);
  let file = await fs.readFile(fileName);
  return matter(file);
}

export async function getProject(id) {
  let { content, data } = await readProject(id);
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
  };
}
