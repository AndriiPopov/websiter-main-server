var React = require('react')
var PropTypes = require('prop-types')
var serialize = require('serialize-javascript')

function Layout(props) {
    return null
    return (
        <html>
            <head>
                <title>{props.title}</title>
                <link rel="stylesheet" href="/stylesheets/style.css" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
          // This is making use of ES6 template strings, which allow for
          // multiline strings. We specified "{jsx: {harmony: true}}" when
          // creating the engine in app.js to get this feature.
          console.log("hello world");
          window.__MD__ = ${serialize(props.mD)};
        `,
                    }}
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://websiter.s3.us-east-2.amazonaws.com/systemClasses.css"
                />
            </head>
            <body>
                {props.children}
                <script src="/index.js" charset="utf-8" />
                <script src="/vendor.js" charset="utf-8" />
            </body>
        </html>
    )
}

Layout.propTypes = {
    title: PropTypes.string,
}

module.exports = Layout
