import { signinRouter } from "./signin"
import { signoutRouter } from "./signout"
import { signupRouter } from "./signup"
import { currentUserRouter } from "./me"

const routes = [signinRouter, signoutRouter, signupRouter, currentUserRouter]

export default routes
