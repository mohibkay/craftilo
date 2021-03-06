// @ts-nocheck @TODO fix type error
import { useState, useEffect } from "react";
import { firebase } from "../lib/firebase";
import { collatedTasksExist } from "../helpers";
import { format, formatDistanceToNowStrict, isFuture } from "date-fns";
import { isEqual } from "lodash/lang";
import { useAuth } from "../context/authContext";

export interface TaskInterface {
  archived: boolean;
  data: string;
  docId: string;
  projectId: string;
  task: string;
  userId: string;
}

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState<TaskInterface[] | null>(null);
  const [archivedTasks, setArchivedTasks] = useState<TaskInterface[] | null>(
    null
  );

  const {
    currentUser: { uid: userId },
  } = useAuth();

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", userId)
      .orderBy("createdAt");

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            format(new Date(), "yyyy, M, dd")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("projectId", "==", "INBOX"))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        ...task.data(),
        docId: task.id,
      }));

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter((task) => {
              if (task.date && isFuture(new Date(task.date))) {
                const taskDate = new Date(task.date);

                const [diff] = formatDistanceToNowStrict(taskDate, {
                  unit: "day",
                }).split(" ", 1);

                return diff <= 7 && task.archived !== true;
              }
              return null;
            })
          : newTasks.filter((task) => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject, userId]);

  return { tasks, archivedTasks };
};

export interface ProjectInterface {
  docId: string;
  name: string;
  projectId: string;
  userId: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectInterface[] | null>(null);
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  console.log("projects");
  console.log(projects);

  useEffect(() => {
    userId &&
      firebase
        .firestore()
        .collection("projects")
        .where("userId", "==", userId)
        .orderBy("createdAt")
        .get()
        .then((snapshot) => {
          const allProjects = snapshot.docs.map((project) => ({
            docId: project.id,
            ...project.data(),
          }));

          if (!isEqual(allProjects, projects)) {
            setProjects(allProjects);
          }
        });
  }, [projects, userId]);

  return { projects, setProjects };
};
