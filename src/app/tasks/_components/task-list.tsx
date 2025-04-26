"use client";
import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { TaskCard } from "./task-card";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { RightDrawer } from "@/app/components/drawer";
import { Plus } from "lucide-react";

const TaskList: React.FC = () => {
  const { filteredTasks } = useSelector((state: RootState) => state.tasks);

  if (filteredTasks.length === 0) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection={"column"}
        py={4}
        gap={2}
        bg='white'
        borderRadius='lg'
        boxShadow='sm'
      >
        <Text fontSize='sm' color='gray.500'>
          No tasks found. Create a new task to get started!
        </Text>

        <RightDrawer>
          <Button variant='outline' size='sm' width={300}>
            <Plus /> Add Task
          </Button>
        </RightDrawer>
      </Box>
    );
  }

  return (
    <SimpleGrid gap={4} columns={{ base: 1, md: 2, lg: 3 }}>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </SimpleGrid>
  );
};

export default TaskList;
