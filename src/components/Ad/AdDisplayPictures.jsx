import React from 'react'

const AdDisplayPictures =(pictures )=>{

    const pictureNum =pictures.length

    function handleDisplayAll(){

        for (let index = 0; index < pictureNum; index++) {

               <img src={pictures[index].url}/>
           
        }

    }

    return (
        <>
        <button onClick={handleDisplayAll}>Afficher toutes les medias</button>
        </>
    )

}
export default AdDisplayPictures