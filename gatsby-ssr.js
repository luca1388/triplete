/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

const React = require("react");
// const { default: NewVersionBanner } = require("./src/components/NewVersionBanner/NewVersionBanner");
let HeadComponents = [];

if (
  process.env.NODE_ENV === "production" &&
  process.env.GATSBY_ADSENSE_CLIENT_ID &&
  process.env.GATSBY_ADSENSE_CLIENT_ID !== " "
) {
  HeadComponents.push(
    <script
      data-ad-client={process.env.GATSBY_ADSENSE_CLIENT_ID}
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ></script>
  );
}

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents, setPreBodyComponents },
  pluginOptions
) => {
  setPostBodyComponents([<div key="modal" id="modal-portal" />]);
  setPreBodyComponents([<div key="banner" id="banner-portal"></div>])
  setHeadComponents(HeadComponents);
};

// exports.wrapPageElement = ({ element, props }) => {
//   return (
//     <div {...props}>
//       <NewVersionBanner />
//       {element}
//     </div>
//   );
// };
