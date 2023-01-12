import { dirname, join } from "path";
import { fileURLToPath } from 'url';
import { promises as fs } from "fs";
import { spawn } from "child_process";
import { cwd } from "process";

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const APPS_PATH = join(__dirname, "apps");

(async function()
{
	const day = (new Date()).getDay();
	if (day < 1 || day > 5)
		throw new Error("Not a weekday");
	
	const apps = await fs.readdir(APPS_PATH);
	if (apps.length === 0)
		throw new Error("No apps to launch");
	
	for (const appName of apps)
	{
		console.log(join(APPS_PATH, appName));
		spawn(join(APPS_PATH, appName), [], {
			cwd: cwd(),
			detached: true,
			shell: true,
			stdio: "ignore"
		}).unref();
	}
})();
