const NOTEREF = [
  "0GA",
  "1A",
  "1AB",
  "1B",
  "1C",
  "1CD",
  "1D",
  "1DE",
  "1E",
  "1F",
  "1FG",
  "1G",
  "1GA",
  "2A",
  "2AB",
  "2B",
  "2C",
  "2CD",
  "2D",
  "2DE",
  "2E",
  "2F",
  "2FG",
  "2G",
  "2GA",
  "3A",
  "3AB",
  "3B",
  "3C",
  "3CD",
  "3D",
  "3DE",
  "3E",
  "3F",
  "3FG",
  "3G",
  "3GA",
  "4A",
  "4AB",
  "4B",
  "4C",
  "4CD",
  "4D",
  "4DE",
  "4E",
  "4F",
  "4FG",
  "4G",
  "4GA",
  "5A",
  "5AB",
  "5B",
  "5C",
  "5CD",
  "5D",
  "5DE",
  "5E",
  "5F",
  "5FG",
  "5G",
  "5GA",
  "6A",
  "6AB",
  "6B",
  "6C",
  "6CD",
  "6D",
  "6DE",
  "6E",
  "6F",
  "6FG",
  "6G",
  "6GA",
];

const { exec } = require("child_process");

const START = 16;
const END = 66;
const FROMVOL = 0;
const TOVOL = -20;

for (let n = START; n <= END; n++) {
  const FREQ = 440 * Math.pow(2, (n - 49) / 12);
  const VOL =
    Math.round(
      100 * (FROMVOL + ((TOVOL - FROMVOL) * (n - START)) / (END - START)),
      2
    ) / 100;
  console.log(`"${NOTEREF[n]}": ${FREQ}  --> ${VOL}`);
  exec(
    `sox -n ./assets/notes/${NOTEREF[n]}.mp3 synth 3 sin ${FREQ} trapezium ${FREQ} channels 1 vol ${VOL} dB`, // remix - rate 24000
    (err, stdout, stderr) => {
      console.log(NOTEREF[n], stdout);
      stderr && console.error(stderr);
      err && console.error(err);
    }
  );
}
