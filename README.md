# 💻 React Component Preview 💻

[![](https://vsmarketplacebadge.apphb.com/version-short/SeoJunYoo.react-component-preview.svg)](https://marketplace.visualstudio.com/items?itemName=SeoJunYoo.react-component-preview)
[![](https://vsmarketplacebadge.apphb.com/installs-short/SeoJunYoo.react-component-preview.svg)](https://marketplace.visualstudio.com/items?itemName=SeoJunYoo.react-component-preview)
[![](https://vsmarketplacebadge.apphb.com/rating-short/SeoJunYoo.react-component-preview.svg)](https://marketplace.visualstudio.com/items?itemName=SeoJunYoo.react-component-preview)
[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)

**VScode extension for React Developers!**

This extension enables developers to live preview react components while developing react projects.

You can add custom props from the control panel and preview your updated components

![preview](https://user-images.githubusercontent.com/76524890/149563221-3f2663f3-832c-4443-813d-eab2d1c65329.gif)

## How to start
1. Open [Visual Studio Code](https://code.visualstudio.com/)
2. From your working editor Press ` Ctrl + P `/` ⌘ + P ` to quick start
3. Start editing your react component from the text editor and add props from the control panel

***OR***

1. Open [Visual Studio Code](https://code.visualstudio.com/)
2. From your working editor Press ` Ctrl + Shift + P `/` ⌘ + Shift + P ` to open command Palette and type ***"React Component Preview: preview start"***
3. Start editing your react component from the text editor and add props from the control panel

## Requirements

-  `previewConfig.json` file will be automatically added to your workspace. We strongly recommend you not to modify this file unless it is necessary.

-  Current Extension features only supports `.js`, `.jsx` files

-  Current Extension only works on Mac OS

-  component should be exported with `export default <Component>`

```js
const Button = () => {
  return (
    <button>
      ClickMe
    </button>
  );
};

// export default
export default Button;
```

***OR***

```js
// export default
export default const Button = () => {
  return (
    <button>
      ClickMe
    </button>
  );
};
```

## Future Updates

  - `.tsx` support
  - Preview error console

## Contributing
Something missing? Found a bug? - Create a pull request or an issue. [Github](https://github.com/React-Component-Preview/react-preview-extension/issues)

## License
This software is released under [MIT](https://github.com/React-Component-Preview/react-preview-extension/blob/master/LICENSE.txt) License

**Enjoy! 😁**
