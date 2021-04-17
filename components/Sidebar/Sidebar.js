import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import DonutLargeRoundedIcon from "@material-ui/icons/DonutLargeRounded";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import Chat from "../Chat/Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  // Real time listener
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // we add the chat into the DB chats collection if it doesnt already exist and is valid
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };
  // checking if the chat already exists
  const chatAlreadyExists = (recipientEmail) =>
    // Return a truthy or falsy value (//)
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar
          src={user.photoURL}
          onClick={() => auth.signOut()}
          title="Click to sign out"
        />

        <IconsContainer>
          <IconButton>
            <DonutLargeRoundedIcon style={{ color: "#B1B3B5" }} />
          </IconButton>
          <IconButton>
            <ChatIcon style={{ color: "#B1B3B5" }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ color: "#B1B3B5" }} />
          </IconButton>
        </IconsContainer>
      </Header>

      <SearchContainer>
        <Search>
          <SearchIcon style={{ color: "#B1B3B5" }} />
          <SearchInput placeholder="Search in chats" type="text" />
        </Search>
      </SearchContainer>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      <ChatContainer>
        {/* List of Chats */}
        {chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </ChatContainer>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 0.5px solid #262d31;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media screen and (max-width: 500px) {
    min-width: 115px;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 75px;
  background-color: #2a2f32;

  @media screen and (max-width: 500px) {
    height: auto;
  }
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #131c21;
  padding: 10px;
  border-bottom: 0.5px solid #262d31;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: #32373a;
  padding: 10px;
  width: 100%;

  @media screen and (max-width: 500px) {
    padding-left: 45px;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  margin-left: 10px;
  background-color: transparent;
  color: white;

  ::placeholder {
    color: white;
  }
  @media screen and (max-width: 500px) {
    font-size: 11px;
    margin-left: 5px;
  }
`;

const SidebarButton = styled(Button)`
  width: 100%;
  // increase the priority of the rule
  &&& {
    border-top: 0.5px solid #262d31;
    border-bottom: 0.5px solid #262d31;
    background-color: #2a2f32;
    color: white;
    font-weight: 550;
    border-radius: 0px;
  }
  @media screen and (max-width: 500px) {
    font-size: small !important;
  }
`;

const ChatContainer = styled.div`
  background-color: #131c21;
  min-height: 100vh;
`;
