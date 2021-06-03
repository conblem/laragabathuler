import fsSync from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const fs = fsSync.promises;
const projectsFolder = path.join(process.cwd(), "content/projects");

export async function getAllProjectIds() {
  const fileNames = await fs.readdir(projectsFolder);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.mdx$/, "");
  });
}

export async function getProject(id) {
  let fileName = path.join(projectsFolder, `${id}.mdx`);
  let file = await fs.readFile(fileName);

  let { content, data } = matter(file);
  const source = await serialize(content);
  const summary = await serialize(data.summary);
  const description = await serialize(data.description);

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
