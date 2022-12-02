import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Input, DatePicker, Radio, Cascader } from "antd";
import { Marginer } from "../marginer/marginfile";
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

import axios from "axios";
import { HiClipboardCheck } from "react-icons/hi";
function Taches() {
  const [liste, setliste] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [edditingTache, setEdditingTache] = useState({
    tache: "",
    date_critique: "",
    date_rappel: "",
    date_audience: "",
    date_decheance: "",
    greffier: "",
    course: "",
    lieux: "",
    service: "",
    resolu: "",
  });
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
  ];
  const onChangeselect = (value) => {
    console.log(value);
  };
  const onChangedatecritique = (date, dateString) => {
    console.log(date, dateString);
    setAddinngTache({ ...addingTache, date_critique: dateString });
  };
  const onChangedateaudience = (date, dateString) => {
    console.log(date, dateString);
    setAddinngTache({ ...addingTache, date_audience: dateString });
  };
  const onChangedaterappel = (date, dateString) => {
    console.log(date, dateString);
    setAddinngTache({
      ...addingTache,
      date_rappel: dateString,
    });
  };
  const onChangedatedecheance = (date, dateString) => {
    console.log(date, dateString);
    setAddinngTache({
      ...addingTache,
      date_decheance: dateString,
    });
  };
  const onChangeradio1 = (e) => {
    console.log("radio checked", e.target.value);
    setValue1(e.target.value);
  };
  const onChangeradio2 = (e) => {
    console.log("radio checked", e.target.value);
    setValue2(e.target.value);
  };
  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  /*const StyledTable = styled((props) => <Table {...props} />)`
    && tbody > tr:hover > td {
      background: rgb(200, 182, 226,0.2);
    }
  `;*/
  const [addingTache, setAddinngTache] = useState({
    tache: "",
    date_critique: "",
    date_rappel: "",
    date_audience: "",
    date_decheance: "",
    greffier: "",
    course: "",
    lieux: "",
    services: "",
    resolu: "",
  });

  const column = [
    { key: "0", title: "id_tache", dataIndex: "id_tache" },
    { key: "1", title: "Tâche", dataIndex: "tache" },

    { key: "2", title: "Date Critique", dataIndex: "date_critique" },
    { key: "3", title: "Date Rappel", dataIndex: "date_rappel" },
    { key: "4", title: "Date_audience", dataIndex: "date_audience" },
    { key: "5", title: "Date_Déchéance", dataIndex: "date_decheance" },
    { key: "6", title: "Personne_Chargé", dataIndex: "personne_chargee" },
    { key: "7", title: "Greffier", dataIndex: "greffier" },
    { key: "8", title: "Course", dataIndex: "course" },
    { key: "9", title: "Lieux", dataIndex: "lieux" },
    { key: "10", title: "service", dataIndex: "services" },
    { key: "11", title: "Résolu", dataIndex: "resolu" },
    { key: "12", title: "id_dossier", dataIndex: "id_doss" },
    {
      key: "13",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deleteTache(record);
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

  //select collaborateur
  const getTacherequest = async () => {
    try {
      const response = await axios.get("/tache", {
        withCredentials: true,
      });

      if (response.data.error) {
        console.log("non connecté");
      } else {
        console.log(response);
        setliste(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //supprimer collaborateur
  const deleteTache = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer cette  tâche?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newliste = liste.filter(
          (tache) => tache.id_tache !== record.id_tache
        );
        setliste(newliste);
        deleteTacherequest(record.id_tache);
      },
    });
  };
  const deleteTacherequest = async (id_tache) => {
    try {
      const deleted = await axios.post("/tacheeff", {
        id_tache: id_tache,
      });

      if (deleted.data.error) {
        toast.error(deleted.data.error);
      } else {
        console.log("tache supprimé");
        toast.success("Tâche supprimée avec succès");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un collaborateur

  const editTache = (record) => {
    setIsEdit(true);
    setEdditingTache({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingTache(null);
  };
  //ajouter un collaborateur
  const addTache = async () => {
    try {
      const resp = await axios.post("/tacheadd", addingTache);
      if (resp.data.error) {
        toast.error(resp.data.error);
      } else {
        console.log(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTacherequest();
  }, [liste]);

  //**********************lieu et service**********************
  const [disabledtrib, setDisabledtrib] = useState(false);
  const [disabledservice, setDisabledservice] = useState(false);
  const [listeTrib, setListeTrib] = useState([]);
  const [listeTrib1, setListeTrib1] = useState([]);
  const [listeservice, setListeservice] = useState([]);
  const [listeserviceinput, setListeserviceinput] = useState([]);
  const [listeser, setListeser] = useState([]);
  const [valuetrib, setValuetrib] = useState("");
  const [valueservice, setValueservice] = useState("");
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setValuetrib(selectedOptions[0].label);
    const newlisteser = listeser.filter(
      (ser) =>
        ser.value.substring(0, ser.value.indexOf(":")) ==
        selectedOptions[0].value
    );
    console.log(newlisteser, "hello");
    setListeserviceinput(newlisteser);

    setAddinngTache({ ...addingTache, lieux: selectedOptions[0].label });
    setDisabledtrib(true);
    console.log(listeserviceinput, "ena liste service jdida");
  };

  const onChangeservice = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setValueservice(selectedOptions[0].label);
    setAddinngTache({ ...addingTache, services: selectedOptions[0].label });
    setDisabledservice(true);
  };

  const gettribunalerequest = async () => {
    try {
      const response = await axios.get("/tribunale");
      //console.log(response.data);

      setListeTrib(response.data);
      const newliste1 = listeTrib.map((trib) => ({
        value: trib.id,
        label: trib.lieu,
      }));
      setListeTrib1(newliste1);

      // console.log("hellolistetrib", listeTrib);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getservicerequest = async () => {
    try {
      const response = await axios.get("/service");
      setListeservice(response.data);
      const newliste = listeservice.map((ser) => ({
        value: ser.tribunale_id + ":" + ser.service_id,
        label: ser.nom,
      }));
      setListeser(newliste);
    } catch (error) {
      console.log(error.message);
    }
  };
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  useEffect(() => {
    gettribunalerequest();
  }, [listeTrib]);
  useEffect(() => {
    getservicerequest();
  }, [listeservice]);

  useEffect(() => {
    const id = localStorage.getItem("id_dossier");
    setAddinngTache({ ...addingTache, id_doss: id });
  }, [addingTache.id_doss]);

  //notre page et son contenu
  return (
    <div className="back">
      <header className="App-header">
        <h1
          style={{
            fontSize: "1.3rem",
            color: "#0583f2",
          }}
        >
          Tâche(s)
        </h1>
        <HiClipboardCheck className="addclientdem"></HiClipboardCheck>
        <button
          className="btnadd"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          Ajouter
        </button>

        <Table
          columns={column}
          dataSource={liste}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          size="middle"
          bordered={true}
          scroll={{ x: "max-content" }}
        ></Table>

        <Modal
          title="modifier tâche"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onRequestClose={() => {
            setIsEdit(false);
          }}
          onOk={async () => {
            setIsEdit(false);

            const newliste = liste.map((tache) => {
              if (tache.id_tache == edditingTache.id_tache) {
                return edditingTache;
              } else {
                return tache;
              }
            });
            try {
              const resp = await axios.post("/tache/update", edditingTache);
            } catch (error) {
              console.log(error);
            }

            setliste(newliste);

            resetEditing();

            toast.success("  Tâche modifiée avec succès");
          }}
        >
          <div className="formaddtache">
            <label>Tâche:</label>
            <Input
              type="text"
              placeholder="nom de la tâche"
              value={edditingTache?.tache}
              onChange={(e) => {
                setEdditingTache({
                  ...edditingTache,
                  tache: e.target.value,
                });
              }}
            ></Input>
            <label>Date Critique:</label>
            <DatePicker
              value={edditingTache?.date_critique}
              onChange={(e) => {
                setEdditingTache({
                  ...edditingTache,
                  date_critique: e.target.value,
                });
              }}
              placeholder="date critique"
            />
            <label>Date Rappel:</label>
            <DatePicker
              value={edditingTache?.date_rappel}
              onChange={(e) => {
                setEdditingTache({
                  ...edditingTache,
                  date_rappel: e.target.value,
                });
              }}
              placeholder="date rappel"
            />
            <label>Date d'audience:</label>
            <DatePicker
              value={edditingTache?.date_audience}
              onChange={(e) => {
                setEdditingTache({
                  ...edditingTache,
                  date_audience: e.target.value,
                });
              }}
              placeholder="date d'audience"
            />
            <label>Résolu:</label>
            <div className="radioet">
              <Radio.Group
                onChange={(e) => {
                  setEdditingTache({
                    ...edditingTache,
                    resolu: e.target.value,
                  });
                }}
                value={value}
              >
                <Radio value={1}>Oui</Radio>
                <Radio value={2}>Non</Radio>
              </Radio.Group>
            </div>
            <label>Personne Chargée:</label>
            <div className="radioet">
              <Radio.Group onChange={onChangeradio} value={value}>
                <Radio value={1}>Collaborateur</Radio>
                <Radio value={2}>Greffier</Radio>
              </Radio.Group>
            </div>
            <label>Greffier:</label>
            <Cascader
              options={options}
              onChange={onChangeselect}
              placeholder="selectionner greffier"
            />
            <label>Course:</label>
            <div className="radioet">
              <Radio.Group onChange={onChangeradio} value={value}>
                <Radio value={3}>Oui</Radio>
                <Radio value={4}>Non</Radio>
              </Radio.Group>
            </div>
            <label>Lieux:</label>
            <Cascader
              options={options}
              onChange={onChangeselect}
              placeholder="selectionner lieu"
            />
            <label>service:</label>
            <Cascader
              options={options}
              onChange={onChangeselect}
              placeholder="selectionner service"
            />

            <label>Date de Déchéance:</label>
            <DatePicker
              onChange={onChangedatedecheance}
              placeholder="date de déchéance"
            />
          </div>
        </Modal>
        <Modal
          title="ajouter tâche"
          visible={isAdd}
          okText="Enregistrer"
          destroyOnClose={true}
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
            setAddinngTache({
              tache: "",
              date_critique: "",
              date_rappel: "",
              date_audience: "",
              date_decheance: "",
              greffier: "",
              course: "",
              lieux: "",
              service: "",
              resolu: "",
            });
            setDisabledtrib(false);
            setDisabledservice(false);
            setValuetrib("");
            setValueservice("");
          }}
          onOk={() => {
            addTache();
            setIsAdd(false);
            toast.success(" tâche ajoutée avec succès");
            setAddinngTache({
              tache: "",
              date_critique: "",
              date_rappel: "",
              date_audience: "",
              date_decheance: "",
              greffier: "",
              course: "",
              lieux: "",
              service: "",
              resolu: "",
            });
            setDisabledtrib(false);
            setDisabledservice(false);
            setValuetrib("");
            setValueservice("");
          }}
        >
          <div className="formaddtache">
            <label>Tâche:</label>
            <Input
              type="text"
              placeholder="nom de la tâche"
              onChange={(e) => {
                setAddinngTache({
                  ...addingTache,
                  tache: e.target.value,
                });
              }}
            ></Input>
            <label>Date Critique:</label>
            <DatePicker
              onChange={onChangedatecritique}
              placeholder="date critique"
            />
            <label>Date Rappel:</label>
            <DatePicker
              onChange={onChangedaterappel}
              placeholder="date rappel"
            />
            <label>Date d'audience:</label>
            <DatePicker
              onChange={onChangedateaudience}
              placeholder="date d'audience"
            />
            <label>Résolu:</label>
            <div className="radioet">
              <Radio.Group onChange={onChangeradio1} value={value1}>
                <Radio
                  value={1}
                  onChange={(e) => {
                    setAddinngTache({ ...addingTache, resolu: "Oui" });
                  }}
                >
                  Oui
                </Radio>
                <Radio
                  value={2}
                  onChange={(e) => {
                    setAddinngTache({ ...addingTache, resolu: "Non" });
                  }}
                >
                  Non
                </Radio>
              </Radio.Group>
            </div>
            <label>Personne Chargée:</label>
            <div className="radioet">
              <Radio.Group onChange={onChangeradio2} value={value2}>
                <Radio
                  value={1}
                  onChange={(e) => {
                    setAddinngTache({
                      ...addingTache,
                      personne_chargee: "Collaborateur",
                    });
                  }}
                >
                  Collaborateur
                </Radio>
                <Radio
                  value={2}
                  onChange={(e) => {
                    setAddinngTache({
                      ...addingTache,
                      personne_chargee: "Greffier",
                    });
                  }}
                >
                  Greffier
                </Radio>
              </Radio.Group>
            </div>
            <label>Greffier:</label>
            <Cascader
              disabled={true}
              options={options}
              onChange={onChangeselect}
              placeholder="selectionner greffier"
            />
            <label>Course:</label>
            <div className="radioet">
              <Radio.Group onChange={onChangeradio} value={value}>
                <Radio
                  value={1}
                  onChange={(e) => {
                    setAddinngTache({
                      ...addingTache,
                      course: "Oui",
                    });
                  }}
                >
                  Oui
                </Radio>
                <Radio
                  value={2}
                  onChange={(e) => {
                    setAddinngTache({
                      ...addingTache,
                      course: "Non",
                    });
                  }}
                >
                  Non
                </Radio>
              </Radio.Group>
            </div>
            <label>Lieu:</label>
            <Cascader
              disabled={disabledtrib}
              id="cascadertrib"
              className="cascader1"
              options={listeTrib1}
              placeholder="Chercher lieu"
              onChange={onChange}
              showSearch={{
                filter,
              }}
              onSearch={(value) => console.log(value)}
              value={valuetrib}
            />
            <label>service:</label>
            <Cascader
              id="cascaderservice"
              disabled={disabledservice}
              className="cascader1"
              options={listeserviceinput}
              onChange={onChangeservice}
              showSearch={{
                filter,
              }}
              onSearch={(value) => console.log(value)}
              value={valueservice}
            />
            <label> Choisir un autre lieu et service :</label>
            <Button
              type="primary"
              style={{ width: 300 }}
              onClick={() => {
                setDisabledtrib(false);
                setDisabledservice(false);
                setValuetrib("");
                setValueservice("");
              }}
            >
              resélectionner les données du lieu
            </Button>

            <label>Date D 'échéance:</label>
            <DatePicker
              onChange={onChangedatedecheance}
              placeholder="date D'échéance"
            />
          </div>
        </Modal>
      </header>
    </div>
  );
}

export default Taches;
