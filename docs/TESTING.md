# _UNDER CONSTRUCTION_

# Testing

We are using [Maestro](https://maestro.mobile.dev/) for testing. Maestro is a tool for running tests on real devices.

## Prerequisites

You need to install Maestro CLI following the instructions [here](https://maestro.mobile.dev/getting-started/installing-maestro).

## Open the Maestro studio

Run `maestro studio` in the terminal. This will open the Maestro studio in your browser. You can use the studio to write your tests in a more interactive and visual way.

## Writing tests

You can write your tests in the Maestro studio or in a YAML file. See the [Maestro documentation](https://maestro.mobile.dev/api-reference/commands) for more info on the commands you can use.

> Note 1: Some components do not support testID as a prop. In this case you can use the label to identify it. For example, for the Logout test, an Alert element does not support testID on its buttons, so we use the label 'I am sure' to identify it. Try to avoid this as much as possible as if the label changes, the test will fail.

> Note 2: If your screen has two elements with the same id or label you are using as a selector, it will fail. Try to use a more specific selector or make sure your labels are unique.

## Run tests

You can run tests in the terminal with the following command:

```shell
maestro test ./tests/YOUR_TEST_FILE.yml
```

You can also run the entire test suite with the following command:

```shell
maestro test ./tests/
```

Make sure to properly the `config.yml` file, which is where we define the suite of tests to run.
