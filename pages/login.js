import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11-1019x1024.png" />
        <Button
          variant="outlined"
          onClick={signIn}
          style={{ backgroundColor: "#131c21", color: "white" }}
        >
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  background-color: #131c21;
  height: 100vh;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #323739;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.75);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;

  @media screen and (max-width: 500px) {
    width: 100px;
    height: auto;
  }
`;
