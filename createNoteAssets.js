import { exec } from "child_process";
import { FREQUENCIES } from "./src/constants";

for (let key in FREQUENCIES) {
  exec(
    `sox -n ./assets/notes/${key}.mp3 synth 2 trapezium ${FREQUENCIES[key]} gain -20`
  );
}
