import React from "react";
import NotifyHeader from "./notify.header";
import NotifyMain from "./notify.main";

function SettingNotify() {
  return (
    <div className="w-[100%] h-[calc(100vh-100px)] md:p-[30px] p-[15px] bg-white">
      <NotifyHeader />
      <div className="h-[calc(100%-60px)] overflow-y-auto">
        <NotifyMain />
      </div>
    </div>
  );
}

export default SettingNotify;
