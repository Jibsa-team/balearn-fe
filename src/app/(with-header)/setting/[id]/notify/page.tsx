import React from "react";
import NotifyHeader from "./notify.header";
import NotifyMain from "./notify.main";

function SettingNotify() {
  return (
    <div className="w-[100%] h-[100%] md:p-[30px] p-[15px] bg-white">
      <NotifyHeader />
      <NotifyMain />
    </div>
  );
}

export default SettingNotify;
