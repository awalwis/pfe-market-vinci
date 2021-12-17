import { Redirect, Route } from "react-router-dom";

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    console.log(appProps)
    return (
      <Route
        {...rest}
        render={props =>
          appProps
            ? <C {...props} {...appProps} />
            : <Redirect
                to={`/login`}
              />}
      />
    );
  }