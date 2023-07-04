# js-scribble

js-scribble is an interactive browser-based coding environment that allows you to write and execute JavaScript code in a notebook-like interface. It is similar to Jupyter Notebook but specifically designed for JavaScript programming. The environment utilizes React and Redux to provide a seamless and enhanced coding experience.

## Features

- **Code Execution**: Write JavaScript code in cells and execute them directly in the browser. The code is executed in real-time, and the results are displayed within the notebook.
- **Custom show() Function**: Use `show()` function to display any JSX/React component/Objects/arrays/primitive values in editor-cell. This function is built in this environment and can be used multiple times.
- **Same code flow in multiple cells**:The code in each code editor is all joined together into one file. If defined a variable in editor-cell #1, refer in any other created or existing editor-cell to access it. Example editor-cell#1`const a=1;` use `console.log(a)` in another editor-cell.
- **Multiple Cells**: Create multiple cells to organize and separate your code into logical sections. Each cell can be edited independently and executed individually.
- **Rich Text Editor**: Format your code using a rich text editor with syntax highlighting and code indentation for better readability.
- **Autocomplete and Suggestions**: The coding environment provides autocomplete suggestions for JavaScript functions, methods, and variables, making it easier and faster to write code.
- **Persistent State**: Store and access variables and data across different cells. The state is preserved even when you execute cells out of order.
- **Import Libraries**: Import external JavaScript libraries or modules and use them within your code. The environment handles the dependencies and allows you to seamlessly integrate external functionality.
- **Markdown Support**: Embed markdown cells to document your code, write explanations, or add comments. Markdown cells can contain formatted text, images, links, and other markdown elements.
- **Error Handling**: Catch and display runtime errors and exceptions, helping you identify and debug issues in your code more effectively.
- **Create, Delete, Auto-Saving Cell, Reorder**: Re-order or delete cells using the top right buttons in cells.Add new cells by hovering on the divider between each cell.File gets saved in the folder where command is executed to run the environment.

## Getting Started

To get started with the interactive browser-based coding environment, follow these steps:

1. Run command `npx js-scribble @usonkar` in your terminal
2. No-need Install the necessary dependencies by running `npm install` or `yarn install` anywhere in your projects.
3. Open your web browser and navigate to `http://localhost:4005` (or a different port if specified).
4. Begin coding and exploring the features of the environment!

## Usage

We have the starter-running docs and sample code at `http://localhost:4005` whenn command `npx js-scribble @usonkar` is run on terminal.

- Default Command : Creates a run-time environment at `http://localhost:4005` and saves `notebook.js` file in the local directory where command is executed. This file will be automatically fetched with changes if command executed again.
  `npx js-scribble @usonkar`
- Optional Command (port): We can provide port number in case there is a traffic on default port `4005` using `--port [portnumber] or -p [portnumber] or --port=[portnumber]`.
  `npx js-scribble @usonkar --port 3000`
- Optional Commnad (filename): We can provide another file name and it creates the file `test.js` in the directory.It can be fetched if same file name used again while executing in the terminal.
  `npx js-scribble @usonkar test.js --port 3000`

## Dependencies

The interactive browser-based coding environment relies on the following technologies:

- React: JavaScript library for building user interfaces.
- Redux: State management library for JavaScript applications.
- js-scribble/local-api: Dependency package.
- js-scribble/local-client: Dependency package
  No need to install these dependencies as they are inter-linked.

## Contributing

Contributions to the project are welcome! If you have any ideas, bug fixes, or enhancements, feel free to submit a pull request.

## License

This project is licensed under the [ISC License](https://www.npmjs.com/package/js-scribble?activeTab=readme). Feel free to modify and distribute it as per the terms of the license.
