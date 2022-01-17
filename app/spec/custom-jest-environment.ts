"use strict";

const BrowserEnvironment = require("jest-environment-jsdom");

class MyEnvironment extends BrowserEnvironment {
  constructor(config) {
    super(
      Object.assign({}, config, {
        globals: Object.assign({}, config.globals, {
          Uint32Array: Uint32Array,
          Uint8Array: Uint8Array,
          ArrayBuffer: ArrayBuffer,
        }),
      }),
    );
  }

  async setup() {}

  async teardown() {}
}

module.exports = MyEnvironment;
