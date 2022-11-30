# Development

## Getting started

### Install dependencies

```sh
npm install
```

### Compile language files

```sh
npm run i18n:compile
```

### Generate native projects

```sh
npm run prebuild:clean
```

### Run app in simulator

```sh
npm run ios
npm run android
```

Next time you want to work on the app you can just run:

```sh
npm start
```

Which will start the development server and provide you with a list of shortcut keys you can press to open the app in iOS simulator (press `i`) or Android emulator (press `a`).

This is a faster way to open the app if you don't need to build and run the app from scratch (eg. when you have made some native code related changes).
