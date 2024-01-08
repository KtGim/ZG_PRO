import type { CreateElement } from '../interfaces';

const createElement: CreateElement = (props) => {
    const { gap, width } = props;
    // TODO: 暂时先随机添加高度后续根据实际的元素高度获取
    const height = getRandomNumber();
    const div = document.createElement('div');
    div.style.height = `${height}px`;
    div.style.width = `${width}px`;
    div.style.margin = `0 ${gap}px`;
    return {
      div,
      height
    };
};

const getRandomNumber = () => {
  const height = Math.floor(Math.random() * 300);
  return  height < 50 ? 50 : height;
}


export {
  createElement
};