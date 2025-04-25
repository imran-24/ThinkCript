"use client";

import React, { useMemo } from 'react';
import { CheckSquare, Clock, Briefcase, User, File } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Box, Center, Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';

interface StatBoxProps {
  icon: LucideIcon;
  label: string;
  value: number;
  colorScheme: string;
}

const StatBox: React.FC<StatBoxProps> = ({ icon, label, value, colorScheme }) => (
  <Box  bg="gray.50" borderRadius="lg" p={2}>
    <Flex align="start">
      <Center mr={4} bg={`${colorScheme}.100`} p={2} borderRadius="md">
        <Icon as={icon} color={`${colorScheme}.600`} boxSize={4} />
      </Center>
      <Box>
        <Text fontSize="sm" color="gray.500">{label}</Text>
        <Text fontSize="xl" fontWeight="bold" fontFamily={"monospace"}>{value}</Text>
      </Box>
    </Flex>
  </Box>
);

const TaskStats: React.FC = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'Completed').length,
    pending: tasks.filter((task) => task.status === 'Pending').length,
    work: tasks.filter((task) => task.category === 'Work').length,
    personal: tasks.filter((task) => task.category === 'Personal').length,
    other: tasks.filter((task) => task.category === 'Other').length,
  }), [tasks]);

  const statConfigs: StatBoxProps[] = [
    { icon: File, label: 'Total', value: stats.total, colorScheme: 'blue' },
    { icon: CheckSquare, label: 'Completed', value: stats.completed, colorScheme: 'green' },
    { icon: Clock, label: 'Pending', value: stats.pending, colorScheme: 'red' },
    { icon: Briefcase, label: 'Work', value: stats.work, colorScheme: 'purple' },
    { icon: User, label: 'Personal', value: stats.personal, colorScheme: 'teal' },
  ];

  return (
    <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" my={6}>
      <SimpleGrid columns={{ base: 2, md: 5 }} gap={4}>
        {statConfigs.map((config) => (
          <StatBox key={config.label} {...config} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TaskStats;
