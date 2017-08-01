import { AppAserPage } from './app.po';

describe('app-aser App', () => {
  let page: AppAserPage;

  beforeEach(() => {
    page = new AppAserPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
