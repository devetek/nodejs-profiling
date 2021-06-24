### Background

Working with large scale nodeJS application felt paint full, especially when facing memory leak, that is very hard to debuging and solved it. Currently so many manual action just to activate profiling mode in our environment.

Finally, before continue, big thanks to [v8-inspector-api](https://github.com/wallet77/v8-inspector-api) to provide better inspector API. And inspiring article from [voodoo-engineering](https://medium.com/voodoo-engineering/node-js-and-cpu-profiling-on-production-in-real-time-without-downtime-d6e62af173e2).  This is great to have remote config to activate and deactivate profiling mode.

### Idea

Injecting web socket client to the service which is listen to the websocket master. Then, we will use master to broadcasting message to all connected client. Then, based on the message, client will validating it and make sure if the message matching with registered item list, e.g start. profiling, stop profiling. Sounds great to have this!.

### Development

Before we start, please install dependencies with yarn command. If you don't have yarn in your local, you can still using npm start this project.

Commands:
- `yarn start` or `npm run start`
- `yarn ws` or `npm run ws`
