const fs = require("fs");
const path = require("path");

const srcDir = "./src";
const oldStyles = [
  "src/app/(auth)/_login.styles.ts",
  "src/app/(auth)/_signup.styles.ts",
  "src/app/(tabs)/_index.styles.ts",
  "src/app/(tabs)/_activity.styles.ts",
  "src/app/(tabs)/_profile.styles.ts",
  "src/app/delivery-request/_styles.ts",
  "src/app/chat/_styles.ts",
  "src/app/payment/_styles.ts",
  "src/app/ratings/_styles.ts",
];

oldStyles.forEach((oldP) => {
  if (!fs.existsSync(oldP)) return;
  const newP = oldP.replace("src/app/", "src/styles/").replace("/_", "/");
  fs.mkdirSync(path.dirname(newP), { recursive: true });
  fs.renameSync(oldP, newP);

  const baseName = path.basename(oldP, ".ts"); // e.g., _login.styles
  const newImportPath = "@/" + newP.replace("src/", "").replace(".ts", "");

  const walk = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (full.endsWith(".tsx") || full.endsWith(".ts")) {
        let text = fs.readFileSync(full, "utf8");
        text = text.replace(
          new RegExp("from ['|\\\"]\\./" + baseName + "['|\\\"]", "g"),
          'from \"' + newImportPath + '\"',
        );
        text = text.replace(
          new RegExp("from ['|\\\"]@/app/.*/" + baseName + "['|\\\"]", "g"),
          'from \"' + newImportPath + '\"',
        );
        fs.writeFileSync(full, text);
      }
    });
  };
  walk(srcDir);
});
console.log("Migration completed");
