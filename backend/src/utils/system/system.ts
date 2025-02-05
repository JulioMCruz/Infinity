import { dayjsInstance } from "@Utils/times";

const timeZone = "Europe/Madrid";
const startupTimeLocal = dayjsInstance().tz(timeZone).format("YYYY-MM-DDTHH:mm:ssZ");
const startupTimeUTC = dayjsInstance().utc().format();
const startupTimeTimestamp = dayjsInstance().utc().unix();

export {startupTimeLocal, startupTimeUTC, startupTimeTimestamp};
