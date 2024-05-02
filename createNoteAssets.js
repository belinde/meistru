const NOTEREF = [
  "0GA",
  "0A",
  "0AB",
  "0B",
  "1C",
  "1CD",
  "1D",
  "1DE",
  "1E",
  "1F",
  "1FG",
  "1G",
  "1GA",
  "1A",
  "1AB",
  "1B",
  "2C",
  "2CD",
  "2D",
  "2DE",
  "2E",
  "2F",
  "2FG",
  "2G",
  "2GA",
  "2A",
  "2AB",
  "2B",
  "3C",
  "3CD",
  "3D",
  "3DE",
  "3E",
  "3F",
  "3FG",
  "3G",
  "3GA",
  "3A",
  "3AB",
  "3B",
  "4C",
  "4CD",
  "4D",
  "4DE",
  "4E",
  "4F",
  "4FG",
  "4G",
  "4GA",
  "4A",
  "4AB",
  "4B",
  "5C",
  "5CD",
  "5D",
  "5DE",
  "5E",
  "5F",
  "5FG",
  "5G",
  "5GA",
  "5A",
  "5AB",
  "5B",
  "6C",
  "6CD",
  "6D",
  "6DE",
  "6E",
  "6F",
  "6FG",
  "6G",
  "6GA",
  "6A",
  "6AB",
  "6B",
];

const { exec } = require("child_process");

const launcher = (n, vol, folder, synth) => {
  const file = `./assets/notes/${folder}/${NOTEREF[n]}.mp3`;
  exec(
    `sox -n ${file} synth ${synth} channels 1 vol ${vol} dB`,
    (err, stdout, stderr) => {
      stdout && console.log(NOTEREF[n], stdout);
      stderr && console.error(NOTEREF[n], stderr);
      err && console.error(NOTEREF[n], err);
    }
  );
};
const START = 3;
const END = 66;
const FROMVOL = 0;
const TOVOL = -20;

for (let n = START; n <= END; n++) {
  const Hz = 440 * Math.pow(2, (n - 49) / 12);
  const vol =
    Math.round(
      100 * (FROMVOL + ((TOVOL - FROMVOL) * (n - START)) / (END - START)),
      2
    ) / 100;

  launcher(n, vol, "pluck", `2 pluck ${Hz}`);
  launcher(n, vol, "synth", `2 sin ${Hz} trapezium ${Hz}`);
}
