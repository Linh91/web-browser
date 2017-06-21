describe('Browser', function() {
  var browser;
  
  it('navigates to a webpage requested by the user', function() {
    browser.visitPage(webUrl)
    console.log = jasmine.spy('log');
    expect(console.log).toHaveBeenCalledWith('Hello World')
  });
});
