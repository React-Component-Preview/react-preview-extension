# React Component Preview

**VScode extension for React Developers!**

This extension enables developers to preview react component while writing their code.

You can add custom props from the control panel and preview your component.

![preview](https://user-images.githubusercontent.com/76524890/149337805-3195effe-7052-4822-89fa-6b39aad9c630.gif)

## How to start
1. Open [Visual Studio Code](https://code.visualstudio.com/)
2. Press ` Ctrl + P `/` ⌘ + P ` to quick start
3. Start editing your react component from text editor


OR

1. Open [Visual Studio Code](https://code.visualstudio.com/)
2. Press ` Ctrl + Shift + P `/` ⌘ + Shift + P ` and type "React Component Preview: preview start"
3. Start editing your react component from text editor

## Requirements

-  `previewConfig.json` file will be automatically added in your workspace. We strongly recommend you not to modify this file unless its necessary.

-  Current Extension features only supports `.js`, `.jsx` files

-  component should be exported with `export default <Component>`

```js
const Button = () => {
  return (
    <button>
      ClickMe
    </button>
  );
};

// export default is a must
export default Button;
```

## Future Updates

  - [ ] .tsx support
  - [ ] error console

## Contributing
Something missing? Found a bug? - Create a pull request or an issue. [Github](https://github.com/React-Component-Preview/react-preview-extension/issues)

## License
This software is released under MIT License

**Enjoy!**
