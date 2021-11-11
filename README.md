# Sanity Dashboard Widgets for Shopify

<img width="1450" alt="Shopify dashboard widgets" src="https://user-images.githubusercontent.com/209129/141157755-37f4c8aa-9b1a-489e-9264-a6cacfb9a0dd.png">

## About

This plugin is built specifically for our [pre-configured Sanity studio for Shopify][sanity-shopify-studio] and assumes you're using its `product` and `productVariant` document schemas.

It exposes two dashboard widgets that can help get you up and running with [Sanity Connect for Shopify][sanity-connect]

1. `shopify-intro`: An introductory widget with some resources and helpful links
2. `shopify-connect`: A widget which displays a list of recently updated products in real-time, alongside basic information about your Sanity project and connected Shopify store.

## Installing

In your Sanity project folder:

```sh
sanity install dashboard-widget-shopify
```

## Configuring

If you haven't configured a [dashboard][sanity-dashboard] yet:

```sh
sanity install @sanity/dashboard
```

In your studio's `sanity.json` append the following to `plugins` and `parts`:

```javascript
"plugins": [
  // ...
  "dashboard-widget-shopify"
],
"parts": [
  // ...
  {
    "implements": "part:@sanity/dashboard/config",
    "path": "dashboardConfig.js"
  }
]
```

In `dashboardConfig.js`, ensure that `widgets` includes the following:

```javascript
export default {
  widgets: [
    // ...
    {
      name: 'shopify-intro',
      layout: {
        width: 'medium',
      },
    },
    {
      name: 'shopify-connect',
      layout: {
        width: 'small',
      },
    },
  ],
}
```

Both widgets can be enabled or disabled independently. If you feel you've outgrown the intro, remove the object block containing `shopify-intro` from your `dashboardConfig.js`.

## How this works with Sanity Connect

When you connect your Sanity project to your Shopify store with Sanity Connect, a special document of type `sanity.shopify.sync` is automatically created. This document is updated whenever manual re-syncs are triggered from the Shopify App, as well as when products are individually updated (if you've enabled _automatic product syncing_).

The `sanity-connect` dashboard widget listens to this document for changes in real-time and updates accordingly. No sensitive information about your store or products are sent over the wire, and the `sanity.shopify.sync` document will be automatically removed from your dataset when you disconnect your project from Sanity Connect.

<details><summary>An example <code>sanity.shopify.sync</code> document</summary>
<p>

```json
{
  "_createdAt": "2021-11-05T20:41:45Z",
  "_id": "18d8d221-c581-5c4b-b39f-5a9d8fad91fa",
  "_rev": "QPhGwHFNrPtk8rszfkEUdC",
  "_type": "sanity.shopify.sync",
  "_updatedAt": "2021-11-10T23:48:36Z",
  "log": [
    {
      "documentId": "shopifyProduct-6640058040407",
      "error": null,
      "productId": 6640058040407,
      "productTitle": "Lake Sofa 3 seater (mk3)",
      "timestamp": "2021-11-10T23:48:36.721Z",
      "type": "update"
    },
    {
      "documentId": "shopifyProduct-6640053256279",
      "error": null,
      "productId": 6640053256279,
      "productTitle": "Sofa 1 seater (v14)",
      "timestamp": "2021-11-07T12:23:27.090Z",
      "type": "update"
    },
    {
      "documentId": "shopifyProduct-6639533588567",
      "error": null,
      "productId": 6639533588567,
      "productTitle": "Coffee Table (v33)",
      "timestamp": "2021-11-05T20:41:45.420Z",
      "type": "update"
    }
  ],
  "status": {
    "completedAt": "2021-11-10T15:40:04.838Z",
    "count": {
      "products": 10,
      "variants": 56
    },
    "error": null,
    "startedAt": "2021-11-10T15:39:53.507Z",
    "status": "success"
  },
  "store": "sanity-dev-store.myshopify.com"
}
```

</p>
</details>

## License

This repository is published under the [MIT](LICENSE) license.

[sanity-connect]: https://www.sanity.io/docs/sanity-connect-for-shopify
[sanity-dashboard]: https://www.sanity.io/docs/dashboard
[sanity-shopify-studio]: https://github.com/sanity-io/sanity-shopify-studio
