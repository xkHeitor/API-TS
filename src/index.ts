import { SetupServer } from "./server";
import { ExitStatus } from "./app/types/status";
import { AppExitTreatments } from "./app/util/app-exit-treatments";
import config from "config";

const exitSignals: NodeJS.Signals[] = [ "SIGINT", "SIGTERM", 'SIGQUIT' ];

(async (): Promise<void> => {
    try {
        const appTreatments = new AppExitTreatments();
        const server = new SetupServer(config.get('App.port'));
        await server.init();
        server.start();
        appTreatments.configCloseApp(exitSignals, server.close);
    } catch (error) {
        console.error(`App exited with error: (${error})`);
        process.exit(ExitStatus.Failure);
    }
})();