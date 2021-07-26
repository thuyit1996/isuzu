// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the DemoHomePage component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when `jss manifest` is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: 'DemoHomePage',
    displayName: 'Content Block',
    // totally optional, but fun
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'content', type: CommonFieldTypes.RichText },
      { name: 'Image', type: CommonFieldTypes.Image },
      { name: 'heading1', type: CommonFieldTypes.SingleLineText },
      { name: 'content1', type: CommonFieldTypes.RichText },
      { name: 'Image1', type: CommonFieldTypes.Image },
    ],
    // placeholders: ['jss-nav'],
  });
}
