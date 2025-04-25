"use client";

import { CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { useRef, useState } from "react";

import TaskForm from "./task-form";
import { Task } from "../../../task";

interface DrawerProps {
  children: React.ReactNode;
  task?: Task
}
export const RightDrawer = ({ children, task }: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const title = task ? "Edit Task" : "Create Task";
    const description = task
        ? "Edit the task details and save changes."
        : "Create a new task and manage your tasks efficiently.";   

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size={"md"} >
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content ref={contentRef} width={"full"}>
            <Drawer.Header>
              <div>
                <Drawer.Title>{title}</Drawer.Title>
                <Drawer.Description>
                  {description}
                </Drawer.Description>
              </div>
            </Drawer.Header>
            <Drawer.Body>
              <TaskForm task={task} contentRef={contentRef}  />
            </Drawer.Body>
            {/* <Drawer.Footer>
              <Button variant='outline'>Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer> */}
            <Drawer.CloseTrigger asChild>
              <CloseButton size='sm' />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
