import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import {
  PlusIcon,
  ServerIcon,
  ScaleIcon,
  CogIcon,
  CreditCardIcon,
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
  ClockIcon,
  CurrencyYenIcon,
  FlagIcon,
  FolderOpenIcon,
  LibraryIcon,
  FolderIcon,
  UserCircleIcon,
  UserIcon,
  DocumentSearchIcon,
  ArchiveIcon,
  DocumentIcon,
  PhotographIcon,
  TruckIcon,
  PrinterIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FolderAddIcon,
  PencilAltIcon,
  UserAddIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";

const resourcesdebours = [
  {
    name: "timbre",
    description: "",
    href: "/home/timbre",
    icon: PhotographIcon,
  },
  {
    name: "photocopie",
    description: "",
    href: "/home/photocopie",
    icon: PrinterIcon,
  },
  {
    name: "transport",
    description: "",
    href: "/home/transport",
    icon: TruckIcon,
  },
  {
    name: "recette finance",
    description: "",
    href: "/home/recettedufinance",
    icon: CurrencyDollarIcon,
  },
];

const solutions1 = [
  {
    name: "Paramètre globale",
    description: "",
    href: "/home/Parametreglobale",
    icon: CogIcon,
  },
  {
    name: "honoraire en extra",
    description: "",
    href: "/home/honoraireenextra",
    icon: CreditCardIcon,
  },
  {
    name: "Emplacement dossier",
    description: "",
    href: "/home/emplacementdossier",
    icon: FolderOpenIcon,
  },
  {
    name: "Tribunaux et Administrations",
    description: "",
    href: "/home/Tribunaux_et_administrations",
    icon: LibraryIcon,
  },
  {
    name: "Type dossier",
    description: " ",
    href: "/home/typedossier",
    icon: FolderIcon,
  },
  {
    name: "Utilisateur",
    description: " ",
    href: "/home/utilisateur",
    icon: UserAddIcon,
  },
  {
    name: "Huissier",
    description: " ",
    href: "/home/primehuissier",
    icon: UserCircleIcon,
  },
  {
    name: "Collaborateur",
    description: " ",
    href: "/home/collaborateurs",
    icon: UserGroupIcon,
  },
  {
    name: "primeorateur",
    description: "",
    href: "/home/underconstruction",
    icon: CurrencyYenIcon,
  },
  {
    name: "Greffier",
    description: " ",
    href: "/home/underconstruction",
    icon: PencilAltIcon,
  },
  {
    name: "Prime Greffier",
    description: " ",
    href: "/home/underconstruction",
    icon: CreditCardIcon,
  },
];

const client0 = [
  {name: "Gestion Client", href: "/home/gestionclient", icon: UserIcon},
  {
    name: "Fiche Signalitique",
    href: "/home/underconstruction",
    icon: DocumentIcon,
  },
];
const resources = [
  {
    name: "Etat huissier",
    description: "",
    href: "/home/underconstruction",
  },
];
const resources4 = [
  {
    name: "Etat huissier",
    description: "",
    href: "/home/underconstruction",
  },
];

const resources2 = [
  {
    name: "Recherche",
    description: "",
    href: "/home/recherchedossier",
    icon: DocumentSearchIcon,
  },
  {
    name: "Emplacement Dossier",
    description: "",
    href: "/home/dossiers",
    icon: FolderIcon,
  },
  {
    name: "Creation",
    description: "",
    href: "/home/creationdossier",
    icon: FolderAddIcon,
  },
  {
    name: "Gestion Archive",
    description: "",
    href: "#",
    icon: ArchiveIcon,
  },
];
const resources3 = [
  {
    name: "Tâche",
    description: "",
    href: "/home/underconstruction",
  },
  {
    name: "Huissier",
    description: "",
    href: "/home/underconstruction",
  },
  {
    name: "Echéance",
    description: "",
    href: "/home/underconstruction",
  },
  {
    name: "Recouvrement",
    description: "",
    href: "/home/underconstruction",
  },
  {
    name: "Expert",
    description: "",
    href: "/home/underconstruction",
  },
];

export default function Example() {
  const {getLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate();

  async function logOut() {
    // await axios.get("http://localhost:5000/logout");
    await axios.get("/logout");
    await getLoggedIn();
    navigate("/");
  }
  return (
    <div className="App">
      <Navbar
        bg="white"
        variant="black"
        expand="lg"
        className="flex justify-between items-center px-1 py-4 sm:px-6 md:justify-start ">
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="Paramètres" className="font-bold">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-4 py-6 sm:gap-8 sm:p-5">
                  {solutions1.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-4 p-1 flex items-start rounded-lg hover:bg-blue-100 text-decoration-none">
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </NavDropdown>

            <NavDropdown title="Debours" className="font-bold">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden ">
                <div className="relative grid gap-6 bg-white px-4 py-6 sm:gap-8 sm:p-5">
                  {resourcesdebours.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-4 p-1 flex items-start rounded-lg hover:bg-blue-100 text-decoration-none">
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </NavDropdown>
            <NavDropdown title="Clients" className="font-bold">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden ">
                <div className="relative grid gap-6 bg-white px-4 py-6 sm:gap-8 sm:p-5">
                  {client0.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-4 p-1 flex items-start rounded-lg hover:bg-blue-100 text-decoration-none">
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </NavDropdown>
            <NavDropdown title="Dossiers" className="font-bold ">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden ">
                <div className="relative grid gap-6 bg-white px-4 py-6 sm:gap-8 sm:p-5">
                  {resources2.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-4 p-2 flex items-start rounded-lg hover:bg-blue-100 text-decoration-none">
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900 p-1">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </NavDropdown>
            <div className="font-bold">
              <Nav.Link href="/home/underconstruction">Rappel</Nav.Link>
            </div>
            <div className="font-bold">
              <Nav.Link href="/home/underconstruction" className="font-bold">
                Réglement
              </Nav.Link>
            </div>
            <div className="font-bold">
              <Nav.Link href="/home/underconstruction" className="font-bold">
                Etat Huissier
              </Nav.Link>
            </div>
            <div className="flex items-center ml-200 px-20">
              <Button title="se Déconnecter" onClick={logOut}>
                Se déconnecter
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
