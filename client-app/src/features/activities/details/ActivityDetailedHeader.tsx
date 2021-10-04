import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

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
  const {activityStore: {updateAttendance, loading, cancelActivityToggle}} = useStore();
    return (
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          {activity.isCancelled && 
            <Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}} ribbon color='red' content='Cancelled' />
          }
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
              <Fragment>
                <Button color={activity.isCancelled ? 'green' : 'red'} 
                  floated='left'
                  basic
                  content={activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                  onClick={cancelActivityToggle}
                  loading={loading}
                />

                <Button
                  disabled={activity.isCancelled}
                  as={Link}
                  to={`/manage/${activity.id}`}
                  color="orange"
                  floated="right"
                  content="Manage event"
              />
              </Fragment>

              
            ) : activity.isGoing ? (
              <Button disabled={activity.isCancelled} loading={loading} onClick={updateAttendance} content="Cancel attendance" />
            ) : (
              <Button disabled={activity.isCancelled} loading={loading} onClick={updateAttendance} color="teal" content="Join Activity" />
            )}
          </Segment>
        </Segment>
      </Segment.Group>
    );
})