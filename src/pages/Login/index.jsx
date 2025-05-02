import LoginForm from "../../componets/login/LoginForm";
import "./index.css";

const Login = () => {
  return (
    <div className="containerLogin">
      <section className="containerImage"></section>
      
      <section className="sectionForm">
        <div className="containerLoginForm">
          <h1>Ingresa a tu cuenta</h1>
          <span>Introduzca sus datos</span>
          <LoginForm />
        </div>
      </section>
    </div>
  )
}

export default Login