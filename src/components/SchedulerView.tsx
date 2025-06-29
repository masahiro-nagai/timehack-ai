'use client';

import React, { useState, useMemo } from 'react';
import { Paper, Typography, Box, TextField, Button, List, ListItem, ListItemText, Chip, Divider } from '@mui/material';
import { mockActivities } from '@/lib/mockData';

interface Task {
  id: number;
  name: string;
  requiresConcentration: boolean;
}

interface ScheduledTask extends Task {
  startTime: string;
  endTime: string;
}

const SchedulerView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: '資料作成', requiresConcentration: true },
    { id: 2, name: 'メール返信', requiresConcentration: false },
    { id: 3, name: 'ブレインストーミング', requiresConcentration: true },
  ]);
  const [newTaskName, setNewTaskName] = useState('');
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>([]);

  const personalProductivityPattern = useMemo(() => {
    // Mock analysis: Assume morning is more productive based on historical data
    const morningProductivity = mockActivities
      .filter(a => new Date(a.startTime).getHours() < 12)
      .reduce((acc, a) => acc + a.productivity, 0);
    const afternoonProductivity = mockActivities
      .filter(a => new Date(a.startTime).getHours() >= 12)
      .reduce((acc, a) => acc + a.productivity, 0);
    return morningProductivity >= afternoonProductivity ? 'morning' : 'afternoon';
  }, []);

  const handleAddTask = () => {
    if (!newTaskName) return;
    const newTask: Task = {
      id: Date.now(),
      name: newTaskName,
      requiresConcentration: true, // Default to requiring concentration
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  const handleOptimizeSchedule = () => {
    const highConcentrationTasks = tasks.filter(t => t.requiresConcentration);
    const lowConcentrationTasks = tasks.filter(t => !t.requiresConcentration);

    const sortedTasks = personalProductivityPattern === 'morning'
      ? [...highConcentrationTasks, ...lowConcentrationTasks]
      : [...lowConcentrationTasks, ...highConcentrationTasks];

    let currentTime = 9; // Start at 9 AM
    const schedule: ScheduledTask[] = sortedTasks.map(task => {
      const startTime = `${currentTime}:00`;
      currentTime += 1; // Assume each task takes 1 hour
      const endTime = `${currentTime}:00`;
      return { ...task, startTime, endTime };
    });

    setScheduledTasks(schedule);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        AI Action Scheduler
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Your most productive time is in the <strong>{personalProductivityPattern}</strong>.
      </Typography>
      <Box display="flex" gap={2} my={2}>
        <TextField
          label="New Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          size="small"
        />
        <Button onClick={handleAddTask} variant="outlined">Add Task</Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Button onClick={handleOptimizeSchedule} variant="contained" color="primary" fullWidth>
        Generate Optimized Schedule
      </Button>
      <Box mt={3}>
        <Typography variant="h6">Today's Optimal Schedule</Typography>
        <List>
          {scheduledTasks.map(task => (
            <ListItem key={task.id}>
              <ListItemText primary={task.name} secondary={`${task.startTime} - ${task.endTime}`} />
              {task.requiresConcentration && <Chip label="High Concentration" size="small" color="info" />}
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default SchedulerView;
