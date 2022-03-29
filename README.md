## Dependencies
* Node.js (^16.x.x)
* MongoDB (^5.x.x) - might work with ~4.4.x but this hasn't been tested

## Installation
You can install all project dependencies by running
```bash
npm install
```
## Configuration

### Google OAuth 2.0
This project uses OAuth 2.0 with Google as provider for user authentication. For this you work you must first [set up credentials](https://support.google.com/cloud/answer/6158849?hl=en), with the following configuration:
* Application type: `Web Application`
* Authorized JavaScript origins: `<full application URL>`
* Authorized redirect URIs: `<full application URL>/api/auth/callback/google`

The first time you set up OAuth 2.0 credentials you will also have to set up the consent screen. For the app to fully work, you must include the `userinfo.email`, `userinfo.profile` and `openid` scopes when doing so.

## Contributing

### Devcontainer
The project includes a [devcontainer](https://code.visualstudio.com/docs/remote/create-dev-container) configuration which contains all dependencies. To use this you need to install Docker (either CLI or [Docker Desktop](https://www.docker.com/products/docker-desktop/)), and the [remote development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) after which you can simply select "Clone Repository in Container Volume..." from the Remote Explorer tab.

### Configuration
The project comes with a `.env.development` file which contains defaults that should be sufficient for most development needs. If you need to add or change values, it's best to do so in a new `.env.development.local` file which will overwrite the defaults. This way you don't accidentally include the updated configuration in a git commit.

### Setting up OAuth 2.0
The application includes a simple credentials provider when `NODE_ENV` is set to `production`, which can be used for most front-end and some back-end development needs. To set up an environment more similar to what is used in production, OAuth 2.0 credentials has to be set up. To do this, follow the [section on setting up Google OAuth 2.0](#google-oauth-20) and use `http://localhost:3000` as the application URL.
