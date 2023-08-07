import puppeteer from 'puppeteer-core';

import GoLogin from '../src/gologin.js';

const { connect } = puppeteer;

(async () => {
  const GL = new GoLogin({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGEzZDM0ODI5ZTY1NDAzYTU5MDUyZWQiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NGEzZDY2MGFhMTc4ZjQ1NmZiYjY5OTAifQ.3-LgQf7cYmF-mVXZUpe65M7l1z_x1qZjOYNTXNTAYMI',
    profile_id: '64a3f5146939ebfccc2c3fff',
    executablePath: '/usr/bin/orbita-browser/chrome',
    tmpdir: './dir',
  });

  const wsUrl = await GL.startLocal();
  const browser = await connect({
    browserWSEndpoint: wsUrl.toString(),
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto('https://myip.link');
  console.log(await page.content());
  await browser.close();
  await GL.stopLocal({ posting: false });
})();
