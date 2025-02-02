import bodyParser from "body-parser";

export const bodyParserMiddleware = bodyParser.json();
export const urlencodedParserMiddleware = bodyParser.urlencoded({extended: true, limit: "50mb"});
