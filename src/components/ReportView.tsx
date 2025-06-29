'use client';

import React, { useMemo } from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemText, Alert, Button } from '@mui/material';
import { mockActivities, Activity } from '@/lib/mockData';

 interface WastedTimeByCategory {
  [category: string]: number;
}

const ReportView: React.FC = () => {
  const { wastedTime, mostWastedCategory } = useMemo(() => {
    const wastedTime: WastedTimeByCategory = {};
    let mostWastedCategory: string | null = null;
    let maxWastedTime = 0;

    mockActivities
      .filter(activity => activity.productivity < 0)
      .forEach(activity => {
        const duration = (activity.endTime.getTime() - activity.startTime.getTime()) / (1000 * 60); // in minutes
        wastedTime[activity.category] = (wastedTime[activity.category] || 0) + duration;
      });

    for (const category in wastedTime) {
      if (wastedTime[category] > maxWastedTime) {
        maxWastedTime = wastedTime[category];
        mostWastedCategory = category;
      }
    }

    return { wastedTime, mostWastedCategory };
  }, []);

  const getImprovementSuggestion = (category: string | null) => {
    if (!category) {
      return "Great job! No significant unproductive time detected.";
    }
    switch (category) {
      case 'Break':
        return "You've spent a lot of time on breaks. Consider using a timer (like the Pomodoro Technique) to keep them focused and refreshing.";
      case 'Work':
        return "It seems some work activities were unproductive. Are you facing any blockers? Consider breaking down complex tasks.";
      default:
        return `Time in the '${category}' category seems unproductive. Reflect on how you can optimize this area.`;
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Productivity Report
      </Typography>
      <Box mt={2}>
        <Typography variant="h6">Unproductive Time by Category (minutes)</Typography>
        <List>
          {Object.entries(wastedTime).map(([category, minutes]) => (
            <ListItem key={category}>
              <ListItemText primary={category} secondary={`${Math.round(minutes)} minutes`} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mt={3}>
        <Alert severity="warning">
          <Typography variant="h6">Top Improvement Area</Typography>
          <Typography gutterBottom>
            {getImprovementSuggestion(mostWastedCategory)}
          </Typography>
          <Button variant="outlined" size="small" sx={{ mt: 1 }}>
            Set a Goal
          </Button>
        </Alert>
      </Box>
    </Paper>
  );
};

export default ReportView;
