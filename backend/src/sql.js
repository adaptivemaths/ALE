import { QueryFile } from "pg-promise";
import path from "path";

function sql(filename) {
  const sqlPath = path.join(__dirname, filename);
  return new QueryFile(sqlPath, { minify: true });
}


export const mailingListSQL = {
  addMail: sql("../sql/mailing_list/addMail.sql")
}