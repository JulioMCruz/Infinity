import ansiColors from "ansi-colors";
import {startupTimeLocal, startupTimeUTC} from "@Utils/system";
import {createServer} from "@Presentation/Bootstrap/server";

process.env.TZ = "Europe/Madrid";

async function main() {
  console.log(
    ansiColors.grey(
      `Server initialization process started at Europe/Madrid: ( ${startupTimeLocal} ) to Utc: ( ${startupTimeUTC} )`,
    ),
  );
  try {
    const server = createServer();
    const port = process.env.PORT || 9000;
    server.listen(port, () => {
      console.log(ansiColors.green(`Server running at http://localhost:${port}`));
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
}

main().catch((error) => console.error("Error starting server", error));
