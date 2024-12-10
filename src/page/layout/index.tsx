import {useState} from 'react'
import style from './index.module.scss'
import BG from '@/componts/bg'
import Content from './content'
import LeftBar  from './leftBar';

export default function Layout() {
  return <div className={style.Layout}>
      <BG />
      <LeftBar />
      <Content />
  </div>;
}