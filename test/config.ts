const jsdom = require('jsdom');

(<any>global).window = new jsdom.JSDOM().window;
(<any>global).document = window.document;
(<any>global).HTMLElement = (<any>window).HTMLElement;