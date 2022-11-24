export const format = (text: string, ...args: Array<string>) =>
  args.reduce(
    (text, argument, index) => text.replace(`{${index}}`, argument),
    text
  );
