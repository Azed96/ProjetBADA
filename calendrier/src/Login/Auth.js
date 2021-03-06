import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authenticationService } from "../_services/authentication.service";
import "./Auth.css";
import getSeances from "../_services/seances.service";

class Login extends React.Component {

  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  render() {

    return (
      <div className="jumbotron h-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-xs-12">
              <div class={"main"}>
                <div className="text-center">
                  <img
                    id={"logo_main"}
                    src={require("./logo-ueve.png")}
                    className={"img-fluid"}
                    alt="Université d'Evry"
                  />
                </div>
                <hr />
                <div className="login_block">
                <div className="alert alert-primary">
                  Bienvenue sur l'EDT UEVE biologie !
                </div>
                <h2>Emploi du temps :</h2>
                <Formik
                  initialValues={{
                    codeEtudiant: ""
                  }}
                  validationSchema={Yup.object().shape({
                    codeEtudiant: Yup.string().required(
                      "Veuillez renseignez un code étudiant valide !"
                    )
                  })}
                  onSubmit={(
                    { codeEtudiant },
                    { setStatus, setSubmitting }
                  ) => {
                    setStatus();
                    authenticationService.login(codeEtudiant).then(
                      groupes => {
                        //getSeances(groupes);
                        const { from } = this.props.location.state || {
                          from: { pathname: "/" }
                        };
                        this.props.history.push(from);
                      },
                      error => {
                        console.log(error);
                        setSubmitting(false);
                        setStatus(error);
                      }
                    );
                  }}
                  render={({ errors, status, touched, isSubmitting }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="codeEtudiant">Code Etudiant :</label>
                        <Field
                          name="codeEtudiant"
                          type="text"
                          className={
                            "form-control" +
                            (errors.codeEtudiant && touched.codeEtudiant
                              ? " is-invalid"
                              : "")
                          }
                          placeholder = {"11234894"}
                        />
                        <ErrorMessage
                          name="codeEtudiant"
                          component="div"
                          className="alert alert-danger"
                          style={{marginTop: "5px"}}
                        />
                      </div>
                      <div className="form-group text-center">
                        <button
                          type="submit"
                          className="btn btn-light"
                          disabled={isSubmitting}
                        >
                          Valider
                        </button>
                        {isSubmitting && (
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        )}
                      </div>
                      {status && (
                        <div className={"alert alert-danger"}>{status}</div>
                      )}
                    </Form>
                  )}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default Login;
