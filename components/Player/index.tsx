import { useState } from "react";
import Popup from "./Popup";
import Drawer from "./Drawer";

const Player = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  if (isDrawerOpen) return <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />;
  return <Popup isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />;
};

export default Player;
