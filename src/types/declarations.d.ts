declare module '*.jpg' {
  const value: ImageSourcePropType | undefined;
  export default value;
}

declare module '*.png' {
  const value: ImageSourcePropType | undefined;
  export default value;
}

declare module '*.ttf' {
  const src: FontSource;
  export default src;
}
