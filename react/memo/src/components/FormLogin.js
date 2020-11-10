
function FormLogin(props) {
  return (
    <form onSubmit={props.onSubmitLoginForm} className="d-flex flex-wrap justify-content-start">
      <label className="w-25">
        Login :
      </label>
      <input type="text" id="login" className="w-75 form-control" placeholder="login" />
      <label className="w-25">Mot de passe :</label>
      <input type="password" id="pwd" className="w-75 form-control" placeholder="mot de passe" />
      <input type="submit" value="Envoyer" className="" />
    </form>

  );
}

export default FormLogin;