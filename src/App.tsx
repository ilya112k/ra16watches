import { useState } from 'react'
import { TForm } from './types/form.type.tsx';
import FormComponent from './components/form/form.component.tsx'
import WatchComponent from "./components/watch/watch.component.tsx";

import './App.css';

function App() {
  const [watchesList, setWatchesList] = useState<TForm[]>([])

  const addWatchAction = (watch: TForm) => {
    if (!watch) {
      return
    }
    setWatchesList([...watchesList, watch])
  }

  const deleteWatchAction = (currentWatch: TForm) => {
    const correctWatchList = watchesList.filter((watch) => watch.name !== currentWatch.name);
    setWatchesList(correctWatchList)
  }

  return (
    <>
     <FormComponent submitAction={addWatchAction} />
     <div className="watch-list">
      {watchesList.map((watch) => (
        <WatchComponent key={watch.name} deleteAction={deleteWatchAction} data={watch} />
      ))}
     </div>
    </>
  )
}

export default App
