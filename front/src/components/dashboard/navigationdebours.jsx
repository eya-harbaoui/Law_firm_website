import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,CubeIcon
} from "@ant-design/icons";
import {
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
  ChipIcon,
} from '@heroicons/react/outline';
import {Menu} from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";


const Navigation = () => { 
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,children,label,type,
    };
  }
  
  const items = [
    getItem("Debours", "sub1", <MailOutlined/>, [
      getItem( "", null, null, [getItem("timbre", "1"), getItem("photocopie", "2"),getItem("transport", "3"),getItem("Recette du Finance", "4")],
        "group"
      ),
   
    ]),
  
      ];
                      console.log(items[0].children[0].children)
  
  const onClick = (e) => {
  if (e.keyPath[0]==1)
  {
  
    
      navigate("timbre")
  
  }
  if (e.keyPath[0]==2)
  {
  
    
      navigate("photocopie")
  
  }
  if (e.keyPath[0]==3)
  {
  
    
      navigate("transport")
  
  }
  if (e.keyPath[0]==4)
  {
  
    
      navigate("recettedufinance")
  
  }
 
  
    console.log("click", e.keyPath[0]);
  };
  
  let navigate = useNavigate()
  return( 
  <Menu
    onClick={onClick}
    style={{
      width: 256,
    }}
    mode="vertical"

    items={items}
    

  />)
  };

export default Navigation;
