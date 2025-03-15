import { container } from "tsyringe";
import { WinstonLogger } from "./WinstonLogger";
import { ILogger } from "./ILogger";

// Register Logger in the IoC container
container.register<ILogger>("ILogger", { useClass: WinstonLogger });

// Export the resolved Logger instance
export const Logger = container.resolve<ILogger>("ILogger");
