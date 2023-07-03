import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "code" | "text";
}

interface LocalApiError {
  code: string;
}

export const createCellssRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    };

    const markdownString: string = `# Directions to use(Click to edit)
Built interactive coding environment using React/Redux. In this, we can write Javascript, see it executed, and document it using markdown.

- Click any text cell to edit (including this)
- The code in each code editor is all joined together into one file. If defined a variable in editor-cell #1, refer in any other created or existing editor-cell to access it. Example editor-cell#1\`const a=1;\` use \`console.log(a)\` in another editor-cell.
- Use \`show()\` function to display any JSX/React component/Objects/arrays/primitive values in editor-cell. This function is built in this environment and can be used multiple times.
- Re-order or delete cells using the top right buttons in cells.
- Add new cells by hovering on the divider between each cell.

All of the changes get saved to the file opened JScanvas with. So if \`npx jscanvas @usonkar test.js\` is run, then all of the text and code written will be saved to \`test.js\` file.`;

    const codeCounterString = `import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Example = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
show(<Example />);
`;
    const codeString = `//Insertion Sorting
function insertionSort(arr, n) {
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}

function printArray(arr, n) {
  let i;
  for (i = 0; i < n; i++) document.write(arr[i] + ' ');
  document.write('<br>');
}

let arr = [12, 11, 13, 5, 6];
let n = arr.length;

insertionSort(arr, n);
printArray(arr, n);`;

    const initailCell: Cell[] = [
      { content: markdownString, id: "123abc", type: "text" },
      { content: codeCounterString, id: "123rty", type: "code" },
      { content: codeString, id: "123qwe", type: "code" },
    ];
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === "ENOENT") {
          await fs.writeFile(fullPath, JSON.stringify(initailCell), "utf-8");

          res.send(initailCell);
        }
      } else {
        throw err;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cell }: { cell: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cell), "utf-8");
    res.send({ status: "ok" });
  });

  return router;
};
