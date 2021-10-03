import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '12%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedHeader({activity}: Props) {
    return (
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            src={`/assets/categoryImages/${activity.category}.jpg`}
            fluid
            style={activityImageStyle}
            basic
          />
          <Segment style={activityImageTextStyle} basic>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={activity.title}
                    style={{ color: "white" }}
                  />
                  <p>{format(activity.date!, "dd MMM yyyy")}</p>
                  <p>
                    Hosted by <strong>
                      <Link to={`/profiles/${activity.host?.username}`}>
                        {activity.host?.displayName}
                      </Link>
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment clearing attached="bottom">
            {activity.isHost ? (
              <Button
                as={Link}
                to={`/manage/${activity.id}`}
                color="orange"
                floated="right"
                content="Manage event"
              />
            ) : activity.isGoing ? (
              <Button content="Cancel attendance" />
            ) : (
              <Button color="teal" content="Join Activity" />
            )}
          </Segment>
        </Segment>
      </Segment.Group>
    );
})