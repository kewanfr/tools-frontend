// executed after the build process

// import the fs module
import fs from "fs";
const script = `    <script type="text/javascript">
// MIT License
// https://github.com/rafgraph/spa-github-pages
// This script checks to see if a redirect is present in the query string,
// converts it back into the correct url and adds it to the
// browser's history using window.history.replaceState(...),
// which won't cause the browser to attempt to load the new url.
// When the single page app is loaded further down in this file,
// the correct url will be waiting in the browser's history for
// the single page app to route accordingly.
(function (l) {
  if (l.search[1] === "/") {
    var decoded = l.search
      .slice(1)
      .split("&")
      .map(function (s) {
        return s.replace(/~and~/g, "&");
      })
      .join("?");
    window.history.replaceState(
      null,
      null,
      l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
})(window.location);
</script>`;

// read the content of the dist/index.html file
fs.readFile("dist/index.html", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // append the script to the end of the file
  const result = data.replace("</head>", script + "</head>");

  // overwrite the file with the new content
  fs.writeFile("dist/index.html", result, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Script added to index.html");
  });
});

fs.writeFileSync("dist/CNAME", "music.kewan.fr", "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("CNAME added to dist");
});