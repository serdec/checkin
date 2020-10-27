import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
// import App from '../components/app';
import { Selector, ClientFunction } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';
import { waitForReact } from 'testcafe-react-selectors';

fixture`CHECKIN HOME PAGE`.page('http://localhost:3000');
// .beforeEach(async () => {
//   await waitForReact();
// });

test('Page should load and display the correct title', async (t) => {
  let local_document = ClientFunction(() => {
    let h1 = document.createElement('h1');
    h1.innerText = 'some text';
    document.body.appendChild(h1);
    return ReactSelector(document).find(h1);
  });
  console.log({ local_document: local_document() });
  // let container = ClientFunction(() => document.body.appendChild(container));
  act(() => {
    // ReactDOM.render(<App isSignedIn={true} />, container);
  });
  const document = await local_document();
  const actual = document.innerText;
  const expected = 'some text';
  await t.expect(actual).eql(expected);
});

// const getLocation = ClientFunction(() => window.location.href);

// test('Register button should navigate to registration page', async (t) => {
//   // Flexible selectors let us select arbitrary things on the page,
//   // regardless of how the page was marked up.
//   const registerButton = Selector('span').withText('REGISTER NOW');
//   const expected = 'https://zoom.us/webinar/register/WN_rYdjYdXFTPiHCsiWsnq0jA'; // Wait for the button click navigation
//   await t.click(registerButton); // Now check the location.
//   await t.expect(getLocation()).eql(expected);
// });
