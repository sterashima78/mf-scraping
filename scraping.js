const puppeteer = require('puppeteer');

module.exports = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });
    const mail = process.env.EMAIL
    const pass = process.env.PASSWORD
    try {
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36')
        await page.goto('https://moneyforward.com/users/sign_in');
        await page.type('#sign_in_session_service_email', mail);
        await page.type('#sign_in_session_service_password', pass)
        await page.click("#login-btn-sumit")
        await page.waitFor("#header-container")
        await page.goto("https://moneyforward.com/bs/portfolio", {
            waitUntil: 'domcontentloaded'
        })
        const items1 = await page.evaluate(() => {
            const rows = document.getElementById("portfolio_det_mf")
                .querySelector("tbody")
                .querySelectorAll("tr")
            return Array.from(rows).map(row => {
                const cells = row.querySelectorAll("td")
                return [cells[0].innerText, cells[4].innerText]
            })
        })
        const items2 = await page.evaluate(() => {
            const rows = document.getElementById("portfolio_det_pns")
                .querySelector("tbody")
                .querySelectorAll("tr")
            return Array.from(rows).map(row => {
                const cells = row.querySelectorAll("td")
                return [cells[0].innerText, cells[2].innerText]
            })
        })
        await browser.close();
        return items1.concat(items2).map(([name, yen])=> {
            return [name, parseInt(yen.replace("円", "").replace(',',''))]
        })
    } catch (error) {
        await browser.close();
        return []
    }
}