import React, { useState } from 'react';
import { Input, Button } from '@douyinfe/semi-ui';
import '../style/Setting.scss';

const Setting = (props) => {
  /** state部分 **/
  const [appidData, setAppidData] = useState(localStorage.getItem('appid'));
  const [secretData, setSecretData] = useState(localStorage.getItem('secret'));

  /** effect部分 **/

  /** methods部分 **/
  const clickHandle = () => {
    localStorage.setItem('appid', appidData);
    localStorage.setItem('secret', secretData);
  };

  const appidChange = (value) => {
    setAppidData(value);
  };

  const secretChange = (value) => {
    setSecretData(value);
  };

  /** render **/
  return (
    <div className="Setting">
      <div className="input_1">
        <Input placeholder="AppId" id="appid" defaultValue={localStorage.getItem('appid')} onChange={appidChange}></Input>
      </div>
      <div className="input_2">
        <Input placeholder="Secret" id="secret" defaultValue={localStorage.getItem('secret')} onChange={secretChange}></Input>
      </div>
      <div className="btn">
        <Button theme="solid" type="warning" size="small" onClick={clickHandle}>设置</Button>
      </div>

    </div>
  );
};

export default Setting;