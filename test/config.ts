const jsdom = require('jsdom');
// Create a fake DOM for testing with $.ajax
(<any>global).window = new jsdom.JSDOM().window;
(<any>global).document = window.document;
(<any>global).HTMLElement = (<any>window).HTMLElement;