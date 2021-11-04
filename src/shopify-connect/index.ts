import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import Widget from './app'

// Initialize `javascript-time-ago` locale (required for react-time-ago)
TimeAgo.addDefaultLocale(en)

export default {
  title: 'Shopify connect',
  name: 'shopify-connect',
  component: Widget,
}
