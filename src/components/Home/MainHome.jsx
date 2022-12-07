import React from 'react'
import mainImage from "./img2.jpg";
import "./mainHome.css"
const MainHome = () => {
  return (
    <section id='mainHomeSection'>
        <article className='mainSectionArticle'>
                <figure>
                    <img src={mainImage} alt="" />
                </figure>
                <aside className="mainhomeaside">
                  <h1>Welcome to TheMovie<span>Box</span></h1>
                </aside>
        </article>
    </section>
  )
}

export default MainHome
