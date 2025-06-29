'use client';

import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button, List, ListItem, ListItemText, Chip, Divider, CircularProgress } from '@mui/material';

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
  const [loading, setLoading] = useState(false);
  const [productivityPattern, setProductivityPattern] = useState<string | null>(null);

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

  const handleOptimizeSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks),
      });
      const data = await response.json();
      setScheduledTasks(data.schedule);
      setProductivityPattern(data.personalProductivityPattern);
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        AI Action Scheduler
      </Typography>
      {productivityPattern && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          AI analysis suggests your most productive time is in the <strong>{productivityPattern}</strong>.
        </Typography>
      )}
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
      <Button onClick={handleOptimizeSchedule} variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Generate Optimized Schedule'}
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