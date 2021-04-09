# Contributing

## Introduction

This is a Discord Bot created for TRPG.  
I will omit the method of creating a bot with discord.js.

### Permissions

You need to grant the following permissions:
- View Channel
- Send Messages
- **Embed Links**

You can also use:  
https://discordapp.com/oauth2/authorize?client_id= **your client_id** &scope=bot&permissions=19456

## Configuration

Set environment variables or create an .env file.
This app is using the [dotenv](https://github.com/motdotla/dotenv) library.

| Variable           | Default | Description |
| ------------------ | ------- | ----------- |
| UGD_DEBUG          | 'off'   | **'on', 'off'**<br>Debug mode or not. |
| UGD_DISCORD_TOKEN  | -       | **REQUIRED**<br>Discord bot Token. |
| UGD_COMMAND_PREFIX | '/ugd'  | **Any string.**<br>Prefix for commands sent from Discord. |
| UGD_LOG_LEVEL      | 'error' | **'silly', 'trace', 'debug', 'info', 'warn', 'error', 'fatal'**<br>Please see [tslog](https://tslog.js.org/#/) Logging levels. |

For example:
```dotenv
UGD_DEBUG=on
UGD_DISCORD_TOKEN=<token>
UGD_COMMAND_PREFIX=/ugddev
UGD_LOG_LEVEL=silly
```

## Quick Start

Install dependencies:
```shell
$ npm install
```

Start the bot:
```shell
$ npm run debug
```

Commits must pass both ESLint/Mocha tests on your pull request.
```shell
$ npm run lint
$ npm run test
$ npm run coverage
$ npm run e2e
```

See package.json for other commands.
