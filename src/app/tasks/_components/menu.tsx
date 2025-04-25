import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteTask, toggleTaskStatus } from "@/store/tasksSlice";
import { Button, IconButton, Menu, Portal } from "@chakra-ui/react";
import {
  Check,
  MoreHorizontal,
  Pencil,
  Square,
  Trash2,
} from "lucide-react";
import { Task } from "../../../../task";
import { RightDrawer } from "@/app/components/drawer";

interface MenuOptionsProps {
  task: Task;
}

export const MenuOptions = ({ task }: MenuOptionsProps) => {
  const dispatch = useAppDispatch();

  //   const handleToggleStatus = () => {
  //     dispatch(toggleTaskStatus(task.id));
  //   };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton size='sm' variant='outline'>
          <MoreHorizontal />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            width={200}
            bg='white'
            boxShadow='md'
            borderRadius='md'
            p={2}
            focusRing={"none"}
          >
            <Menu.Item
              asChild
              value={
                task.status === "Completed" ? "Completed" : " Mark as Completed"
              }
              px={4}
            >
              <Button
                onClick={handleToggleStatus}
                outline={"none"}
                justifyContent='flex-start'
                rounded={"lg"}
                variant='ghost'
                width={"full"}
                size={"sm"}
                px={4}
              >
                {task.status === "Completed" ? (
                  <>
                    <Check /> Completed
                  </>
                ) : (
                  <>
                    <Square /> Mark as Completed
                  </>
                )}
              </Button>
            </Menu.Item>

            <Menu.Item asChild value={"Edit"}>
              <RightDrawer task={task}>
                <Button
                  // onClick={handleToggleStatus}
                  outline={"none"}
                  justifyContent='flex-start'
                  rounded={"lg"}
                  variant='ghost'
                  width={"full"}
                  size={"sm"}
                  px={4}
                >
                  <Pencil /> Edit
                </Button>
              </RightDrawer>
            </Menu.Item>

            <Menu.Item asChild value={"Delete"}>
              <Button
                onClick={handleDelete}
                variant='plain'
                width={"full"}
                size={"sm"}
                rounded={"lg"}
                px={4}
                justifyContent='flex-start'
              >
                <Trash2 /> Delete
              </Button>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
