const { JSDOM } = require("jsdom");

const checkMapsLink = (string) => {
    try {
        new URL(string);
        return { value: string, type: "link" };
    } catch (e) {
        if (string.trim().startsWith("<iframe")) {
            const dom = new JSDOM(string);
            const doc = dom.window.document;
            const iframe = doc.querySelector("iframe");
            const srcValue = iframe.getAttribute("src");
            return { value: srcValue, type: "iframe" };
        } else {
            return false;
        }
    }
};

module.exports = checkMapsLink;
