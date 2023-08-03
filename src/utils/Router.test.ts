import { expect } from 'chai';
import Router from './Router.ts';
import Index from '../layout/index/index.ts';

// eslint-disable-next-line no-undef
describe('Проверяем переходы у Роута', () => {
  // eslint-disable-next-line no-undef
  it('Переход на новую страницу должен менять состояние сущности history', () => {
    const instance : Router = new Router('.app');
    instance.use('/', Index, 'main', {
      content: '',
    });
    instance.use('/sign-up', Index, 'main', {
      content: '',
    })
      .start();
    instance.go('/');
    instance.go('/sign-up');

    expect(global.window.history.length).to.eq(3);
  });
});
