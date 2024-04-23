import { FILENAME_SETTINGS } from "./constants";
import { readJsonFile, writeJsonFile } from "./functions";
import { InitialNote, NoteNameStyle } from "./types";

export type StandardSection = Pick<InitialNote, "section" | "subsection">;

type SettingsProperties = {
  noteStyle: NoteNameStyle;
  concertMode?: string;
  standardSections: StandardSection[];
};

export const isSettingsProperties = (item: any): item is SettingsProperties => {
  return (
    typeof item === "object" &&
    item !== null &&
    "noteStyle" in item &&
    "standardSections" in item
  );
};

const FIELDS: (keyof SettingsProperties)[] = [
  "noteStyle",
  "concertMode",
  "standardSections",
];

export class Settings {
  private noteStyle: NoteNameStyle = "latin";
  private concertMode?: string;
  private subscribers: Set<() => void> = new Set();
  private standardSections: StandardSection[] = [];

  public subscribe(callback: () => void) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  public async load(): Promise<void> {
    const content = await readJsonFile<SettingsProperties>(
      FILENAME_SETTINGS,
      FIELDS.reduce((acc, field) => {
        acc[field] = this[field] as any;
        return acc;
      }, {} as SettingsProperties)
    );

    if (typeof content === "object" && content !== null) {
      FIELDS.forEach((field) => {
        if (field in content) {
          this[field] = content[field] as any;
        }
      });
    }
  }

  private async persist() {
    await writeJsonFile(FILENAME_SETTINGS, this);
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

  getStandardSections() {
    return this.standardSections;
  }

  async setStandardSections(value: StandardSection[]) {
    this.standardSections = value;
    await this.persist();
  }
}
