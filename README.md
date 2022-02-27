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

Recoil Observer through Redux DevTools

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
    <RecoilObserver />
    <App />
</RecoilRoot>
```

Open up redux devtools and observe state changes in redux devtools, replay recoil state as well as time-travel



![Screen Shot 2021-12-17 at 23 18 52](https://user-images.githubusercontent.com/3135968/146609246-5969debb-a85e-48a6-abb9-a99eb01a66e3.png)
