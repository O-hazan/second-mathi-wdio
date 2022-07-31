const Page = require("./page");

// const BASE_URL_ADMIN = "https://mathias-hazan-lira.netlify.app/admin.html"; // Live
const BASE_URL_ADMIN = "http://web/admin.html"; // Container

class Admin {
  get testMessage() {
    return $("h5=AppearsInAdmin");
  }

  get testMessages() {
    return browser.$$("h5=AutoTestTitle");
  }

  async removeTestMessage() {
    await browser.url(BASE_URL_ADMIN);
    await browser.maximizeWindow();
    await browser.pause(2000);
    const messages = await this.testMessages;
    for (let i = 0; i < messages.length; i++) {
      const message = await browser
        .$("h5=AutoTestTitle")
        .parentElement()
        .$("a");
      await message.click();
    }
    await browser.pause(1000);
  }
}

module.exports = new Admin();
