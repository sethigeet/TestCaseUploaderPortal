# Test Case Uploading Portal

This is a `fullstack application` that helps people to `test their code`.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of `node.js`.
- You have installed `yarn` - v1 (this project will not work with `npm`).
- You have a working installation of `postgres` and `redis` on your machine(you may use a docker instance if you do not want to install it on your machine).

## Installing

To install this project, follow these steps:

- Clone this repo (`git clone https://github.com/sethigeet/TestCaseUploaderPortal.git`)
- Change into the directory (`cd TestCaseUploaderPortal`)
- Install all the dependencies (`yarn install`)
- Change into the `packages/common` (`cd packages/common`) and then run `yarn build`
- Change into the `packages/controller` (`cd packages/controller`) and then run `yarn build`
- Create a link between your packages (`yarn install`)
- Create the necessay databases(one for development and one for testing) in `postgres`
- Set the database username, password and db-name in the `ormconfig.json`

| :exclamation: This is very important                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **If you are using `Windows`, change the `rm -rf` commands in the `scripts` of `package.json` of `packages/common` and `packages/controller` to `rmdir`** |

- Change into the `packages/server` (`cd packages/server`) and the run `yarn test`. If everything passes, you have properly installed this app on your machine!

## Developing

To develop on this project, follow these steps:

- Change into the `packages/common` (`cd packages/common`) and then run `yarn dev`
- Change into the `packages/controller` (`cd packages/controller`) and then run `yarn dev`
- Change into the `packages/server` (`cd packages/server`) and then run `yarn dev`
- Change into the `packages/web` (`cd packages/web`) and then run `yarn dev`

You are now ready to develop on this app. Whenever you make a change to the source code, the app will automatically restart!

## Build for production

To build this project, follow these steps:

- Change into the `packages/server` (`cd packages/server`) and then run `yarn build`
- Change into the `packages/web` (`cd packages/web`) and then run `yarn build`

You now have two Node.js apps which you can deploy as you want!
