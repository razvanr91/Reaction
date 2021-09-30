import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";

export default observer (function HomePage() {
  const {userStore, modalStore} = useStore();

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reaction
        </Header>
        {userStore.isLoggedIn ? (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Reaction" />
            <Button as={Link} to="/activities" size="huge">
              Go to activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button onClick={() => modalStore.openModal(<LoginForm />)} to="/login" size="huge" inverted>
            Log me in!
          </Button>
          <Button onClick={() => modalStore.openModal(<h1>Register</h1>)} size='huge' inverted>
            Register!
          </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
})
