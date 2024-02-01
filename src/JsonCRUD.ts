import { readJsonFile, writeJsonFile } from "./functions";

export class JsonCRUD<ObjType, KeyName extends string & keyof ObjType> {
  private data: ObjType[] = [];

  constructor(
    private fileName: string,
    private keyName: KeyName,
    private sorter?: (a: ObjType, b: ObjType) => number,
    private onDelete?: (item: ObjType) => Promise<void>
  ) {}

  public async load(): Promise<ObjType[]> {
    const content = await readJsonFile<ObjType[]>(this.fileName, []);
    if (Array.isArray(content)) {
      this.data = content;
    }
    return this.data;
  }

  private async persist() {
    if (this.sorter) {
      this.data.sort(this.sorter);
    }
    await writeJsonFile(this.fileName, this.data);
  }

  private findIndex(key: ObjType[KeyName]): number {
    return this.data.findIndex((i) => i[this.keyName] === key);
  }

  public list(): ObjType[] {
    return this.data;
  }

  public fetch(key: ObjType[KeyName]): ObjType | undefined {
    return this.data.find((i) => i[this.keyName] === key);
  }

  public async add(item: ObjType) {
    this.data.push(item);
    await this.persist();
  }

  public async update(item: ObjType) {
    const index = this.findIndex(item[this.keyName]);
    if (index !== -1) {
      this.data[index] = item;
      await this.persist();
    }
  }

  public async delete(key: ObjType[KeyName]) {
    const index = this.findIndex(key);
    if (index !== -1) {
      this.data.splice(index, 1);
      await this.persist();
      if (this.onDelete) {
        await this.onDelete(this.data[index]);
      }
    }
  }
}
