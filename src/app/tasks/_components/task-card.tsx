"use client";

import { Task } from "../../../../task";
import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { MenuOptions } from "./menu";
import { Grip } from "lucide-react";

interface TaskCardProps {
  task: Task;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provided: any
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, provided }) => {

  return (
    <Card.Root
      variant='outline'
      backgroundColor={task.status === "Completed" ? "gray.50" : "white"}
      _hover={{ shadow: "md" }}
      transition='all 0.2s'
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <CardBody>
        <Flex justify='space-between' align='flex-start' mb={2}>
          <Box>
            <IconButton
            {...provided.dragHandleProps}
             variant={"ghost"} opacity={50} _hover={{ opacity: 100}}>
                <Grip />
            </IconButton>
            <Text
              fontSize='xl'
              fontWeight='normal'
              textDecoration={
                task.status === "Completed" ? "line-through" : "none"
              }
              fontFamily={"heading"}
              color={task.status === "Completed" ? "gray.500" : "inherit"}
            >
              {task.title}
            </Text>
            <HStack mt={2} gap={2}>
              <Badge colorScheme='purple'>{task.category}</Badge>
              <Badge
                colorScheme={task.status === "Completed" ? "green" : "red"}
              >
                {task.status}
              </Badge>
            </HStack>
          </Box>
          
          <MenuOptions task={task}  />
        </Flex>

        {task.description && (
          <Text
            mt={2}
            fontSize='sm'
            color={task.status === "Completed" ? "gray.400" : "gray.600"}
          >
            {task.description}
          </Text>
        )}

      </CardBody>
    </Card.Root>
  );
};

