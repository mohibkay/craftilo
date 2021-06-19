import { useState, useEffect } from "react";
import { firebase } from "../lib/firebase";
import { collatedTasksExist } from "../helpers";
import { format, formatDistanceToNowStrict } from "date-fns";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "Xlff7deIcRUcMOCnb8pLEg8QkTU2");

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
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        ...task.data(),
        docId: task.id,
      }));

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter((task) => {
              if (task.date) {
                console.log(task.date);
                const [diff] = formatDistanceToNowStrict(
                  new Date(task.date)
                ).split(" ", 1);
                return diff <= 7 && task.archived !== true;
              }
            })
          : newTasks.filter((task) => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "Xlff7deIcRUcMOCnb8pLEg8QkTU2")
      .orderBy("projectId")
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
