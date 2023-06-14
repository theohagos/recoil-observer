<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->

<div align="center">

# recoil-observer

Recoil Observer through Redux DevTools</br>
This version updated to support React 18 and Recoil 0.0.7

</div>

## Installation

```sh 
yarn add @theohagos/recoil-observer
```

or

```sh 
npm install @theohagos/recoil-observer
```

## Usage

```jsx
import App from './App.tsx';
import { RecoilRoot } from 'recoil';
import { RecoilObserver } from '@theohagos/recoil-observer';

<RecoilRoot>
    <RecoilObserver env="development" />
    <App />
</RecoilRoot>
```

## API

| props   | description                                                                          | default value       | type      |
|---------|--------------------------------------------------------------------------------------|---------------------|-----------|
| env     | react env value (only gets mounted if value is development) this is a requried field | development         | string    |
| exclude | List of recoil keys to exclude from Redux Devtool                                    | []                  | string[]? |
| name    | The name that will appear on Redux Devtool                                           | Recoil State Observer | string?   |
| maxAge  | Redux Devtool prop                                                                   | 100                 | number?   |
| trace   | Redux Devtool prop                                                                   | false               | boolean?  |


## Redux Devtool View
Open up redux devtools and observe state changes in redux devtools, replay recoil state as well as time-travel



![Screen Shot 2021-12-17 at 23 18 52](readme.png)
