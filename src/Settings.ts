import { readJsonFile, writeJsonFile } from "./functions";
import { NoteNameStyle } from "./types";

type SettingsProperties = {
  noteStyle: NoteNameStyle;
  concertoMode?: string;
};
const FIELDS: (keyof SettingsProperties)[] = ["noteStyle", "concertoMode"];

export class Settings {
  private static fileName = "settings.json";
  private noteStyle: NoteNameStyle = "latin";
  private concertoMode?: string;

  public async load(): Promise<void> {
    const content = await readJsonFile<SettingsProperties>(
      Settings.fileName,
      FIELDS.reduce((acc, field) => {
        acc[field] = this[field] as any;
        return acc;
      }, {} as SettingsProperties)
    );

    if (typeof content === "object" && "noteStyle" in content) {
      FIELDS.forEach((field) => {
        if (field in content) {
          this[field] = content[field] as any;
        }
      });
    }
  }

  private async persist() {
    await writeJsonFile(Settings.fileName, this);
  }

  getNoteStyle() {
    return this.noteStyle;
  }

  async setNoteStyle(value: NoteNameStyle) {
    this.noteStyle = value;
    await this.persist();
  }

  getConcertoMode() {
    return this.concertoMode;
  }

  async setConcertoMode(value: string | undefined) {
    this.concertoMode = value;
    await this.persist();
  }
}
