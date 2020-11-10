
function FormLogin(props) {
  return (
    <form onSubmit={props.onSubmitLoginForm}>
      <label>
        Login :
                  <input type="text" id="login" />
      </label>
      <br />
      <label>
        Mot de passe :
                  <input type="password" id="pwd" />
      </label>
      <br />
      <input type="submit" value="Envoyer" />
    </form>

  );
}

export default FormLogin;