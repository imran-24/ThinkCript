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
  Grid,
  Kbd,
  InputGroup,
  Accordion,
  Icon,
  Button,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { SelectFilter } from "./select-filter";
import { taskCategorys, taskStatus } from "@/app/components/drawer";
import { Filter, ListFilter } from "lucide-react";

const TaskFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);

  const handleCategoryChange = (selected: string[]) => {
    setCategory(selected);
    dispatch(setCategoryFilter(selected[0] || "All")); // fallback to All
  };

  const handleStatusChange = (selected: string[]) => {
    setStatus(selected);
    dispatch(setStatusFilter(selected[0] || "All"));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Accordion.Root multiple defaultValue={["b"]} my={2} transform={"initial"} transition={"all"} >
      <Accordion.Item value={""} border={"none"}>
        <Accordion.ItemTrigger asChild>
          <Button type="button" variant={"outline"}>
          <Icon fontSize='sm' color='fg.subtle'>
            <ListFilter />
          </Icon>
          Filter
          </Button>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            <Box bg='white' >
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap={4}
              >
                <InputGroup
                  flex='1'
                  startElement={<LuSearch />}
                  endElement={<Kbd>⌘K</Kbd>}
                >
                  <Input
                    placeholder='Search tasks...'
                    value={search}
                    onChange={handleSearchChange}
                  />
                </InputGroup>
                <SelectFilter
                  collections={taskCategorys}
                  handleChange={handleCategoryChange}
                  value={category}
                  placeholder='Select Category'
                />
                <SelectFilter
                  collections={taskStatus}
                  handleChange={handleStatusChange}
                  value={status}
                  placeholder='Select Status'
                />
              </Grid>
            </Box>
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default TaskFilter;
