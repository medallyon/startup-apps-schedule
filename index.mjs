import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import { exec } from "child_process";
import { CronTime } from "cron";

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const APPS_PATH = join(__dirname, "apps");

function startsWithinTheNextSecond(schedule)
{
	const cronTime = new CronTime(schedule, "Europe/London");
	const now = +new Date();
	const nextDate = cronTime.sendAt();
	return nextDate <= now + 1000;
}

(async function()
{
	const appGroups = await fs.readdir(APPS_PATH);
	if (appGroups.length === 0)
		throw new Error("No apps found");

	for (const groupName of appGroups)
	{
		const groupPath = join(APPS_PATH, groupName);
		if (!(await fs.stat(groupPath)).isDirectory())
			continue;

		const schedule = (await fs.readFile(join(groupPath, "schedule.txt"), "utf8")).trim();

		if (!startsWithinTheNextSecond(schedule))
			continue;

		const appNames = (await fs.readdir(groupPath)).filter(name => name !== "schedule.txt");
		let failedApps = {};

		for (const appName of appNames)
		{
			exec(`start "" "${join(groupPath, appName)}"`, e => e && (failedApps[appName] = e));
		}

		if (Object.keys(failedApps).length > 0)
			console.error(`Failed to launch apps from group "${groupName}": ${failedApps}`);
	}
})();
