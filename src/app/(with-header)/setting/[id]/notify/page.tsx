import React from "react";
import NotifyHeader from "./notify.header";
import NotifyMain from "./notify.main";

function SettingNotify() {
  return (
    <div className="w-[95%] h-[100%] p-[30px] bg-white">
      <NotifyHeader />
      <NotifyMain />
    </div>
  );
}

export default SettingNotify;
