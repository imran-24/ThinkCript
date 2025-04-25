"use client";


import { Task } from "../../../task";
import {
  Button,
  createListCollection,
  Drawer,
  Field,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { DropDownMenu } from "./drop-down";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addTask, editTask } from "@/store/tasksSlice";
import { toaster } from "@/components/ui/toaster";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.string({ message: "Category is required" }).array(),
  status: z.string({ message: "Status is required" }).array(),
});

type FormValues = z.infer<typeof formSchema>;

interface TaskFormProps {
  task?: Task;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, contentRef }) => {
  // const initialState = task
  //   ? { ...task }
  //   : {
  //       title: "",
  //       description: "",
  //       category: "Work" as TaskCategory,
  //       status: "Pending" as TaskStatus,
  //     };

  // const [formData, setFormData] = useState(initialState);
  // //   const dispatch = useAppDispatch();

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!formData.title.trim()) {
  //     alert("Task title is required");
  //     return;
  //   }

  //   // if (isEditing && task) {
  //   //   dispatch(editTask({ id: task.id, task: formData }));
  //   //   alert('Task updated successfully');
  //   // } else {
  //   //   dispatch(addTask(formData));
  //   //   alert('Task created successfully');
  //   // }

  //   // Reset form if not editing
  //   if (!isEditing) {
  //     setFormData(initialState);
  //   }

  //   // Close modal if provided
  //   if (onClose) {
  //     onClose();
  //   }
  // };

  const taskButton = task ? "Save" : "Create";

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: task
      ? {
          ...task,
          category: [task.category],
          status: [task.status],
        }
      : {
          title: "",
          description: "",
          category: [],
          status: [],
        },
  });

  
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    if (!data.title.trim()) {
      alert("Task title is required");
      return;
    }
    const formatedData = {
      ...data,
      category: data.category[0],
      status: data.status[0],
    };

    if (task) {
      dispatch(editTask({ id: task.id, task: formatedData }));
      toaster.success({
        title: "Task updated successfully",
      })
    } else {
      dispatch(addTask(formatedData));
      toaster.success({
        title: "Task created successfully",
      })
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack gap='4'>
          <Field.Root invalid={!!errors.title}>
            <Field.Label>Title</Field.Label>
            <Controller
              control={control}
              name='title'
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder='Title'
                />
              )}
            />
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.description}>
            <Field.Label>Description</Field.Label>
            <Controller
              control={control}
              name='description'
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder='Description'
                />
              )}
            />
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.category}>
            <Controller
              control={control}
              name='category'
              render={({ field }) => (
                <DropDownMenu
                  placeholder='Select category'
                  field={field}
                  title='Select Category'
                  contentRef={contentRef}
                  collection={taskCategorys}
                />
              )}
            />
            <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.status}>
            <Controller
              control={control}
              name='status'
              render={({ field }) => (
                <DropDownMenu
                  placeholder='Select Status'
                  field={field}
                  title='Select Status'
                  contentRef={contentRef}
                  collection={taskStatus}
                />
              )}
            />
            <Field.ErrorText>{errors.status?.message}</Field.ErrorText>
          </Field.Root>
        </Stack>
        <Drawer.Footer mt={4}>
          <Drawer.ActionTrigger asChild>
            <Button variant='outline'>Cancel</Button>
          </Drawer.ActionTrigger>
          <Button type='submit'>{taskButton}</Button>
        </Drawer.Footer>
      </form>
    </>
  );
};

export default TaskForm;

export const taskCategorys = createListCollection({
  items: [
    { label: "All categories", value: "All" },
    { label: "Office", value: "Office" },
    { label: "Personal", value: "Personal" },
    { label: "Others", value: "Others" },
  ],
});

export const taskStatus = createListCollection({
  items: [
    { label: "All Status", value: "All" },
    { label: "Completed", value: "Completed" },
    { label: "Pending", value: "Pending" },
  ],
});
