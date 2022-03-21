import React from 'react';
import {RecoilRoot} from 'recoil';
import {render} from '@testing-library/react';
import RecoilObserver from './RecoilObserver';

describe('<RecoilObserver />', () => {
  test('component renders correctly', () => {
    render(
      <RecoilRoot>
        <RecoilObserver />
      </RecoilRoot>
    );
  });
});
