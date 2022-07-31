const Page = require("./page");

class Homepage {
  get messageTitle() {
    return $("#title");
  }

  get messageSender() {
    return $("#sender");
  }

  get BtnMessageSend() {
    return $(".SendMessageForm").$(".SendBtn");
  }

  get messageForm() {
    return $(".SendMessageForm");
  }

  get messageMessage() {
    return $("#message");
  }

  get messageToast() {
    return $(".toast");
  }

  get btnCloseToast() {
    return $(".toast-header").$("button");
  }

  get messageToastTitle() {
    return $(".state");
  }

  get carouselImages() {
    return $(".carousel-inner").$$("img");
  }

  async sendMessage(
    title = "autoTestTitle",
    sender = "autoTestSender",
    message = "autoTestMessage"
  ) {
    await this.messageTitle.setValue(title);
    await this.messageSender.setValue(sender);
    await this.messageMessage.setValue(message);
    await this.BtnMessageSend.scrollIntoView();
    await this.BtnMessageSend.click();
  }
}

module.exports = new Homepage();
