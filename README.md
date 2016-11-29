# oxinbox

> A simple, lightweight OX client.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## Product Roadmap
Basic product: Mail, Contacts, Calendar (lite)
Mail: Smart search using lunr.js and saving index to user settings for portability, storing locally (encrypted) for fast pre-loading
Mail: Smart reply-all which warns user when recipient list is > a threshold or includes a mailing list
