import { ExitStatus } from "@src/app/types/status";
import { SetupServer } from "@src/server";

export class AppExitTreatments {

    public static init (): void {
        process.on('unhandledRejection', (reason, promise) => {
            console.error(`App exiting due to an unhandled promise: (${promise}) and reason: (${reason})`);
            throw reason;
        });
        
        process.on('uncaughtException', error => {
            console.error(`App exiting due to an uncaught exception: (${error})`);
            process.exit(ExitStatus.Failure);
        });
    }

    public async configCloseApp(signals: NodeJS.Signals[], close: SetupServer['close']): Promise<void> {
        signals.map( sig => process.on(sig, async () => {
			try {
				await close();
				console.info(`App exited with success`);
				process.exit(ExitStatus.Success);
			} catch (error) {
				console.error(`App exited with error: ${error}`);
				process.exit(ExitStatus.Failure);
			}
		}));
    } 
    
}