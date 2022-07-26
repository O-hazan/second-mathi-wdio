FROM ianwalter/puppeteer:latest
WORKDIR /app
ADD . /app

# Install wget.
RUN apt-get install -y wget
# Set the Chrome repo.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable

RUN npm install

# RUN apt install ./google-chrome-stable_current_amd64.deb


CMD npx wdio