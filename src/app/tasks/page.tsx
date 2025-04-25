
import { Text } from '@chakra-ui/react'
import React from 'react'
import TaskStats from './_components/task-stats'
import TaskList from './_components/task-list'
import TaskFilter from './_components/task-filter'

const TasksPage = () => {
  return (
   <> 
    <div className=" mb-8">
        <Text fontFamily={"heading"} textStyle={"2xl"} fontWeight={"bold"} >Manage Your Tasks</Text>
        <Text textStyle={"sm"} color={"gray.600"} mt={2} mb={4}>
          Organize, track, and complete your tasks efficiently
        </Text>
      </div>
      
      <TaskStats />
      <TaskFilter />
      <TaskList /> 
   </> 
  )
}

export default TasksPage