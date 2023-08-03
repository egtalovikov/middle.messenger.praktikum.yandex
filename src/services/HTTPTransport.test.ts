import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport.ts';

// eslint-disable-next-line no-undef
describe('HTTPTransport test', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    };

    instance = new HTTPTransport();
  });

  // eslint-disable-next-line no-undef
  afterEach(() => {
    requests.length = 0;
    // @ts-expect-error
    global.XMLHttpRequest.restore();
  });

  // eslint-disable-next-line no-undef
  it('Method get() should be called with GET method', () => {
    instance.get('/');

    const [request] = requests;

    expect(request.method).to.equal('GET');
  });
});
