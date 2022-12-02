import React from "react";
import axios from "axios";

import "../../App.css";

import {useState, useEffect} from "react";
import {
  Table,
  Modal,
  Input,
  Button,
  Space,
  DatePicker,
  Radio,
  Cascader,
} from "antd";
import {FolderIcon} from "@heroicons/react/outline";
import "../../App.css";
import {GrDocumentTransfer} from "react-icons/gr";
import {BsFolderSymlink} from "react-icons/bs";
import "antd/dist/antd.min.css";
import {AiFillEdit} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";
import {toast} from "react-toastify";
import {SearchOutlined} from "@ant-design/icons";
import {Marginer} from "../marginer/marginfile";
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

const Dossiers = () => {
  //declaration necessaires
  const [liste, setListe] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingdossier, setEdditingdossier] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  const [gridData, setGridData] = useState([]);
  const [value, setValue] = useState(1);
  const onChangeselect = (value) => {
    console.log(value);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [addingdossier, setAddingdossier] = useState({
    num_affaire: "",
    emplacement: "",
    client: "",
    tel: "",
    mission: "",
    adversaire: "",
    reste: "",
  });
  const [searchText, setSearchText] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  let [filteredData] = useState();
  const column = [
    {key: "1", title: "id_dossier", dataIndex: "id_dossier"},
    {key: "2", title: "num_affaire", dataIndex: "num_affaire"},
    {key: "3", title: "emplacement", dataIndex: "emplacement"},
    {
      key: "4",
      title: "client",
      dataIndex: "client",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        clearFilters,
        confirm,
      }) => {
        return (
          <React.Fragment>
            <Input
              autoFocus
              placeholder="type text"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({closeDropdown: false});
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary">
              {" "}
              Rechercher{" "}
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger">
              Réinitialiser{" "}
            </Button>
          </React.Fragment>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.client.toLowerCase().includes(value.toLowerCase());
      },
    },
    {key: "5", title: "tel", dataIndex: "tel"},
    {
      key: "6",
      title: "mission",
      dataIndex: "mission",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        clearFilters,
        confirm,
      }) => {
        return (
          <React.Fragment>
            <Input
              autoFocus
              placeholder="type text"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({closeDropdown: false});
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary">
              {" "}
              Rechercher{" "}
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger">
              Réinitialiser{" "}
            </Button>
          </React.Fragment>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.mission.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "7",
      title: "adversaire",
      dataIndex: "adversaire",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        clearFilters,
        confirm,
      }) => {
        return (
          <React.Fragment>
            <Input
              autoFocus
              placeholder="type text"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({closeDropdown: false});
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary">
              {" "}
              Rechercher{" "}
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger">
              Réinitialiser{" "}
            </Button>
          </React.Fragment>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.adversaire.toLowerCase().includes(value.toLowerCase());
      },
    },
    {key: "8", title: "reste", dataIndex: "reste"},
    {
      key: "16",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <GrDocumentTransfer
                className="edit"
                onClick={() => {
                  editdossier(record);
                }}></GrDocumentTransfer>
              <pre>
                <p>Transférer dossier </p>
              </pre>
            </div>
          </div>
        );
      },
    },
  ];
  //select dossier
  const getdossierrequest = async () => {
    try {
      const response = await axios.get("/recherchedossier");
      setListe(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getdossierrequest();
  });
  console.log(liste);
  //la barre de la recherche

  const globalSearch = () => {
    filteredData = liste.filter((value) => {
      return (
        value.num_affaire.toLowerCase().includes(searchText.toLowerCase()) ||
        value.emplacement.toLowerCase().includes(searchText.toLowerCase()) ||
        /*value.client.toLowerCase().includes(searchText.toLowerCase()) ||*/
        /*value.tel.toLowerCase().includes(searchText.toLowerCase()) ||*/
        value.mission.toLowerCase().includes(searchText.toLowerCase())
        /*value.adversaire.toLowerCase().includes(searchText.toLowerCase()) ||*/
        /* value.reste.toLowerCase().includes(searchText.toLowerCase())*/
      );
    });
    setGridData(filteredData);
    console.log("filtered", filteredData);
    console.log("length", filteredData.length);
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") getdossierrequest();
    globalSearch(e.target.value);
  };
  const reset = () => {
    setSortedInfo({});
    setSearchText("");
    getdossierrequest();
  };

  //supprimer dossier
  const deletedossier = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce dossier?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newListe = liste.filter(
          (dossier) => dossier.id_dossier !== record.id_dossier
        );
        setListe(newListe);
        deletedossierrequest(record.id_dossier);
        toast.success("dossier supprimée avec succès");
      },
    });
  };
  const deletedossierrequest = async (id_dossier) => {
    try {
      const deleted = await axios.post("recherchedossiereff", {
        id_dossier: id_dossier,
      });
      console.log("dossier supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un dossier
  const editdossier = (record) => {
    setIsEdit(true);
    setEdditingdossier({...record}); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingdossier(null);
  };
  //ajouter dossier
  const adddossier = async () => {
    try {
      const resp = await axios.post("recherchedossieradd", addingdossier);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Emplacement Dossier</h1>
        <BsFolderSymlink className="dashbicons"></BsFolderSymlink>
        <div className="boutonet">
          <table>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <Marginer direction="vertical" margin={20} />
        <Space>
          <Input
            placeholder="Texte de recherche"
            onChange={handleChange}
            type="text"
            allowClear
            value={searchText}
          />
          <Button onClick={globalSearch} type="primary">
            {" "}
            Chercher dossier{" "}
          </Button>
          <Button onClick={reset}> Réinitialiser </Button>
        </Space>
        <Marginer direction="vertical" margin={50} />
        <div className="tab">
          <Table
            columns={column}
            dataSource={gridData && gridData.length ? gridData : liste}
            size="large"
            bordered={true}></Table>
        </div>

        <Modal
          title="Changement de l'emplcement du dossier"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={async () => {
            setIsEdit(false);
            const newListe = liste.map((dossier) => {
              if (dossier.id_dossier == edditingdossier.id_dossier) {
                return edditingdossier;
              } else {
                return dossier;
              }
            });
            try {
              const adddossier = await axios.post(
                "/recherchedossier/update",
                edditingdossier
              );
            } catch (error) {
              console.log("error");
            }
            setListe(newListe);
            resetEditing();
            toast.success("dossier modifié avec succès");
          }}>
          <Input
            placeholder="Tapez l'emplacement"
            value={edditingdossier?.emplacement}
            onChange={(e) => {
              setEdditingdossier({
                ...edditingdossier,
                emplacement: e.target.value,
              });
            }}></Input>
        </Modal>
        <Modal
          title="Ajouter une Tâche"
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            adddossier();
            setIsAdd(false);
            toast.success("dossier ajoutée avec succès");
          }}>
          <Input
            placeholder="numéro d'affaire"
            value={addingdossier.num_affaire}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                num_affaire: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="emplacement dossier"
            value={addingdossier.emplacement}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                emplacement: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Nom du client "
            value={addingdossier.client}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                client: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Numéro du tel du client"
            value={addingdossier.tel}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                tel: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Mission"
            value={addingdossier.mission}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                mission: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Adversaire"
            value={addingdossier.adversaire}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                adversaire: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Reste"
            value={addingdossier.reste}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                reste: e.target.value,
              });
            }}></Input>

          <div className="formaddtache">
            <label>Tâche:</label>
            <Input type="text" placeholder="nom de la tâche"></Input>
            <label>Date Critique:</label>
            <DatePicker onChange={onChange} placeholder="date critique" />
            <label>Date Rappel:</label>
            <DatePicker onChange={onChange} placeholder="date rappel" />
            <label>Résolu:</label>
            <div className="radioet">
              <Radio.Group onChange={onChangeradio} value={value}>
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
                <Radio value={1}>Oui</Radio>
                <Radio value={2}>Non</Radio>
              </Radio.Group>
            </div>
            <label>Lieux:</label>
            <Cascader
              options={options}
              onChange={onChangeselect}
              placeholder="selectionner lieu"
            />
            <label>Service:</label>
            <Cascader
              options={options}
              onChange={onChangeselect}
              placeholder="selectionner service"
            />
            <label>Date d'audience:</label>
            <DatePicker onChange={onChange} placeholder="date d'audience" />
            <label>Date de Déchéance:</label>
            <DatePicker onChange={onChange} placeholder="date de déchéance" />
          </div>
        </Modal>
      </header>
    </div>
  );
};

export default Dossiers;
