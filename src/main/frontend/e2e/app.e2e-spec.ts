import { PocFrontendPage } from './app.po';

describe('poc-frontend App', () => {
  let page: PocFrontendPage;

  beforeEach(() => {
    page = new PocFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
