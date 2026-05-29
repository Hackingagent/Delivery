const fs = require("fs");

const replaceInFile = (file, search, replace) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    content = content.replace(search, replace);
    fs.writeFileSync(file, content);
  }
};

const components = [
  "src/app/(auth)/login.tsx",
  "src/app/(auth)/signup.tsx",
  "src/app/delivery-request/index.tsx",
  "src/app/chat/[id].tsx",
  "src/app/ratings/[id].tsx",
];

components.forEach((f) => {
  replaceInFile(
    f,
    /behavior=\{Platform\.OS === "ios" \? "position" : undefined\}/g,
    'behavior={Platform.OS === "ios" ? "padding" : undefined}',
  );
  replaceInFile(
    f,
    /keyboardVerticalOffset=\{Platform\.OS === "ios" \? 40 : 0\}/g,
    "",
  );
});

replaceInFile(
  "src/styles/(auth)/login.styles.ts",
  /justifyContent: "center",/g,
  "paddingTop: 100,",
);
replaceInFile(
  "src/styles/(auth)/signup.styles.ts",
  /justifyContent: "center",/g,
  "paddingTop: 60,",
);
replaceInFile(
  "src/components/Input.styles.ts",
  /\.\.\.THEME\.shadows\.small,/g,
  "// removed to prevent native view recreation",
);

console.log("Fixes applied perfectly!");
