const LoginPage = require("../pageobjects/login.page");
const homepage = require("../pageobjects/homepage.page");
const admin = require("../pageobjects/admin.page");

const carouselImagesLink = "/Resources/Carousel";
const pageTitle = "MathiSecond NEW";
// const BASE_URL_ADMIN = "https://mathias-hazan-lira.netlify.app/admin.html";
const BASE_URL_ADMIN = "http://web/admin.html"; // Container

describe("Mathi homepage tests", () => {
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
    await admin.removeTestMessage();
  });

  // General

  it("Verify page title", async () => {
    await browser.url("");
    await expect(await browser.getTitle()).toEqual(pageTitle);
  });

  it("Carosal images source isn't empty", async () => {
    await browser.url("");
    await homepage.carouselImages.forEach(async (el) => {
      await expect(await el.getAttribute("src")).toContain(carouselImagesLink);
    });
  });

  it("Verify message block is there", async () => {
    await browser.url("");
    await expect(await homepage.messageForm).toBeDisplayed();
  });

  // Message
  it("Toast message is hidden", async () => {
    await expect(await homepage.messageToast.isDisplayed()).toBe(false);
  });

  it("Success message sending shows a confirmation popup", async () => {
    await homepage.sendMessage();
    await homepage.messageToast.scrollIntoView();
    await expect(await homepage.messageToast).toBeDisplayed();
    await expect(await homepage.messageToastTitle.getText()).toBe(
      `Thanks autoTestSender!`
    );
  });

  it("Toast disappears after 6 seconds", async () => {
    await homepage.sendMessage();
    await expect(await homepage.messageToast).toBeDisplayed();
    await homepage.messageSender.moveTo();
    await browser.pause(6000);
    await expect(await homepage.messageToast.isDisplayed()).toEqual(false);
  });

  it("Toast disappears when clicking the x button", async () => {
    await homepage.sendMessage();
    await browser.pause(1000);
    await homepage.btnCloseToast.click();
    await browser.pause(1000);
    await expect(await homepage.messageToast.isDisplayed()).toEqual(false);
  });

  it("Send message button is disabled when opening the page", async () => {
    await expect(homepage.BtnMessageSend).toBeDisabled();
  });

  it("Send message button is enabled when all fields have value", async () => {
    await homepage.messageTitle.setValue("autoTestTitle");
    await homepage.messageSender.setValue("autoTestSender");
    await homepage.messageMessage.setValue("autoTestMessage");
    await expect(await homepage.BtnMessageSend.isEnabled()).toEqual(true);
  });

  it("Send message button is disabled when deleting value of one field", async () => {
    await homepage.messageTitle.setValue("autoTestTitle");
    await homepage.messageSender.setValue("autoTestSender");
    await expect(await homepage.BtnMessageSend.isEnabled()).toEqual(false);
  });

  it("Sent message appears in admin", async () => {
    await homepage.sendMessage("appearsInAdmin");
    await browser.url(BASE_URL_ADMIN);
    await browser.pause(1000);
    await expect(await admin.testMessage.isDisplayed()).toEqual(true);
    await admin.testMessage.parentElement().$("a").click();
  });

  // Carousel

  it("Carousel height is bigger than 200px", async () => {
    const height = await $(".row-carousel").getSize("height");
    await expect(height).toBeGreaterThan(300);
    await console.log(height);
  });
});
