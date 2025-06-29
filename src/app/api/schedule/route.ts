import { NextResponse } from 'next/server';
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

export async function POST(request: Request) {
  const tasks: Task[] = await request.json();

  // Analyze productivity pattern from mock data
  const morningProductivity = mockActivities
    .filter(a => new Date(a.startTime).getHours() < 12)
    .reduce((acc, a) => acc + a.productivity, 0);
  const afternoonProductivity = mockActivities
    .filter(a => new Date(a.startTime).getHours() >= 12)
    .reduce((acc, a) => acc + a.productivity, 0);
  const personalProductivityPattern = morningProductivity >= afternoonProductivity ? 'morning' : 'afternoon';

  // Sort tasks based on productivity pattern
  const highConcentrationTasks = tasks.filter(t => t.requiresConcentration);
  const lowConcentrationTasks = tasks.filter(t => !t.requiresConcentration);

  const sortedTasks = personalProductivityPattern === 'morning'
    ? [...highConcentrationTasks, ...lowConcentrationTasks]
    : [...lowConcentrationTasks, ...highConcentrationTasks];

  // Generate schedule
  let currentTime = 9; // Start at 9 AM
  const schedule: ScheduledTask[] = sortedTasks.map(task => {
    const startTime = `${currentTime}:00`;
    currentTime += 1; // Assume each task takes 1 hour
    const endTime = `${currentTime}:00`;
    return { ...task, startTime, endTime };
  });

  return NextResponse.json({ schedule, personalProductivityPattern });
}
