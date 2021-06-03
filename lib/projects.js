import fs from "fs";
import path from "path";

const projectsFolder = path.join(process.cwd(), "content/projects");

export function getAllProjectIds() {
  const fileNames = fs.readdirSync(projectsFolder);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ""),
      },
    };
  });
}
