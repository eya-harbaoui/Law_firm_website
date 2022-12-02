/* This example requires Tailwind CSS v2.0+ */
//il vaut mieux l'id a ne pas toucher
//aleh nafs l'id felexemple // je vais supposer que chaqun a son propre id
//difference entre addresse désigné et addresse //lien entre catgorie et la listeservice Ajouter
//collaborateur et code client??? // j'aui ajouté le fax et l'email malgre j'ai pas vu dans le tableau
//l(ajout fde lid annulle khiir ahawka malezmouch yidakhel haja kdima namloha felback unique) different ala fazet eya lelcode client besh matodkhlsh badha (ashel) amltha ken front felajout w lmodifier naaresh ftableau eli wrah mawjoud wale edheya nesel aleha
import React from "react";
import axios from "axios";
import {useState, useEffect, useMemo} from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Space,
  Cascader,
  Radio,
  Checkbox,
} from "antd";
import "antd/dist/antd.min.css";
import {AiFillEdit} from "react-icons/ai";
import {FaUsersCog} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {toast} from "react-toastify";

import {Marginer} from "../marginer/marginfile";

const Gestionclient = () => {
  const [listecodecollab, setListecodecollab] = useState([]);

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const filter = (inputValue, path) =>
    path.some(
      (listecodecollab) =>
        listecodecollab.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
        -1
    );
  const [value, setValue] = useState(0);
  const [val, setVal] = useState();
  const [check, setCheck] = useState(false);

  const [check1, setCheck1] = useState(true);
  const [checkk, setCheckk] = useState(false);
  const [listeservice, setlisteservice] = useState([]);
  const [persons, setPersons] = useState(0);
  const [gridData, setGridData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingGestionclient, setEdditingGestionclient] = useState(null);
  const [addingGestionclient, setAddingGestionclient] = useState({
    codecollaborateur: "",
    codeclient: "",
    raison: "",
    matricule: "",
    ville: "",
    rue: "",
    num: "",
    code_postale: "",
    activite: "",
    situation_fiscale: "",
    categorie: "",
    fax: "",
    email: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const onChange1 = (e) => {
    var cb = document.getElementById("abc");
    var input1 = document.getElementById("1");
    var input2 = document.getElementById("2");

    if (cb.checked == true) {
      console.log("winek aa", addingGestionclient.codecollaborateur);
      setCheck(true);
      setCheck1(false);
      setCheckk(true);
      console.log(checkk, "zer");
      input1.style.display = "block"; //yidhaher
      input2.style.display = "none";
    } else {
      setCheck1(true);
      setCheck(false);
      setCheckk(false);
      console.log(checkk, "zer");
      input1.style.display = "none";
      input2.style.display = "block";
    }
  };
  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [searchText, setSearchText] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  let [filteredData] = useState();

  const columns = [
    {key: "1", title: "id", dataIndex: "id"},
    {key: "2", title: "raison", dataIndex: "raison"},
    {key: "3", title: "matricule", dataIndex: "matricule"},
    {key: "4", title: "ville", dataIndex: "ville"},
    {key: "5", title: "rue", dataIndex: "rue"},
    {key: "6", title: "num", dataIndex: "num"},
    {key: "7", title: "code_postale", dataIndex: "code_postale"},
    {key: "8", title: "activité", dataIndex: "activite"},
    {key: "9", title: "situation_fiscale", dataIndex: "situation_fiscale"},
    {key: "10", title: "categorie", dataIndex: "categorie"},
    {key: "11", title: "Fax", dataIndex: "fax"},
    {key: "12", title: "Email", dataIndex: "email"},
    {key: "13", title: "Code client", dataIndex: "codeclient"},
    {key: "14", title: "code collaborateur", dataIndex: "codecollaborateur"},

    {
      key: "15",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editGestionclient(record);
                }}></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            {
              <div className="divdelete">
                <MdDeleteForever
                  className="delete"
                  onClick={() => {
                    deleteGestionclient(record);
                  }}></MdDeleteForever>
                <pre>
                  <p>supprimer</p>
                </pre>
              </div>
            }
          </div>
        );
      },
    },
  ];

  //select Gestionclient
  const getGestionclientrequest = async () => {
    try {
      const response = await axios.get("/gestionclient");
      //console.log('aaaaaaaa1',response.data)
      setlisteservice(response.data);
      // console.log('aaaaaaaa2',listeservice)
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].id > persons) {
          setPersons(response.data[i].id + 1);
        }
      }
      //console.log('ahayaliste',(persons)) // aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getGestionclientrequest();
  });
  //console.log("listeservice",listeservice);

  //supprimer une Gestionclient
  const deleteGestionclient = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce client?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (Gestionclient) => Gestionclient.id !== record.id
        );
        setlisteservice(newlisteservice);
        deleteGestionclientrequest(record.id);
        toast.success("client supprimé avec succès");
      },
    });
  };
  const deleteGestionclientrequest = async (id) => {
    try {
      const deleted = await axios.post("/gestionclient/delete", {
        id: id,
      });
      console.log("Emplacement_dossier supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////
  //modifier une Gestionclient
  const editGestionclient = (record) => {
    setIsEdit(true);

    setEdditingGestionclient({...record}); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingGestionclient(null);
  };
  //lien aveclback pour la modif
  const editGestionclientrequest = async (
    id,
    codecollaborateur,
    codeclient,
    raison,
    matricule,
    ville,
    rue,
    num,
    code_postale,
    activite,
    situation_fiscale,
    categorie,
    fax,
    email
  ) => {
    try {
      const modified = await axios.post("/gestionclient/modif", {
        id: id,
        codecollaborateur: codecollaborateur,
        codeclient: codeclient,
        raison: raison,
        matricule: matricule,
        ville: ville,
        rue: rue,
        num: num,
        code_postale: code_postale,
        activite: activite,
        situation_fiscale: situation_fiscale,
        categorie: categorie,
        fax: fax,
        email: email,
      });
      console.log("emplacement_dossier_modifié");
    } catch (error) {
      console.log(error);
    }
  }; ///////////////////// Ajout
  //lien aveclback pour l'ajout
  const [Listecollab, setListecollab] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  const addGestionclient = async () => {
    try {
      const resp = await axios.post("/gestionclient", addingGestionclient);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  //tebaa lrecherche
  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") getGestionclientrequest();
    globalSearch(e.target.value);
  };

  const getCollabrequest = async () => {
    try {
      const response = await axios.get("/collab", {
        withCredentials: true,
      });

      //pour la liste select lors de l'ajout
      // console.log("salem",response);

      setListecollab(response.data);
      // console.log("salem3",Listecollab);
      //
    } catch (error) {
      //setListecodecollab([{Listecollab.id + ":" + Listecollab.username}])
      // console.log("salem2",listecodecollab)

      console.log(error.message);
    }
  };
  const liste = useMemo(() => {
    getCollabrequest();
    return Listecollab.map((trib) => ({
      value: trib.id + ":" + trib.username,
      label: trib.id + ":" + trib.username,
    }));
  }, [Listecollab]);
  // useEffect(() => {
  // getCollabrequest();
  //}, [Listecollab,listecodecollab]);
  //recherche
  const globalSearch = () => {
    filteredData = listeservice.filter((value) => {
      return (
        value.raison.toLowerCase().includes(searchText.toLowerCase()) ||
        value.matricule.toLowerCase().includes(searchText.toLowerCase()) ||
        value.ville.toLowerCase().includes(searchText.toLowerCase()) ||
        value.rue.toLowerCase().includes(searchText.toLowerCase()) ||
        value.code_postale.toLowerCase().includes(searchText.toLowerCase()) ||
        value.activite.toLowerCase().includes(searchText.toLowerCase()) ||
        value.situation_fiscale
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        value.categorie.toLowerCase().includes(searchText.toLowerCase()) ||
        value.fax.toLowerCase().includes(searchText.toLowerCase()) ||
        value.codeclient.toLowerCase().includes(searchText.toLowerCase()) ||
        value.codecollaborateur.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setGridData(filteredData);
    console.log("filtered", filteredData);
    console.log("length", filteredData.length);
    console.log("person", persons);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Les clients</h1>
        <FaUsersCog className="dashbicons"></FaUsersCog>
        {
          <button
            className="btnadd"
            onClick={() => {
              setIsAdd(true);
            }}>
            {" "}
            Ajouter{" "}
          </button>
        }
        <Marginer direction="vertical" margin={20} />
        <Space>
          <Input
            placeholder="Texte de recherche"
            onChange={handleChange}
            type="text"
            allowClear
            value={searchText}
          />
        </Space>
        <Marginer direction="vertical" margin={50} />
        <div classname="tab">
          <Table
            pagination={{
              current: page,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
            columns={columns}
            dataSource={gridData && gridData.length ? gridData : listeservice}
            bordered={true}
          />
        </div>
        {/*MODIFICATION*/}
        <Modal
          title="modifier "
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Gestionclient) => {
              if (Gestionclient.id === edditingGestionclient.id) {
                return edditingGestionclient;
              } else {
                return Gestionclient;
              }
            });
            setlisteservice(newlisteservice);
            editGestionclientrequest(
              edditingGestionclient.id,
              edditingGestionclient.codecollaborateur,
              edditingGestionclient.codeclient,
              edditingGestionclient.raison,
              edditingGestionclient.matricule,
              edditingGestionclient.ville,
              edditingGestionclient.rue,
              edditingGestionclient.num,
              edditingGestionclient.code_postale,
              edditingGestionclient.activite,
              edditingGestionclient.situation_fiscale,
              edditingGestionclient.categorie,
              edditingGestionclient.fax,
              edditingGestionclient.email
            ); // a ne pas toucher l'id
            resetEditing();
            toast.success("Client modifié avec succès");
          }}>
          <Cascader
            
            options={liste}
            onChange={(value) => {
              console.log("aawinekbelehy", typeof value[0]);
              setEdditingGestionclient({
                ...edditingGestionclient,
                codecollaborateur: value[0],
              });
            }}
            placeholder="selectionner code collaborateur "
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
            value={edditingGestionclient?.codecollaborateur}
          />

          <Input
            placeholder="code client"
            value={edditingGestionclient?.codeclient}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                codeclient: e.target.value,
              });
            }}></Input>

          <Input
            placeholder=""
            value={edditingGestionclient?.raison}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                raison: e.target.value,
              });
            }}></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.matricule}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                matricule: e.target.value,
              });
            }}></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.ville}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                ville: e.target.value,
              });
            }}></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.rue}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                rue: e.target.value,
              });
            }}></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.num}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                num: e.target.value,
              });
            }}></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.code_postale}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                code_postale: e.target.value,
              });
            }}></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.activite}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                activite: e.target.value,
              });
            }}></Input>

          <div ClassName="situation">
            <p>Situation_fiscale</p>
            <div className="radioet">
              <Radio.Group onChange={onChangeradio} value={value}>
                <Radio
                  placeholder="situation_fiscale"
                  value={1}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEdditingGestionclient({
                        ...edditingGestionclient,
                        situation_fiscale: "non Assujetti",
                      });
                    }
                  }}>
                  {" "}
                  non Assujeti
                </Radio>

                <Radio
                  placeholder="situation_fiscale"
                  value={2}
                  onChange={(e) => {
                    setEdditingGestionclient({
                      ...edditingGestionclient,
                      situation_fiscale: "Asujetti",
                    });
                  }}>
                  Assujeti
                </Radio>

                <Radio
                  placeholder="situation_fiscale"
                  value={3}
                  onChange={(e) => {
                    setEdditingGestionclient({
                      ...edditingGestionclient,
                      situation_fiscale: "Exonoré",
                    });
                  }}>
                  Exonoré
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <Input
            placeholder="categorie"
            value={edditingGestionclient?.categorie}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                categorie: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="fax"
            value={edditingGestionclient?.fax}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                fax: e.target.value,
              });
            }}></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.email}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                email: e.target.value,
              });
            }}></Input>
        </Modal>

        <Modal
          title="Ajouter un client "
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            addGestionclient();
            setIsAdd(false);
            toast.success("client ajouté avec succès");
            console.log("vaaaaaaa", val);
          }}>
          <Cascader
            
            options={liste}
            onChange={(value) => {
              console.log("aawinekbelehy", value[0]);
              setAddingGestionclient({
                ...addingGestionclient,
                codecollaborateur: value[0],
              });
            }}
            placeholder="Selectionner code collaborateur "
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
          />
          <br />
          <Checkbox id="abc" onChange={onChange1}>
            {" "}
            Saisie Manuel ( code client ){" "}
          </Checkbox>
          :
          {check && (
            <div id="1">
              <Input
                placeholder="code client"
                value={val}
                onChange={(e) => {
                  console.log("traahwari", e.target.value);
                  setVal(e.target.value);
                  setAddingGestionclient({
                    ...addingGestionclient,
                    codeclient: val,
                  });
                }}></Input>
            </div>
          )}
          {check1 && (
            <div id="2">
              <Input
                disabled
                placeholder="code client"
                value={addingGestionclient.codeclient}
                onChange={(e) => {
                  val = "a";
                  console.log("traahwari", e.target.value);
                  //matekhdmsh
                }}
                //amltha win lmatricule lval ghadi win yiwali yaml feha
              ></Input>
            </div>
          )}
          {checkk == false && (
            <Input
              placeholder="raison"
              value={addingGestionclient.raison}
              onChange={(e) => {
                console.log("aacava");

                setAddingGestionclient({
                  ...addingGestionclient,
                  raison: e.target.value,

                  codeclient: persons + "/" + addingGestionclient.raison[0],
                });
              }}></Input>
          )}
          {checkk == true && (
            <Input
              placeholder="raison"
              value={addingGestionclient.raison}
              onChange={(e) => {
                console.log("hani felinput thenya");
                setAddingGestionclient({
                  ...addingGestionclient,
                  raison: e.target.value,
                });
              }}></Input>
          )}
          <Input
            placeholder="matricule"
            value={addingGestionclient.matricule}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                matricule: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="ville"
            value={addingGestionclient.ville}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                ville: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="rue"
            value={addingGestionclient.rue}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                rue: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="num"
            value={addingGestionclient.num}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                num: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="code_postale"
            value={addingGestionclient.code_postale}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                code_postale: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="activité"
            value={addingGestionclient.activite}
            onChange={(e) => {
              /*setVal(persons + "/" + addingGestionclient.raison[0]);
              setAddingGestionclient({
                ...addingGestionclient,
                codeclient: val,
              });*/
              setAddingGestionclient({
                ...addingGestionclient,
                activite: e.target.value,
              });
            }}></Input>
          <div className="situation">
            <fieldset>
              <legend>Situation Fiscale</legend>

              <div className="radioet">
                <Radio.Group onChange={onChangeradio} value={value}>
                  <Radio
                    placeholder="situation_fiscale"
                    value={1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAddingGestionclient({
                          ...addingGestionclient,
                          situation_fiscale: "non Assujetti",
                        });
                      }
                    }}>
                    {" "}
                    non Assujeti
                  </Radio>

                  <Radio
                    placeholder="situation_fiscale"
                    value={2}
                    onChange={(e) => {
                      setAddingGestionclient({
                        ...addingGestionclient,
                        situation_fiscale: "Asujetti",
                      });
                    }}>
                    Assujeti
                  </Radio>

                  <Radio
                    placeholder="situation_fiscale"
                    value={3}
                    onChange={(e) => {
                      setAddingGestionclient({
                        ...addingGestionclient,
                        situation_fiscale: "Exonoré",
                      });
                    }}>
                    Exonoré
                  </Radio>
                </Radio.Group>
              </div>
            </fieldset>
          </div>
          <Input
            placeholder="categorie"
            value={addingGestionclient.categorie}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                categorie: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="fax"
            value={addingGestionclient.fax}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                fax: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="email"
            value={addingGestionclient.email}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                email: e.target.value,
              });
            }}></Input>
        </Modal>
      </header>
    </div>
  );
};
export default Gestionclient;
