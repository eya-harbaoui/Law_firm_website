import {
  Radio,
  Space,
  Tabs,
  Modal,
  Table,
  Input,
  Checkbox,
  Col,
  Row,
  Button,
  Drawer,
  Popover,
} from "antd";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { AiFillBank } from "react-icons/ai";
import Tableau from "./service";
import "./trib.css";
import { GoDiffAdded } from "react-icons/go";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { MdHomeRepairService } from "react-icons/md";
import Example from "../Example";
const { TabPane } = Tabs;

const Tribunale = () => {
  const [service, setService] = useState(false);
  const [idtrib, setIdtrib] = useState(0);
  const [listeTrib, setListeTrib] = useState([]);
  const [nomtrib, setNomtrib] = useState("");
  const [filtredservice, setFiltredservice] = useState([]);
  const [isEdittrib, setIsEdittrib] = useState(false);
  const [edditingtrib, setEdditingtrib] = useState({ lieu: "" });
  const [isAddtrib, setIsAddtrib] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [pageSize1, setPageSize1] = useState(5);
  const [disabled, setDisabled] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });
  const [disabled2, setDisabled2] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });

  const [addingtrib, setAddingtrib] = useState({
    lieu: "",
  });

  //**********select tribunale********************
  const gettribunalerequest = async () => {
    try {
      const response = await axios.get("/tribunale");
      console.log(response.data);

      setListeTrib(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  //*****************supprimer tribunale*****************
  const deletetrib = (id) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer cette tribunale?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",

      onOk: () => {
        const newListe = listeTrib.filter((trib) => trib.id !== id);
        setListeTrib(newListe);
        deletetribrequest(id);
        toast.success("tribunale supprimée avec succès");
      },
    });
  };
  const deletetribrequest = async (id) => {
    try {
      const deleted = await axios.post("/deleteTribunale", {
        id: id,
      });
      console.log("tribunale supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //*************************modifier tribunale**************
  const edittrib = (id, lieu) => {
    setIsEdittrib(true);
    setEdditingtrib({ id: id, lieu: lieu }); //copie mel record
  };
  const resetEditingtrib = () => {
    setIsEdittrib(false);
    setEdditingtrib(null);
  };
  //*****************ajouter tribunale******************
  const addtrib = async () => {
    try {
      const resp = await axios.post("/ajouterTribunale", addingtrib);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const [listeservice, setListeservice] = useState([]);
  const [isEditservice, setIsEditservice] = useState(false);
  const [edditingservice, setEdditingservice] = useState({
    nom: "",
    lundi: "",
    mardi: "",
    mercredi: "",
    jeudi: "",
    vendredi: "",
    samedi: "",
  });
  const [disabled3, setDisabled3] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });
  const [disabled4, setDisabled4] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });

  const [checked3, setChecked3] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });
  const [checked4, setChecked4] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });
  const [isAddservice, setIsAddservice] = useState(false);
  const [addingservice, setAddingservice] = useState({
    nom: "",
    lundi: "",
    mardi: "",
    mercredi: "",
    jeudi: "",
    vendredi: "",
    samedi: "",
    tribunale_id: idtrib,
  });
  const column = [
    { key: "1", title: "ID", dataIndex: "service_id" },
    { key: "2", title: "nom", dataIndex: "nom" },
    { key: "3", title: "lundi", dataIndex: "lundi" },
    { key: "4", title: "mardi", dataIndex: "mardi" },
    { key: "5", title: "mercredi", dataIndex: "mercredi" },
    { key: "6", title: "jeudi", dataIndex: "jeudi" },
    { key: "7", title: "vendredi", dataIndex: "vendredi" },
    { key: "8", title: "samedi", dataIndex: "samedi" },

    {
      key: "9",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editservice(record);
                }}
              ></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deleteservice(record);
                }}
              ></MdDeleteForever>
              <pre>
                <p>supprimer</p>
              </pre>
            </div>
          </div>
        );
      },
    },
  ];
  const column1 = [
    { key: "1", title: "ID", dataIndex: "id" },
    { key: "2", title: "lieu", dataIndex: "lieu" },

    {
      key: "3",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  edittrib(record.id, record.lieu);
                }}
              ></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deletetrib(record.id);
                }}
              ></MdDeleteForever>
              <pre>
                <p>supprimer </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdHomeRepairService
                className="servicetrib"
                onClick={() => {
                  setService(true);
                  setAddingservice({
                    ...addingservice,
                    tribunale_id: record.id,
                  });

                  setIdtrib(record.id);
                  setNomtrib(record.lieu);

                  //console.log(filtredservice, "filtred");
                }}
              ></MdHomeRepairService>
              <pre>
                <p>services</p>
              </pre>
            </div>
          </div>
        );
      },
    },
  ];

  //***********************select service***********
  const getservicerequest = async () => {
    try {
      const response = await axios.get("/service");
      setListeservice(response.data);
      console.log(listeservice, "listeservice");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    gettribunalerequest();
    getservicerequest();
    console.log(edditingservice, "kbal ma netcheki");
    console.log(addingservice.tribunale_id, "idtrib");
  });

  //*****************supprimer service*****************
  const deleteservice = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce service?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newListe = listeservice.filter(
          (service) => service.service_id !== record.service_id
        );
        setListeservice(newListe);
        deleteservicerequest(record.service_id);
        toast.success("service supprimé avec succès");
      },
    });
  };
  const deleteservicerequest = async (id) => {
    try {
      const deleted = await axios.post("/serviceeff", {
        id: id,
      });
      console.log("service supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //*************************modifier un service**************
  const editservice = (record) => {
    setEdditingservice({ ...record });
    setEdditingservice({
      ...edditingservice,
      tribunale_id: idtrib,
      service_id: record.service_id,
      nom: record.nom,
    });
    setChecked3({
      check1: record.lundi == "audience" ? true : false,
      check2: record.mardi == "audience" ? true : false,
      check3: record.mercredi == "audience" ? true : false,
      check4: record.jeudi == "audience" ? true : false,
      check5: record.vendredi == "audience" ? true : false,
      check6: record.samedi == "audience" ? true : false,
    });
    setChecked4({
      check1: record.lundi == "course" ? true : false,
      check2: record.mardi == "course" ? true : false,
      check3: record.mercredi == "course" ? true : false,
      check4: record.jeudi == "course" ? true : false,
      check5: record.vendredi == "course" ? true : false,
      check6: record.samedi == "course" ? true : false,
    });
    setDisabled3({
      check1: record.lundi == "course" ? true : false,
      check2: record.mardi == "course" ? true : false,
      check3: record.mercredi == "course" ? true : false,
      check4: record.jeudi == "course" ? true : false,
      check5: record.vendredi == "course" ? true : false,
      check6: record.samedi == "course" ? true : false,
    });
    setDisabled4({
      check1: record.lundi == "audience" ? true : false,
      check2: record.mardi == "audience" ? true : false,
      check3: record.mercredi == "audience" ? true : false,
      check4: record.jeudi == "audience" ? true : false,
      check5: record.vendredi == "audience" ? true : false,
      check6: record.samedi == "audience" ? true : false,
    });
    console.log(edditingservice, "kbal ma netcheki");
    setIsEditservice(true);
    console.log(checked3, checked4, "hani netcheki");

    //copie mel record
  };
  const resetEditing = () => {
    setIsEditservice(false);
    setEdditingservice({
      nom: "",
      lundi: "",
      mardi: "",
      mercredi: "",
      jeudi: "",
      vendredi: "",
      samedi: "",
    });
  };
  //*****************ajouter service******************
  const addservice = async () => {
    try {
      const resp = await axios.post("/serviceadd", addingservice);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  /***************tabposition */
  const [tabPosition, setTabPosition] = useState("left");

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  return (
    <>
      <div className="back">
        <header className="App-header">
          {service === false && (
            <>
              <h1>Liste des Tribunaux</h1>
              <AiFillBank className="dashbicons"></AiFillBank>
              <button
                className="btnadd"
                onClick={() => {
                  setIsAddtrib(true);
                }}
              >
                Ajouter une tribunale
              </button>
              <Table
                dataSource={listeTrib}
                columns={column1}
                bordered={true}
                size="large"
                pagination={{
                  current: page,
                  pageSize: pageSize1,
                  onChange: (page, pageSize) => {
                    setPage(page);
                    setPageSize1(pageSize);
                  },
                }}
                scroll={{ x: "max-content" }}
              ></Table>
            </>
          )}
          {service === true && (
            <>
              <h1>Liste des services</h1>
              <h3 style={{ color: "#0583f2" }}>{nomtrib}</h3>
              <h3 style={{ color: "#0583f2" }}>{idtrib}</h3>
              <MdHomeRepairService className="dashbicons"></MdHomeRepairService>

              <button
                className="btnadd"
                onClick={() => {
                  setIsAddservice(true);
                }}
              >
                Ajouter un service
              </button>

              <Table
                dataSource={listeservice.filter(
                  (service) => service.tribunale_id == idtrib
                )}
                columns={column}
                bordered={true}
                pagination={{
                  current: page,
                  pageSize: pageSize,
                  onChange: (page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize);
                  },
                }}
                scroll={{ x: "max-content" }}
              ></Table>
              <Popover
                placement="bottom"
                content={
                  <h1 style={{ fontSize: "15px", color: "#f25e5e" }}>
                    Rendez-vous à la liste des tribunaux ,choisir une autre
                    tribunale et sélectionnez ses services
                  </h1>
                }
              >
                <button
                  className="buttonvalidate"
                  onClick={() => {
                    setService(false);
                  }}
                >
                  Liste des tribunaux
                </button>
              </Popover>
            </>
          )}
          <Modal
            title="modifier service"
            visible={isEditservice}
            okText="Enregistrer"
            cancelText="Annuler"
            destroyOnClose={true}
            onCancel={() => {
              setIsEditservice(false);
              resetEditing();
            }}
            onOk={async () => {
              setIsEditservice(false);
              const newListeservice = listeservice.map((service) => {
                if (service.service_id == edditingservice.service_id) {
                  return edditingservice;
                } else {
                  return service;
                }
              });
              try {
                const addservice = await axios.post(
                  "/updateservice",
                  edditingservice
                );
                console.log("raniupdated", edditingservice);
              } catch (error) {
                console.log("error");
              }

              setListeservice(newListeservice);
              resetEditing();
              toast.success("service modifié avec succès");
            }}
          >
            <Input
              placeholder="Tapez le nom"
              value={edditingservice?.nom}
              onChange={(e) => {
                setEdditingservice({
                  ...edditingservice,
                  nom: e.target.value,
                });
              }}
            ></Input>

            <div className="audcourse">
              <div className="jours">
                <h1 style={{ fontSize: "15px" }}>Jours de l'audience</h1>

                <Row>
                  <Col span={6}>
                    <Checkbox
                      disabled={disabled3.check1}
                      checked={checked3.check1}
                      value="lundi"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            lundi: "audience",
                          });
                          setChecked3({ ...checked3, check1: true });
                          setDisabled4({ ...disabled4, check1: true });
                        } else {
                          setChecked3({ ...checked3, check1: false });
                          setDisabled4({ ...disabled4, check1: false });
                        }
                      }}
                    >
                      Lundi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      disabled={disabled3.check2}
                      checked={checked3.check2}
                      value="mardi"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            mardi: "audience",
                          });
                          setChecked3({ ...checked3, check2: true });
                          setDisabled4({ ...disabled4, check2: true });
                        } else {
                          setChecked3({ ...checked3, check2: false });
                          setDisabled4({ ...disabled4, check2: false });
                        }
                      }}
                    >
                      Mardi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      disabled={disabled3.check3}
                      checked={checked3.check3}
                      value="mercredi"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            mercredi: "audience",
                          });
                          setChecked3({ ...checked3, check3: true });
                          setDisabled4({ ...disabled4, check3: true });
                        } else {
                          setChecked3({ ...checked3, check3: false });
                          setDisabled4({ ...disabled4, check3: false });
                        }
                      }}
                    >
                      Mercredi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      disabled={disabled3.check4}
                      checked={checked3.check4}
                      value="jeudi"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            jeudi: "audience",
                          });
                          setChecked3({ ...checked3, check4: true });
                          setDisabled4({ ...disabled4, check4: true });
                        } else {
                          setChecked3({ ...checked3, check4: false });
                          setDisabled4({ ...disabled4, check4: false });
                        }
                      }}
                    >
                      Jeudi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      disabled={disabled3.check5}
                      checked={checked3.check5}
                      value="vendredi"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            vendredi: "audience",
                          });
                          setChecked3({ ...checked3, check5: true });
                          setDisabled4({ ...disabled4, check5: true });
                        } else {
                          setChecked3({ ...checked3, check5: false });
                          setDisabled4({ ...disabled4, check5: false });
                        }
                      }}
                    >
                      Vendredi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      disabled={disabled3.check6}
                      checked={checked3.check6}
                      value="samedi"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            samedi: "audience",
                          });
                          setChecked3({ ...checked3, check6: true });
                          setDisabled4({ ...disabled4, check6: true });
                        } else {
                          setChecked3({ ...checked3, check6: false });
                          setDisabled4({ ...disabled4, check6: false });
                        }
                      }}
                    >
                      Samedi
                    </Checkbox>
                  </Col>
                </Row>
              </div>
              <div className="jours">
                <h1 style={{ fontSize: "15px" }}>Jours de course</h1>

                <Row>
                  <Col span={6}>
                    <Checkbox
                      value="lundi"
                      disabled={disabled4.check1}
                      checked={checked4.check1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            lundi: "course",
                          });
                          setChecked4({ ...checked4, check1: true });
                          setDisabled3({ ...disabled3, check1: true });
                        } else {
                          setChecked4({ ...checked4, check1: false });
                          setDisabled3({ ...disabled3, check1: false });
                        }
                      }}
                    >
                      Lundi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      value="mardi"
                      disabled={disabled4.check2}
                      checked={checked4.check2}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            mardi: "course",
                          });
                          setChecked4({ ...checked4, check2: true });
                          setDisabled3({ ...disabled3, check2: true });
                        } else {
                          setChecked4({ ...checked4, check2: false });
                          setDisabled3({ ...disabled3, check2: false });
                        }
                      }}
                    >
                      Mardi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      value="mercredi"
                      disabled={disabled4.check3}
                      checked={checked4.check3}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            mercredi: "course",
                          });
                          setChecked4({ ...checked4, check3: true });
                          setDisabled3({ ...disabled3, check3: true });
                        } else {
                          setChecked4({ ...checked4, check3: false });
                          setDisabled3({ ...disabled3, check3: false });
                        }
                      }}
                    >
                      Mercredi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      disabled={disabled4.check4}
                      checked={checked4.check4}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            jeudi: "course",
                          });
                          setChecked4({ ...checked4, check4: true });
                          setDisabled3({ ...disabled3, check4: true });
                        } else {
                          setChecked4({ ...checked4, check4: false });
                          setDisabled3({ ...disabled3, check4: false });
                        }
                      }}
                    >
                      Jeudi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      disabled={disabled4.check5}
                      checked={checked4.check5}
                      value="vendredi"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            vendredi: "course",
                          });
                          setChecked4({ ...checked4, check5: true });
                          setDisabled3({ ...disabled3, check5: true });
                        } else {
                          setChecked4({ ...checked4, check5: false });
                          setDisabled3({ ...disabled3, check5: false });
                        }
                      }}
                    >
                      Vendredi
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      value="samedi"
                      disabled={disabled4.check6}
                      checked={checked4.check6}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEdditingservice({
                            ...edditingservice,
                            samedi: "course",
                          });
                          setChecked4({ ...checked4, check6: true });
                          setDisabled3({ ...disabled3, check6: true });
                        } else {
                          setChecked4({ ...checked4, check6: false });
                          setDisabled3({ ...disabled3, check6: false });
                        }
                      }}
                    >
                      Samedi
                    </Checkbox>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="resetbutton">
              <Button 
                danger
                dashed
                onClick={() => {
                  setChecked3({
                    check1: false,
                    check2: false,
                    check3: false,
                    check4: false,
                    check5: false,
                    check6: false,
                  });
                  setChecked4({
                    check1: false,
                    check2: false,
                    check3: false,
                    check4: false,
                    check5: false,
                    check6: false,
                  });
                  setDisabled3({
                    check1: false,
                    check2: false,
                    check3: false,
                    check4: false,
                    check5: false,
                    check6: false,
                  });
                  setDisabled4({
                    check1: false,
                    check2: false,
                    check3: false,
                    check4: false,
                    check5: false,
                    check6: false,
                  });
                }}
              >
                {" "}
                Réinitialiser puis modifier!!!
              </Button>
            </div>
          </Modal>
          <Modal
            title="ajouter un service"
            visible={isAddservice}
            okText="Enregistrer"
            cancelText="Annuler"
            destroyOnClose={true}
            onCancel={() => {
              setIsAddservice(false);
              setAddingservice({
                nom: "",
                lundi: "",
                mardi: "",
                mercredi: "",
                jeudi: "",
                vendredi: "",
                samedi: "",
              });
              setDisabled(false, false, false, false, false, false);
              setDisabled2(false, false, false, false, false, false);
            }}
            onOk={() => {
              addservice();
              setIsAddservice(false);
              toast.success("service ajouté avec succès");
              setAddingservice({
                ...addingservice,
                nom: "",
                lundi: "",
                mardi: "",
                mercredi: "",
                jeudi: "",
                vendredi: "",
                samedi: "",
              });
              console.log(addingservice, "baed el ok");
              setDisabled(false, false, false, false, false, false);
              setDisabled2(false, false, false, false, false, false);
            }}
          >
            <Input
              placeholder="tapez le nom du service"
              value={addingservice.nom}
              onChange={(e) => {
                setAddingservice({
                  ...addingservice,
                  nom: e.target.value,
                });
              }}
            ></Input>
            <div className="audcourse">
              <div className="jours">
                <h1 style={{ fontSize: "15px" }}>Jours de l'audience</h1>
                <Checkbox.Group onChange={onChange}>
                  <Row>
                    <Col span={6}>
                      <Checkbox
                        disabled={disabled2.check1}
                        value="lundi"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              lundi: "audience",
                            });
                            setDisabled({ ...disabled, check1: true });
                          } else {
                            setDisabled({ ...disabled, check1: false });
                          }
                        }}
                      >
                        Lundi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        disabled={disabled2.check2}
                        value="mardi"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              mardi: "audience",
                            });

                            setDisabled({ ...disabled, check2: true });
                          } else {
                            setDisabled({ ...disabled, check2: false });
                          }
                        }}
                      >
                        Mardi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        disabled={disabled2.check3}
                        value="mercredi"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              mercredi: "audience",
                            });

                            setDisabled({ ...disabled, check3: true });
                          } else {
                            setDisabled({ ...disabled, check3: false });
                          }
                        }}
                      >
                        Mercredi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        disabled={disabled2.check4}
                        value="jeudi"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              jeudi: "audience",
                            });
                            setDisabled({ ...disabled, check4: true });
                          } else {
                            setDisabled({ ...disabled, check4: false });
                          }
                        }}
                      >
                        Jeudi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        disabled={disabled2.check5}
                        value="vendredi"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              vendredi: "audience",
                            });
                            setDisabled({ ...disabled, check5: true });
                          } else {
                            setDisabled({ ...disabled, check5: false });
                          }
                        }}
                      >
                        Vendredi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        disabled={disabled2.check6}
                        value="samedi"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              samedi: "audience",
                            });
                            setDisabled({ ...disabled, check6: true });
                          } else {
                            setDisabled({ ...disabled, check6: false });
                          }
                        }}
                      >
                        Samedi
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
              <div className="jours">
                <h1 style={{ fontSize: "15px" }}>Jours de course</h1>

                <Checkbox.Group onChange={onChange}>
                  <Row>
                    <Col span={6}>
                      <Checkbox
                        value="lundi"
                        disabled={disabled.check1}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              lundi: "course",
                            });

                            setDisabled2({
                              ...disabled2,
                              check1: true,
                            });
                          } else {
                            setDisabled2({
                              ...disabled2,
                              check1: false,
                            });
                          }
                        }}
                      >
                        Lundi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        value="mardi"
                        disabled={disabled.check2}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              mardi: "course",
                            });

                            setDisabled2({
                              ...disabled2,
                              check2: true,
                            });
                          } else {
                            setDisabled2({
                              ...disabled2,
                              check2: false,
                            });
                          }
                        }}
                      >
                        Mardi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        value="mercredi"
                        disabled={disabled.check3}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              mercredi: "course",
                            });

                            setDisabled2({
                              ...disabled2,
                              check3: true,
                            });
                          } else {
                            setDisabled2({
                              ...disabled2,
                              check3: false,
                            });
                          }
                        }}
                      >
                        Mercredi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        value="jeudi"
                        disabled={disabled.check4}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              jeudi: "course",
                            });

                            setDisabled2({
                              ...disabled2,
                              check4: true,
                            });
                          } else {
                            setDisabled2({
                              ...disabled2,
                              check4: false,
                            });
                          }
                        }}
                      >
                        Jeudi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        value="vendredi"
                        disabled={disabled.check5}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              vendredi: "course",
                            });

                            setDisabled2({
                              ...disabled2,
                              check5: true,
                            });
                          } else {
                            setDisabled2({
                              ...disabled2,
                              check5: false,
                            });
                          }
                        }}
                      >
                        Vendredi
                      </Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox
                        value="samedi"
                        disabled={disabled.check6}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddingservice({
                              ...addingservice,
                              samedi: "course",
                            });

                            setDisabled2({
                              ...disabled2,
                              check6: true,
                            });
                          } else {
                            setDisabled2({
                              ...disabled2,
                              check6: false,
                            });
                          }
                        }}
                      >
                        Samedi
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </div>
          </Modal>
          <Modal
            title="modifier tribunale"
            visible={isEdittrib}
            okText="Enregistrer"
            destroyOnClose={true}
            cancelText="Annuler"
            onCancel={() => {
              setIsEdittrib(false);
            }}
            onOk={async () => {
              setIsEdittrib(false);
              const newListe = listeTrib.map((trib) => {
                if (trib.id == edditingtrib.id) {
                  return edditingtrib;
                } else {
                  return trib;
                }
              });
              try {
                const modiftrib = await axios.post(
                  "/modifierTribunale",
                  edditingtrib
                );
              } catch (error) {
                console.log("error");
              }

              setListeTrib(newListe);
              resetEditingtrib();
              toast.success("Tribunale modifiée avec succès");
            }}
          >
            <Input
              placeholder="Tapez le lieu"
              value={edditingtrib?.lieu}
              onChange={(e) => {
                setEdditingtrib({
                  ...edditingtrib,
                  lieu: e.target.value,
                });
              }}
            ></Input>
          </Modal>

          <Modal
            title="ajouter une tribunale"
            visible={isAddtrib}
            okText="Enregistrer"
            cancelText="Annuler"
            destroyOnClose={true}
            onCancel={() => {
              setIsAddtrib(false);
              setAddingtrib({ lieu: "" });
            }}
            onOk={() => {
              addtrib();
              setIsAddtrib(false);
              toast.success("tribunale ajoutée avec succès");
              setAddingtrib({ lieu: "" });
            }}
          >
            <Input
              placeholder="tapez le lieu du tribunale"
              value={addingtrib.lieu}
              onChange={(e) => {
                setAddingtrib({
                  lieu: e.target.value,
                });
              }}
            ></Input>
          </Modal>
        </header>
      </div>
    </>
  );
};

export default Tribunale;
