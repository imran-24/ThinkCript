"use client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { TaskCard } from "./task-card";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { RightDrawer } from "@/app/components/drawer";
import { Plus } from "lucide-react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { reorderTasks } from "@/store/tasksSlice";

const TaskList: React.FC = () => {

  const dispatch = useAppDispatch();

  const [isMounted, setIsMounted] = useState(false);
  const { filteredTasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const onDragEnd = (result: DropResult) => {
    if(!result.destination) return;
    console.log(result.destination.index, result.source.index)
    // dispatch(reorderTasks({ sourceIndex: result.source.index, destinationIndex: result.destination.index }));    
  }

  if (!isMounted) return null;

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='tasks'>
          {(provided) => (
            <SimpleGrid gap={4} columns={{ base: 1, md: 2, lg: 3 }} {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}>
                  {(provided) => (
                    <TaskCard provided={provided}  task={task} />
                  )}
                </Draggable>
              ))}
            </SimpleGrid>
          )}
        </Droppable>
      </DragDropContext>
  );
};

export default TaskList;
