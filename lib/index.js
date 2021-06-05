import fsSync from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const fs = fsSync.promises;

export const readMDX = (folder) => async (id) => {
  let fileName = path.join(folder, `${id}.mdx`);
  let file = await fs.readFile(fileName);
  return matter(file);
};

export async function serializeBaseData({ data, content }) {
  let [source, summary, description] = await Promise.all([
    serialize(content),
    serialize(data.summary),
    serialize(data.description),
  ]);

  const componentNames = [/<Lottie/.test(content) ? "Lottie" : null].filter(
    Boolean
  );
  const title = data.title;

  return {
    source,
    summary,
    description,
    componentNames,
    title,
  };
}
