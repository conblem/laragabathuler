import path from "path";

import { readMDX, serializeBaseData } from "./index";

const parentFolder = path.join(process.cwd(), "content");
const readFile = readMDX(parentFolder);

export async function getAbout() {
  let { data, content } = await readFile("about");
  return await serializeBaseData({ data, content });
}
