import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import "./Projects.css";

import MainLayout from "./MainLayout";
import PopoutComponent from "./PopoutComponent";
import ClassPageNavBar from "./ClassPageNavBar";
import "./ClassPage.css";
import "./ClassPageNavBar.css";
import "./ClassPageProjects.css";

interface User {
  name: string;
  email: string;
}

interface Project {
  projectID: string;
  ownerEmail: string;
  title: string;
  description: string;
  group: { name: string; members: string[] };
}

interface ClassPageProjectsProps {
  user: User;
  onLogout: () => void;
}

const ClassPageProjects: React.FC<ClassPageProjectsProps> = ({
  user,
  onLogout,
}) => {
  const location = useLocation();
  const subtitle = location.state.subtitle || "Class Name";

  let ID = useParams<{ classID: string }>();
  let classID: string = "";
  if (typeof ID.classID === "string") {
    classID = ID.classID;
  } else {
    classID = "";
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newProjectTitle, setNewProjectTitle] = useState<string>("");
  const [newProjectDesc, setNewProjectDesc] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setAnimate(true);
    console.log("classID: ", classID);
    if (user?.email) {
      axios
        .post("/api/getProjects", {
          classID: classID,
        })
        .then((res) => {
          setProjects(res.data);
        })
        .catch((error) => {
          console.error(`Error fetching projects: ${error.message}`);
        });
    }
  }, []);

  const handleNewProjectTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProjectTitle(e.target.value);
  };
  const handleNewProjectDescChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProjectDesc(e.target.value);
  };
  const handleNewGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(e.target.value);
  };

  const handleProjectDelete = (projectID: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      axios
        .delete("/api/deleteProject", {
          data: {
            projectID: projectID,
            email: user.email,
            classID: classID,
          },
        })
        .then((res) => {
          setProjects(
            projects.filter((project) => project.projectID !== projectID)
          );
          alert(res.data.message);
        })
        .catch((error) => {
          setErrorMessage(
            `Error deleting project: ${error.response.data.message}`
          );
          setTimeout(() => {
            setErrorMessage("");
          }, 4000);
        });
    }
  };

  const handleProjectJoin = (projectID: string) => {
    axios
      .post("/api/joinProject", {
        projectID: projectID,
        email: user.email,
        classID: classID,
      })
      .then((res) => {
        alert(res.data.message);
        setProjects((prevProjects) => {
          return prevProjects.map((project) => {
            if (project.projectID === projectID) {
              return {
                ...project,
                group: {
                  ...project.group,
                  members: [...project.group.members, user.email],
                },
              };
            }
            return project;
          });
        });
      })
      .catch((error) => {
        setErrorMessage(
          `Error joining project: ${error.response.data.message}`
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 6000);
      });
  };

  const handleProjectLeave = (projectID: string) => {
    axios
      .post("/api/leaveProject", {
        projectID: projectID,
        email: user.email,
        classID: classID,
      })
      .then((res) => {
        alert(res.data.message);
        setProjects((prevProjects) => {
          return prevProjects.map((project) => {
            if (project.projectID === projectID) {
              return {
                ...project,
                group: {
                  ...project.group,
                  members: project.group.members.filter(
                    (member) => member !== user.email
                  ),
                },
              };
            }
            return project;
          });
        });
      })
      .catch((error) => {
        setErrorMessage(
          `Error leaving project: ${error.response.data.message}`
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 6000);
      });
  };

  const handleNewProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      newProjectTitle === "" ||
      newProjectDesc === "" ||
      newGroupName === ""
    ) {
      setErrorMessage("Please fill out all fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } else {
      axios
        .post("/api/createProject", {
          classID: classID,
          email: user.email,
          title: newProjectTitle,
          description: newProjectDesc,
          groupName: newGroupName,
        })
        .then((res) => {
          setProjects([...projects, res.data.project]);
          setNewProjectTitle("");
          setNewProjectDesc("");
          setNewGroupName("");
          setErrorMessage("");
          setAnimate(false);
          alert(res.data.message);
        })
        .catch((error) => {
          setErrorMessage(
            `Error creating project: ${error.response.data.message}`
          );
          setTimeout(() => {
            setErrorMessage("");
          }, 4000);
        });
    }
  };

  const isUserNotAMember = (project: Project) => {
    if (project.group.members.includes(user.email)) {
      return false;
    }
    return true;
  };

  const isOwner = (project: Project) => {
    if (project.ownerEmail === user.email) {
      return true;
    }
    return false;
  };

  const canUserLeaveProject = (project: Project) => {
    return (
      project.group.members.includes(user.email) &&
      project.ownerEmail !== user.email
    );
  };

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <ClassPageNavBar user={user} onLogout={onLogout} />
      <PopoutComponent user={user} classID={classID} onLogout={onLogout} />
      <div className="add-project">
        <div className="add-project-text">
          Have an idea? Create a project and start a group here!
        </div>
      </div>
      <form
        className={`new-project-form ${animate ? "animate" : ""}`}
        onSubmit={handleNewProjectSubmit}
      >
        <input
          type="text"
          placeholder="New Project Title"
          value={newProjectTitle}
          onChange={handleNewProjectTitleChange}
        />
        <div className="new-project-description">
          <input
            type="text"
            placeholder="New Project Description"
            value={newProjectDesc}
            onChange={handleNewProjectDescChange}
          />
        </div>
        <div className="new-project-group-name">
          <input
            type="text"
            placeholder="New Group Name"
            value={newGroupName}
            onChange={handleNewGroupNameChange}
          />
        </div>
        <button className="new-project-button">Create New Project</button>
        {errorMessage && (
          <div className="projects-error-message">{errorMessage}</div>
        )}
      </form>
      <div className="class-page-projects">
        {Array.isArray(projects) &&
          projects.map(
            ({ projectID, title, description, group, ownerEmail }) => (
              <div className="project-card" key={projectID}>
                {isOwner({
                  projectID,
                  title,
                  description,
                  group,
                  ownerEmail,
                }) && (
                  <button
                    className="delete-project-button"
                    onClick={() => handleProjectDelete(projectID)}
                  >
                    Delete
                  </button>
                )}
                <div className="title-description">
                  <div className="project-title">{title}</div>
                  <div className="description">{description}</div>
                </div>
                <div className="group-name">{group.name}</div>
                <div className="project-members">
                  Members:{" "}
                  <span className="project-membersCount">
                    {group.members.length}
                  </span>
                </div>
                <div className="join-leave-buttons">
                  {!(user.email == ownerEmail) &&
                    isUserNotAMember({
                      projectID,
                      ownerEmail,
                      title,
                      description,
                      group,
                    }) && (
                      <button
                        className="join-project-button"
                        onClick={() => handleProjectJoin(projectID)}
                      >
                        Join
                      </button>
                    )}
                  {canUserLeaveProject({
                    projectID,
                    ownerEmail,
                    title,
                    description,
                    group,
                  }) && (
                    <button
                      className="leave-project-button"
                      onClick={() => handleProjectLeave(projectID)}
                    >
                      Leave
                    </button>
                  )}
                </div>
              </div>
            )
          )}
      </div>
    </MainLayout>
  );
};

export default ClassPageProjects;
