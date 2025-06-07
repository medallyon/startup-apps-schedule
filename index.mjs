import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import { exec } from "child_process";
import { CronTime } from "cron";

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const APPS_PATH = join(__dirname, "apps");

function log(message)
{
	if (message !== "")
		console.log(message);

	const logFilePath = join(__dirname, "app-launcher.log");
	const timestamp = new Date().toISOString();
	const logMessage = `${timestamp} - ${message}\n`;

	fs.appendFile(logFilePath, logMessage)
		.catch(err => console.error("Failed to write to log file:", err));
}

function startsWithinTheNextSecond(schedule)
{
	const cronTime = new CronTime(schedule, "Europe/London");
	const now = +new Date();
	const nextDate = cronTime.sendAt();
	return nextDate <= now + 1000;
}

(async function()
{
	log("");

	let dirs = await fs.readdir(APPS_PATH);
	const appGroups = [];

	// Filter to only include directories
	for (const dir of dirs)
	{
		const groupPath = join(APPS_PATH, dir);
		if ((await fs.stat(groupPath)).isDirectory()) {
			appGroups.push(dir);
		}
	}

	if (appGroups.length === 0)
	{
		log("No app groups found.");
		return;
	}
	log(`Found app groups: '${appGroups.join("', '")}'`);

	for (const groupName of appGroups)
	{
		log(`\nProcessing app group: ${groupName}`);

		const groupPath = join(APPS_PATH, groupName);
		const schedule = (await fs.readFile(join(groupPath, "schedule.txt"), "utf8")).trim();

		if (!startsWithinTheNextSecond(schedule))
		{
			log(`Skipping "${groupName}" as the schedule does not match ('${schedule}').`);
			continue;
		}

		const appNames = (await fs.readdir(groupPath)).filter(name => name !== "schedule.txt");
		let failedApps = {};

		for (const appName of appNames)
		{
			log(`Launching [${groupName}] ${appName}`);
			exec(`start "" "${join(groupPath, appName)}"`, e => e && (failedApps[appName] = e));
		}

		if (Object.keys(failedApps).length > 0)
		{
			log(`Failed to launch some apps in group "${groupName}": ${JSON.stringify(failedApps)}`);
			console.error(`Failed to launch apps from group "${groupName}": ${failedApps}`);
		}
	}
})();
