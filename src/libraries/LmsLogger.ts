import {
    Logger,
    ConsoleListener,
    LogLevel,
} from "sp-pnp-js";

export default class LmsLogger {
    public writeInfo(message: string): void {
        Logger.write(message, LogLevel.Info);
    }

    public writeWarning(message: string): void {
        Logger.write(message, LogLevel.Warning);
    }

    public writeError(message: string): void {
        Logger.write(message, LogLevel.Error);
    }
}

// subscribe a listener
// Logger.subscribe(new ConsoleListener());

// set the active log level
// Logger.activeLogLevel = LogLevel.Info;