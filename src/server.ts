import App from "./index";
import * as Router from "@routes/index";

const app = new App(new Router.UsersRouter(), new Router.CategoryRouter());

app.listen();
