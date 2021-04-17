import styled from "styled-components";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  &:nth-child(1) {
    margin-top: 10%;
  }
`;

const MessageElement = styled.p`
  width: fit-content;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #056162;
  word-break: break-word;
  color: lightGray;

  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const Receiver = styled(MessageElement)`
  background-color: #262d31;
  text-align: left;
  word-break: break-word;
  color: lightGray;

  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
