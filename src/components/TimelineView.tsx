'use client';

import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Paper, Chip } from '@mui/material';
import { mockActivities, Activity } from '@/lib/mockData';

const getProductivityColor = (productivity: Activity['productivity']) => {
  switch (productivity) {
    case 2: return 'success.main';
    case 1: return 'success.light';
    case 0: return 'grey.500';
    case -1: return 'warning.light';
    case -2: return 'error.main';
    default: return 'grey.500';
  }
};

const TimelineView: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Today's Timeline
      </Typography>
      <List>
        {mockActivities.map((activity) => (
          <ListItem key={activity.id} sx={{ borderLeft: `4px solid ${getProductivityColor(activity.productivity)}`, mb: 2 }}>
            <ListItemText
              primary={activity.aiSummary}
              secondary={isClient ? `${activity.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${activity.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ' '}
            />
            <Chip label={activity.category} size="small" />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TimelineView;
