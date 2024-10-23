import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

export async function POST(request: Request) {
    const { siteUrl } = await request.json();
    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;
    
    const browser = await puppeteer.launch({
        args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--disable-extensions',
            '--disable-dev-shm-usage',
            '--ignore-certificate-errors'],
        defaultViewport: chromium.defaultViewport,
        headless:false,
        executablePath: isLocal? process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath(process.env.ROUTE_AWS) : undefined
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36');
    await page.goto(siteUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('div[data-e2e="user-post-item"]', { timeout: 60000 });

    const timeoutDuration = 60000; 

    await page.waitForFunction(() => {
        return document.querySelectorAll('div[data-e2e="user-post-item"]').length > 0;
    }, { timeout: timeoutDuration });

    const tiktoks = await page.evaluate(() => {
        const tiktokElements = document.querySelectorAll('div[data-e2e="user-post-item"]');
        const tiktoks: { thumbnail: string; link: string }[] = [];
        tiktokElements.forEach((element) => {
            const thumbnail = (element.querySelector("source"))?.srcset;
            const link = (element.querySelector("a"))?.href;

            if (thumbnail && link) {
                tiktoks.push({ thumbnail, link });
            }
        });

        return tiktoks;
    });

    console.log(tiktoks);
    const pageTitle = await page.title();

    await browser.close();

    return new Response(JSON.stringify({
        pageTitle,
        videoList:tiktoks, 
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
