'use client';

import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';

// 各機能のプレースホルダーコンポーネント
import TimelineView from './TimelineView';
import ReportView from './ReportView';
import SchedulerView from './SchedulerView';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ margin: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
          <Tab label="Timeline" />
          <Tab label="Reports" />
          <Tab label="Scheduler" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TimelineView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReportView />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SchedulerView />
      </TabPanel>
    </Paper>
  );
};

export default Dashboard;
