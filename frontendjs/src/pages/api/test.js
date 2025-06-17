import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "public", "Assets/json/data.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const jsonData = JSON.parse(fileData);

  res.status(200).json(jsonData);
}
