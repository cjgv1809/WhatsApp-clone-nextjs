import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import styled from "styled-components";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const enterChat = () => router.push(`/chat/${id}`);

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]} </UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  background-color: #131c21;
  border-bottom: 0.5px solid #262d31;
  color: white;

  :hover {
    background-color: #2d3134;
  }

  > p {
    flex: 1;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    padding: 10px;

    > p {
      font-size: 10px;
      word-break: break-word;
    }
  }
`;

const UserAvatar = styled(Avatar)`
  margin-right: 10px;

  @media screen and (max-width: 500px) {
    margin: auto;
  }
`;
