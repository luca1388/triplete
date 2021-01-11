/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

const React = require('react');

exports.onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
  setPostBodyComponents([<div key="modal" id="modal-portal" />]);
};
