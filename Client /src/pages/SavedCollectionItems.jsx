import React from 'react'
import SavedCollectionDescription from '../components/SavedCollectionDescription'
import GridSystemForItem from '../components/GridSystemForItem'

function SavedCollectionItems() {
  return (
    <div className='bg-black p-15'>
        <SavedCollectionDescription/>
        <GridSystemForItem/>
    </div>
  )
}

export default SavedCollectionItems