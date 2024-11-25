# Secrets & Environment Variables

We are using EAS Environment Variables to store secrets and environment variables. You can find more information in the [EAS documentation](https://docs.expo.dev/eas/environment-variables/).

## Getting environment variables from EAS

You can retrieve the environment variables from EAS by running the following command to use for local development:

```bash
eas env:pull
```

It will create a `.env.local` file in the root of the project with the environment variables. You can then use them in the project.

> Note: It will not be able to pull the ones with the visibility set to "secret" for security reasons. These should be available in the password vault of the project.

## Adding environment variables to EAS

### Via CLI

You can add environment variables to EAS via the CLI by running the following command:

```bash
eas env:push
```

It will ask you for which environment you want to push to variables.

> Note: It will take **all** the variables from the `.env` file you provide.

### Via Web UI

You can manually add environment variables to EAS in _Configuration_ -> _Environment variables_. You can add them one by one or in bulk by uploading a `.env` file.
