import { Request, Response } from "express";
import xlsx from "xlsx";
import multiparty from "multiparty";
import { client } from "../server";

export async function renderHome(req: Request, res: Response) {
  const contents = `<html>
  <body>
  <form action="/fetch" method="POST" enctype="multipart/form-data">
  <input type="file" name="xlsx" />
  <input type="submit" />
  </form>
</body>
</html>`;

  return res.send(contents);
}

export async function fetchExcel(req: Request, res: Response) {
  const resData = {} as any;

  const form = new multiparty.Form({
    autoFiles: true,
  });

  form.on("file", (name: any, file: any) => {
    const workbook = xlsx.readFile(file.path);
    const sheetnames = Object.keys(workbook.Sheets);

    let i = sheetnames.length;

    while (i--) {
      const sheetname = sheetnames[i];
      resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
    }
  });

  form.on("close", async () => {
    const data = resData.data.map((boss: any) => {
      return { ...boss, gentime: parseInt(boss.gentime) };
    });
    try {
      await client.boss.deleteMany();
      await client.boss.createMany({ data });
      return res.send("데이터 세팅 완료");
    } catch (e) {
      return res.json(e);
    }
  });

  form.parse(req);
}
