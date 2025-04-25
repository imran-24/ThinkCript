"use client";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setCategoryFilter,
  setStatusFilter,
  setSearchQuery,
} from "@/store/tasksSlice";
import {
  Box,
  Input,
  Select,
  Grid,
  Kbd,
  InputGroup,
  Portal,
} from "@chakra-ui/react";
import { taskCategorys } from "@/app/components/task-form";
import { LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const TaskFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filter } = useSelector((state: RootState) => state.tasks);

  const handleCategoryChange = (value: string) => {
    dispatch(setCategoryFilter(value))
  };

  const handleStatusChange = (value: string) => {
    dispatch(setStatusFilter(value));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Box bg='white' p={4} borderRadius='lg' boxShadow='sm' mb={6}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <InputGroup
          flex='1'
          startElement={<LuSearch />}
          endElement={<Kbd>⌘K</Kbd>}
        >
          <Input
            placeholder='Search tasks...'
            value={filter.searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <Select.Root
          value={[filter.category]}
          onValueChange={(details) => handleCategoryChange(details.value)}
          collection={taskCategorys}
          size='sm'
        >
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder='Select movie' />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {taskCategorys.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
        
      </Grid>
    </Box>
  );
};

export default TaskFilter;
