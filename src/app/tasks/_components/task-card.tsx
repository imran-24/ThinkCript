"use client";

import { Task } from "../../../../task";
import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MenuOptions } from "./menu";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {

  return (
    <Card.Root
      variant='outline'
      backgroundColor={task.status === "Completed" ? "gray.50" : "white"}
      _hover={{ shadow: "md" }}
      transition='all 0.2s'
    >
      <CardBody>
        <Flex justify='space-between' align='flex-start' mb={2}>
          <Box>
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

