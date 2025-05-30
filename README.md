# @stable-canvas/comfyui-client

[![npm](https://img.shields.io/npm/v/@stable-canvas/comfyui-client)](https://www.npmjs.com/package/@stable-canvas/comfyui-client)
[![npm](https://img.shields.io/npm/dw/@stable-canvas/comfyui-client)](https://www.npmjs.com/package/@stable-canvas/comfyui-client)
[![GitHub Repo stars](https://img.shields.io/github/stars/StableCanvas/comfyui-client)](https://github.com/StableCanvas/comfyui-client)

Javascript api Client for [ComfyUI](https://github.com/comfyanonymous/ComfyUI) that supports both NodeJS and Browser environments.

This client provides comprehensive support for all available RESTful and WebSocket APIs, with built-in TypeScript typings for enhanced development experience. Additionally, it introduces a programmable workflow interface, making it easy to create and manage workflows in a human-readable format.

## Index

### Sub README

- [client](./packages/client/README.md): **This is the main readme which contains very detailed instructions and examples**
- [cli](./packages/cli/README.md)
- [cw-reader](./packages/cw-reader/readme.md)
- [transpiler](./packages/transpiler/README.md)

### Auto Docs

- [Rest API](https://stablecanvas.github.io/comfyui-client/classes/Client.html)
- [WebSocket API](https://stablecanvas.github.io/comfyui-client/classes/WsClient.html)
- [Workflow API](https://stablecanvas.github.io/comfyui-client/classes/Workflow.html)

## Features

- **Environment Compatibility**: Seamlessly functions in both NodeJS and Browser environments.
- **Comprehensive API Support**: Provides full support for all available RESTful and WebSocket APIs.
- **TypeScript Typings**: Comes with built-in TypeScript support for type safety and better development experience.
- **Programmable Workflows**: Introduces a human-readable and highly customizable workflow interface inspired by [this issue](https://github.com/comfyanonymous/ComfyUI/issues/612) and [this library](https://github.com/Chaoses-Ib/ComfyScript).
- **Ease of Use**: Both implementation and usage are designed to be intuitive and user-friendly.
- **Zero Dependencies**: This library is designed to minimize the introduction of external dependencies and is currently dependency-free.

## Packages

This library has been refactored from a single-package structure into a monorepo, now containing the following packages to support various development scenarios:

| Package                                                                                                                                                                                                 | Description                                                                                        | Location                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`@stable-canvas/comfyui-client`](https://www.npmjs.com/package/@stable-canvas/comfyui-client) <br> ![npm](https://img.shields.io/npm/v/@stable-canvas/comfyui-client)                                  | Core client library for interacting with ComfyUI via REST and WebSocket APIs.                      | [packages/client](https://github.com/StableCanvas/comfyui-client/tree/main/packages/client)         |
| [`@stable-canvas/comfyui-client-cli`](https://www.npmjs.com/package/@stable-canvas/comfyui-client-cli) <br> ![npm](https://img.shields.io/npm/v/@stable-canvas/comfyui-client-cli)                      | CLI tool that converts ComfyUI workflows into JavaScript code. Ideal for scripting and automation. | [packages/client-cli](https://github.com/StableCanvas/comfyui-client/tree/main/packages/client-cli) |
| [`@stable-canvas/cw-reader`](https://www.npmjs.com/package/@stable-canvas/cw-reader) <br> ![npm](https://img.shields.io/npm/v/@stable-canvas/cw-reader)                                                 | read workflow(comfyui) info from image/json                                                        | [packages/cw-reader](https://github.com/StableCanvas/comfyui-client/tree/main/packages/cw-reader)   |
| [`@stable-canvas/comfyui-client-transpiler`](https://www.npmjs.com/package/@stable-canvas/comfyui-client-transpiler) <br> ![npm](https://img.shields.io/npm/v/@stable-canvas/comfyui-client-transpiler) | Low-level transpiler used by the CLI. Contains AST parsing and code generation logic.              | [packages/transpiler](https://github.com/StableCanvas/comfyui-client/tree/main/packages/transpiler) |

Each package includes its own README for usage and development details.

## License

MIT
