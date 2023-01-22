import puppeteer from 'puppeteer';

import * as dotenv from 'dotenv';
dotenv.config();




(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  //await page.goto('http://localhost:3000',{waitUntil: "domcontentloaded"});
  await page.goto(process.env.MYURL, { waitUntil: 'networkidle0'});
  // ALWAYS USE return INSIDE evaluate BECAUSE IT HAPPENS IN THE DOM AND WE NEED TO RETURN IT TO puppeteer
   const img_text = await page.evaluate(() => { 
        const img_text = document.getElementsByClassName("mb-16")[1].firstElementChild.src.split(',')[1];
        return img_text;
    });

    //await page.type('input[class=mat-input-element mat-form-field-autofill-control ng-tns-c81-10 ng-pristine ng-invalid cdk-text-field-autofill-monitored ng-touched]', 'test', {delay: 20})
    // mat-input-element mat-form-field-autofill-control ng-tns-c81-1 ng-untouched ng-pristine ng-invalid cdk-text-field-autofill-monitored
    // await page.type(".mat-input-element:last-child input:nth-child(1)" , "user")
    const captchaSol = await page.evaluate(() => { 
      const captchaSol = document.getElementsByClassName("mat-input-element")['mat-input-0'];
      return captchaSol;
  });

  // captchaSol.value = '1234';
  console.log(captchaSol);
    //document.getElementsByClassName("mat-input-element")['mat-input-0'].value


console.log(img_text);
  await browser.close();
})();
