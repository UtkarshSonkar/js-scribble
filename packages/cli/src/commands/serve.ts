import path from "path";
import { Command } from "commander";
import { serve } from "@js-scribble/local-api";

interface LocalApiError {
  code: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("@usonkar [filename]")
  .description("Open a file for editing")
  .option("-p,--port <number>", "port to run application", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    };

    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );

      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port}`
      );
    } catch (err: any) {
      if (isLocalApiError(err)) {
        if (err.code === "EADDRINUSE") {
          console.error("Port is in use. Try running on a different port.");
        }
      } else if (err instanceof Error) {
        console.log("Heres the problem", err.message);
      }
      process.exit(1);
    }
  });
