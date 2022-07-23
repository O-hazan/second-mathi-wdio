const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");

describe("Mathi homepage", () => {
  // General
  let mock;

  before(async () => {
    // mock = await browser.mock("http://127.0.0.1:8000/message");
    await browser.url("");
    await browser.maximizeWindow();
  });
  beforeEach(async () => {
    // mock = await browser.mock("http://127.0.0.1:8000/message");
    await browser.url("");
  });

  after(async () => {
    await browser.url("http://127.0.0.1:5500/admin.html#");
    await browser.maximizeWindow();
    await browser.pause(2000);
    const messages = await browser.$$("h5=AutoTestTitle");
    for (let i = 0; i < messages.length; i++) {
      const message = await browser
        .$("h5=AutoTestTitle")
        .parentElement()
        .$("a");
      await message.click();
    }
    await browser.pause(1000);
  });

  it("Verify page title", async () => {
    await browser.url("");
    await expect(await browser.getTitle()).toEqual("MathiSecond NEW");
  });

  it("Carosal images are source isn't empty", async () => {
    await browser.url("");
    await $(".carousel-inner")
      .$$("img")
      .forEach(async (el) => {
        await expect(await el.getAttribute("src")).toContain(
          "/Resources/Carousel"
        );
      });
  });

  it("Verify message block is there", async () => {
    await browser.url("");
    await expect(await $(".row-news")).toBeDisplayed();
  });

  // Message
  it("Toast message is hidden", async () => {
    await browser.url("");
    const toast = await $(".toast ");
    await expect(await toast.isDisplayed()).toBe(false);
  });

  it("Success message sending shows a confirmation popup", async () => {
    await browser.url("");
    await $("#title").setValue("autoTestTitle");
    await $("#sender").setValue("autoTestSender");
    await $("#message").setValue("autoTestMessage");
    await $(".SendMessageForm").$(".SendBtn").click();
    await expect(await $(".toast")).toBeDisplayed();
    await expect(await $(".state").getText()).toBe(`Thanks autoTestSender!`);
  });

  it("Toast disappears after x seconds", async () => {
    await browser.url("");
    const toast = await $(".toast ");
    await $("#title").setValue("autoTestTitle");
    await $("#sender").setValue("autoTestSender");
    await $("#message").setValue("autoTestMessage");
    await $(".SendMessageForm").$(".SendBtn").click();
    await expect(await $(".toast")).toBeDisplayed();
    await browser.pause(5000);
    await expect(await $(".toast").isDisplayed()).toEqual(false);
  });

  it("Toast disappears when clicking the x button", async () => {
    await browser.url("");
    const toast = await $(".toast ");
    const closeToast = await $(".toast-header").$("button");
    await $("#title").setValue("autoTestTitle");
    await $("#sender").setValue("autoTestSender");
    await $("#message").setValue("autoTestMessage");
    await $(".SendMessageForm").$(".SendBtn").click();
    await browser.pause(1000);
    await $(".toast-header").$("button").click();
    await browser.pause(1000);
    await expect(await $(".toast").isDisplayed()).toEqual(false);
  });

  it("Send message button is disabled when opening the page", async () => {
    const btnSend = await $("button=Send");
    await expect(btnSend).toBeDisabled();
  });

  it("Send message button is enabled when all fields have value", async () => {
    const btnSend = await $("button=Send");
    await $("#title").setValue("autoTestTitle");
    await $("#sender").setValue("autoTestSender");
    await $("#message").setValue("autoTestMessage");
    await expect(await btnSend.isEnabled()).toEqual(true);
  });

  it("Send message button is disabled when deleting value of one field", async () => {
    const btnSend = await $("button=Send");
    await $("#title").setValue("autoTestTitle");
    await $("#sender").setValue("autoTestSender");
    await expect(await btnSend.isEnabled()).toEqual(false);
  });
});
