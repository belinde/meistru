import { readJsonFile, writeJsonFile } from "./functions";
import { NoteNameStyle } from "./types";

type SettingsProperties = {
  noteStyle: NoteNameStyle;
  concertMode?: string;
};
const FIELDS: (keyof SettingsProperties)[] = ["noteStyle", "concertMode"];

export class Settings {
  private static fileName = "settings.json";
  private noteStyle: NoteNameStyle = "latin";
  private concertMode?: string;
  private subscribers: Set<() => void> = new Set();

  public subscribe(callback: () => void) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

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
    this.subscribers.forEach((callback) => callback());
  }

  getNoteStyle() {
    return this.noteStyle;
  }

  async setNoteStyle(value: NoteNameStyle) {
    this.noteStyle = value;
    await this.persist();
  }

  getConcertMode() {
    return this.concertMode;
  }

  async setConcertMode(value: string | undefined) {
    this.concertMode = value;
    await this.persist();
  }
}
