# Schedule your startup apps

We all have apps & programs that launch on Startup. Some of us have apps that we'd rather not automatically start during certain schedules, for example Slack, which should only startup during work hours, usually Mon-Fri. This is where this Node.js application comes in.

## Usage

### Pre-requisites

1. Download the [latest release](https://github.com/medallyon/startup-apps-schedule/releases) or [clone this repository](https://github.com/medallyon/startup-apps-schedule/clone).

### Create a new schedule

1. Create a new schedule by creating a folder in the `/apps` directory. Give this folder a descriptive name.
2. Create a new text file inside this folder named `schedule.txt` and add your schedule to the first line, then save the file.
   - Note: The schedule is in the form of a cron schedule. When your machine starts and this app runs, it checks whether the current time falls within the schedule.
   - Note: If the time of startup falls within the time of the cron schedule, all apps/executables/shortcuts in this folder are started automatically.
  
For examples, look no further than the existing [`/apps`](https://github.com/medallyon/startup-apps-schedule/tree/master/apps) directory.

### Add the scheduler to automatic startup

1. (Windows) Press `WIN`+`R` to summon the "Run" dialog. Enter `shell:startup`. This opens up the startup directory for Windows.
2. Create a shortcut to the `startup.bat` file (for Windows users) found in the root of this project and copy it to the startup directory.

For Linux/MacOS users, just create a startup entry to run `npm start` for this project.

## Bugs & Improvements

If you find any issues or would like to suggest an improvement, please [open a new issue](https://github.com/medallyon/startup-apps-schedule/issues/new). In particular, I'm looking for inconsistencies on Linux / MacOS machines as I've only tested this on Windows.

## Contributing

If you'd like to contribute, follow the standard open-source contributing process:

1. [Create a fork](https://github.com/medallyon/startup-apps-schedule/fork) of this repository.
2. Make any changes you'd like.
3. If applicable, test your changes to make sure it works.
4. [Create a new pull request](https://github.com/medallyon/startup-apps-schedule/compare) and await a review.

Thank you!
