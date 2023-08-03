/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import sinon from 'sinon';
import Button from './index.ts';

// eslint-disable-next-line no-undef
describe('Button component', () => {
  // eslint-disable-next-line no-undef
  it('Should be clickable', () => {
    const callback = sinon.stub();
    const button = new Button('123', { click: callback });

    // @ts-ignore
    // eslint-disable-next-line no-undef
    const element = button._element as HTMLElement;

    element.click();

    expect(callback.calledOnce).to.eq(true);
  });
});
