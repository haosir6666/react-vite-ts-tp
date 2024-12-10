import style from './index.module.scss'
import Dock from  './dock'
import Search from  '@/componts/search'
import Block from './block';
export default function Content() {
  return <div className={style.content}>
      <Search />
      <Block />
      <Dock />
  </div>;
}