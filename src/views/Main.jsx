import { TextArea, ButtonGroup, Button, Icon, Dropdown, Empty } from '@douyinfe/semi-ui';
import { IconChevronDown } from '@douyinfe/semi-icons';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
import requestTranslate from '../utils/translator';
import Switch from '../resources/svg/switch.svg';
import '../style/Main.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {

  const navigate= useNavigate()
  /* State */
  const [inputLanguageMenu, setInputLanguageMenu] = useState([
    {
      node: 'item', name: '中文', type: 'tertiary', active: true, onClick: () => {
        inputMenuClickHandle(1);
      },
    },
    {
      node: 'item', name: '英语', type: 'tertiary', active: false, onClick: () => {
        inputMenuClickHandle(2);
      },
    },
    {
      node: 'item', name: '日语', type: 'tertiary', active: false, onClick: () => {
        inputMenuClickHandle(3);
      },
    },
  ]);
  const [outputLanguageMenu, setOutputLanguageMenu] = useState([
    {
      node: 'item', name: '中文', type: 'tertiary', active: false, onClick: () => {
        outputMenuClickHandle(1);
      },
    },
    {
      node: 'item', name: '英语', type: 'tertiary', active: true, onClick: () => {
        outputMenuClickHandle(2);
      },
    },
    {
      node: 'item', name: '日语', type: 'tertiary', active: false, onClick: () => {
        outputMenuClickHandle(3);
      },
    },
  ]);
  const [inputLanguage, setInputLanguage] = useState('中文');
  const [outputLanguage, setOutputLanguage] = useState('英文');
  const [secret, setSecret] = useState(false);

  /* Effect */
  useEffect(() => {
    console.log(localStorage.getItem('appid'))
    if (localStorage.getItem('appid') === null || localStorage.getItem('secret') === null) {
      setSecret(false);
    } else {
      setSecret(true);
    }
  }, []);

  /* Methods */
  function inputMenuClickHandle(prop) {
    let menu = [...inputLanguageMenu];
    for (let i = 0; i < menu.length; i++) {
      if (i === prop - 1) {
        menu[i].active = true;
        setInputLanguage(menu[i].name);
      } else {
        menu[i].active = false;
      }
    }
    setInputLanguageMenu(menu);
  }

  function outputMenuClickHandle(prop) {
    let menu = [...outputLanguageMenu];
    for (let i = 0; i < menu.length; i++) {
      if (i === prop - 1) {
        menu[i].active = true;
        setOutputLanguage(menu[i].name);
      } else {
        menu[i].active = false;
      }
    }
    setOutputLanguageMenu(menu);
  }

  function transEnterHandle() {
    const dom = document.getElementById('inputTextArea');
    const text = dom.innerHTML;
    let from = '';
    let to = '';

    switch (inputLanguage) {
      case '中文':
        from = 'zh';
        break;
      case '英语':
        from = 'en';
        break;
      case '日语':
        from = 'jp';
        break;
      default:
        from = 'zh';
    }

    switch (outputLanguage) {
      case '中文':
        to = 'zh';
        break;
      case '英语':
        to = 'en';
        break;
      case '日语':
        to = 'jp';
        break;
      default:
        to = 'en';
    }

    requestTranslate(text, from, to)
      .then(response => response.json())
      .then((data) => {
        const out = document.getElementById('output');
        out.innerHTML = data.trans_result[0].dst;
      });
  }

  const clickHandle = () => {
    navigate('/setting')
  }

  return (
    <div className="App">
      { secret ?
        <>
          <TextArea maxCount={1000} showClear onEnterPress={transEnterHandle} id="inputTextArea"/>
          <div className="btns">
            <ButtonGroup>
              <Dropdown trigger={'click'} showTick position={'bottomLeft'} menu={inputLanguageMenu}>
                <Button icon={<IconChevronDown/>} type="tertiary" iconPosition="right">{inputLanguage}</Button>
              </Dropdown>
              <Button icon={<Icon svg={<Switch/>}/>} aria-label="切换语言" theme="borderless" onClick={clickHandle}/>
              <Dropdown trigger={'click'} showTick position={'bottomLeft'} menu={outputLanguageMenu}>
                <Button icon={<IconChevronDown/>} type="tertiary" iconPosition="right">{outputLanguage}</Button>
              </Dropdown>
            </ButtonGroup>
          </div>
          <div className="output" id="output"></div>
        </> :
        <Empty
          image={<IllustrationNoContent style={{ width: 150, height: 150 }} />}
          darkModeImage={<IllustrationNoContentDark style={{ width: 150, height: 150 }} />}
          description="还没有填写API信息！"
        >
        </Empty>
      }
    </div>
  );
}

export default Main;
