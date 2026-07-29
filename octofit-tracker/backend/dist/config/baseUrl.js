"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPort = void 0;
exports.getApiBaseUrl = getApiBaseUrl;
const port = 8000;
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-${port}.app.github.dev`
        : `http://localhost:${port}`;
}
exports.apiPort = port;
//# sourceMappingURL=baseUrl.js.map