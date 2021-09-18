import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="Reaction" />
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id} content={activity.title} />
        ))}
      </List>
    </div>
  );
}

export default App;
